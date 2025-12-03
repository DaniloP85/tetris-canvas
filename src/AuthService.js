import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

/**
 * AuthService - Handles Firebase authentication
 */
export class AuthService {
  constructor(config, onSignIn, onSignOut) {
    this.app = firebase.initializeApp(config);
    this.auth = firebase.auth(this.app);
    this.ui = new firebaseui.auth.AuthUI(this.auth);
    this.ui.disableAutoSignIn();
    this.onSignIn = onSignIn;
    this.onSignOut = onSignOut;
  }

  getUIConfig() {
    return {
      'callbacks': {
        'signInSuccessWithAuthResult': (authResult, redirectUrl) => {
          if (authResult.user) {
            this.onSignIn(authResult.user);
          }

          if (authResult.additionalUserInfo) {
            document.getElementById('is-new-user').textContent = 
              authResult.additionalUserInfo.isNewUser ? 'New User' : 'Existing User';
          }
          return false;
        }
      },
      'signInFlow': 'popup',
      'signInOptions': [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          clientId: process.env.clienteId
        }
      ],
      'tosUrl': 'https://www.google.com',
      'privacyPolicyUrl': 'https://www.google.com',
      'credentialHelper': process.env.clienteId && process.env.clienteId != process.env.clienteId 
        ? firebaseui.auth.CredentialHelper.GOOGLE_YOLO 
        : firebaseui.auth.CredentialHelper.NONE,
      'adminRestrictedOperation': {
        status: null
      }
    };
  }

  start() {
    const uiConfig = this.getUIConfig();
    this.ui.start('#firebaseui-auth-container', uiConfig);

    this.auth.onAuthStateChanged((user) => {
      document.getElementById('loading').style.display = 'none';
      document.getElementById('loaded').style.display = 'block';
      
      if (user) {
        this.onSignIn(user);
      } else {
        this.onSignOut();
        this.ui.start('#firebaseui-auth-container', uiConfig);
      }
    });
  }

  signOut() {
    return this.auth.signOut();
  }

  getAuth() {
    return this.auth;
  }

  getApp() {
    return this.app;
  }
}
