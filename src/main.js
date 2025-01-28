import { Tetraminos } from './Tetraminos';
import { Componente } from './Componente';
import { printScreenGame, random, printScore, printScreenNextPart, tetraminos, printLevel, formatador } from './utils';
import { Rotate } from './rotacao';
import { KeyBoard } from './keyBoard';
import "./style.css";

import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  setDoc,
  getDoc,
  doc,
  updateDoc
} from 'firebase/firestore';

import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const apiKey = process.env.apiKey;
const authDomain = process.env.authDomain;
const projectId = process.env.projectId;
const storageBucket = process.env.storageBucket;
const messagingSenderId = process.env.messagingSenderId;
const appId = process.env.appId;

const app = firebase.initializeApp({ apiKey, authDomain, projectId, appId, messagingSenderId, storageBucket });
const auth = firebase.auth(app);
let ui = new firebaseui.auth.AuthUI(auth);
ui.disableAutoSignIn();

const uiConfig = {
  'callbacks': {
    // Called when the user has been successfully signed in.
    'signInSuccessWithAuthResult': function (authResult, redirectUrl) {
      if (authResult.user) {
        handleSignedInUser(authResult.user);
      }

      if (authResult.additionalUserInfo) {
        document.getElementById('is-new-user').textContent = authResult.additionalUserInfo.isNewUser ? 'New User' : 'Existing User';
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
  'credentialHelper': process.env.clienteId && process.env.clienteId != process.env.clienteId ? firebaseui.auth.CredentialHelper.GOOGLE_YOLO : firebaseui.auth.CredentialHelper.NONE,
  'adminRestrictedOperation': {
    status: null
  }
};

ui.start('#firebaseui-auth-container', uiConfig);

var handleSignedOutUser = function () {

  document.getElementById('user-signed-in').style.display = 'none';
  document.getElementById('user-signed-out').style.display = 'block';
  ui.start('#firebaseui-auth-container', uiConfig);
};

firebase.auth().onAuthStateChanged(function (user) {
  document.getElementById('loading').style.display = 'none';
  document.getElementById('loaded').style.display = 'block';
  user ? handleSignedInUser(user) : handleSignedOutUser();
});

const db = getFirestore(app);
const tetrisRef = collection(db, 'players');
const queryOrderBy = query(tetrisRef, orderBy('score', 'desc'));

async function update(id, score) {
  await updateDoc(doc(db, 'players', id), { score });
}

async function getDocumentos(docRef, user) {
  const d = await getDoc(docRef);

  if (!d.exists()) {
    await setDoc(docRef, {
      nickname: user.displayName,
      email: user.email,
      score: 0
    });
  }
}

document.getElementById('sign-out').addEventListener('click', function () { firebase.auth().signOut(); });
document.getElementById('delete-account').addEventListener('click', function () { deleteAccount(); });

import "./style.css";

const gameArea = document.getElementById('tetris');
const canvasGameArea = gameArea.getContext('2d');
const _TETRAMINO = random(tetraminos);
const tetramino = Tetraminos[_TETRAMINO];
canvasGameArea.lineWidth = 0.1;
const keyboard = new KeyBoard(canvasGameArea);
let matriz = printScreenGame(canvasGameArea);

const rotate = new Rotate(tetramino);
const { angle, current, minY, minX } = rotate.execute();

const locationTemp = current.map((location) => {
  const { x, y } = location;
  canvasGameArea.fillStyle = tetramino.color;
  canvasGameArea.fillRect(x, y, 30, 30);
  matriz[(y / 33)][(x / 33)] = 'c';
  return { x, y };
});

printLevel(canvasGameArea, 1);

const nextPiece = Tetraminos[random(tetraminos)];
nextPiece.update = update;

const componete = new Componente({
  location: locationTemp,
  color: tetramino.color,
  size: tetramino.size,
  type: tetramino.type,
  angle: angle,
  minX,
  minY
}, canvasGameArea, matriz, nextPiece);

printScore(canvasGameArea);
printScreenNextPart(canvasGameArea);
componete.printNextPart();
componete.update = update;

const stop = () => {
  if (componete.isPlaying && !componete.endGame) {
    componete.stop(false);
    componete.isPlaying = false;
  }
};

const start = () => {
  if (!componete.isPlaying && !componete.endGame) {
    componete.timer();
    componete.start();
  }
};

document.addEventListener('keydown', (event) => {
  const keyCode = event.keyCode;

  if (keyCode === 13) {
    keyboard.printKeyBoards('enter', 'keydown');
    start();
  }
  if (componete.isPlaying && !componete.endGame) {

    event.preventDefault();
    if (keyCode === 80) {
      keyboard.printKeyBoards('p', 'keydown');
      stop();
    }

    if (keyCode === 38 || keyCode === 87) {
      keyboard.printKeyBoards('w', 'keydown');
      componete.rotation();
    }

    if (keyCode === 37 || keyCode === 65) {
      keyboard.printKeyBoards('a', 'keydown');
      componete.left();
    }

    if (keyCode === 39 || keyCode === 68) {
      keyboard.printKeyBoards('d', 'keydown');
      componete.right();
    }

    if (keyCode === 40 || keyCode === 83) {
      keyboard.printKeyBoards('s', 'keydown');
      componete.down();
    }

    if (keyCode === 32) {
      keyboard.printKeyBoards('space', 'keydown');
    }
  }
});

document.addEventListener('keyup', (event) => {
  if (componete.isPlaying && !componete.endGame) {
    const keyCode = event.keyCode;
    event.preventDefault();

    if (keyCode === 13) {
      keyboard.printKeyBoards('enter');
      keyboard.printKeyBoards('p');
    }

    if (keyCode === 38 || keyCode === 87) {
      keyboard.printKeyBoards('w');
    }

    if (keyCode === 39 || keyCode === 68) {
      keyboard.printKeyBoards('d');
    }

    if (keyCode === 37 || keyCode === 65) {
      keyboard.printKeyBoards('a');
    }

    if (keyCode === 32) {
      keyboard.printKeyBoards('space');
      componete.downAll();
    }

    if (keyCode === 40 || keyCode === 83) {
      keyboard.printKeyBoards('s');
    }
  }
});

var handleSignedInUser = function (user) {

  const docRef = doc(db, "players", user.uid);

  componete.uid = user.uid;
  nextPiece.uid = user.uid;

  getDocumentos(docRef, user);

  document.getElementById('user-signed-in').style.display = 'block';
  document.getElementById('user-signed-out').style.display = 'none';
  document.getElementById('name').textContent = user.displayName;
  document.getElementById('email').textContent = user.email;
  document.getElementById('phone').textContent = user.phoneNumber;

  if (user.photoURL) {
    var photoURL = user.photoURL;

    document.getElementById('photo').src = photoURL;
    document.getElementById('photo').style.display = 'block';

    onSnapshot(queryOrderBy, (querySnapshot) => {
      document.getElementById('players').innerHTML = '';

      querySnapshot.forEach((doc) => {
        
        const color = doc.id === user.uid ? '#FF0' : '#FFF';

        if (doc.id === user.uid)
          componete.maxScore = doc.data().score;

        let tr = document.createElement('tr');
        tr.style.backgroundColor = color;

        let tdNickname = document.createElement('td');
        tdNickname.innerHTML = doc.data().nickname;
        tr.appendChild(tdNickname);

        let tdScore = document.createElement('td');
        tdScore.innerHTML = formatador.format(doc.data().score);
        tr.appendChild(tdScore);

        document.getElementById('players').append(tr);
      });
    });
  } else {
    document.getElementById('photo').style.display = 'none';
  }
};