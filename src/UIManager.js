import { formatador } from './utils';

/**
 * UIManager - Handles UI updates and DOM manipulation
 */
export class UIManager {
  constructor(databaseService) {
    this.databaseService = databaseService;
    this.currentUser = null;
    this.leaderboardUnsubscribe = null;
  }

  showSignedInUser(user, componete, nextPiece) {
    this.currentUser = user;
    
    // Set user IDs for game components
    componete.uid = user.uid;
    nextPiece.uid = user.uid;

    // Ensure player exists in database
    this.databaseService.ensurePlayerExists(user.uid, user);

    // Update UI elements
    document.getElementById('user-signed-in').style.display = 'block';
    document.getElementById('user-signed-out').style.display = 'none';
    document.getElementById('name').textContent = user.displayName;
    document.getElementById('email').textContent = user.email;
    document.getElementById('phone').textContent = user.phoneNumber;

    // Handle user photo
    if (user.photoURL) {
      document.getElementById('photo').src = user.photoURL;
      document.getElementById('photo').style.display = 'block';

      // Subscribe to leaderboard updates
      this.subscribeToLeaderboard(user, componete);
    } else {
      document.getElementById('photo').style.display = 'none';
    }
  }

  showSignedOutUser() {
    this.currentUser = null;
    
    // Unsubscribe from leaderboard if subscribed
    if (this.leaderboardUnsubscribe) {
      this.leaderboardUnsubscribe();
      this.leaderboardUnsubscribe = null;
    }

    document.getElementById('user-signed-in').style.display = 'none';
    document.getElementById('user-signed-out').style.display = 'block';
  }

  subscribeToLeaderboard(user, componete) {
    this.leaderboardUnsubscribe = this.databaseService.subscribeToLeaderboard((querySnapshot) => {
      document.getElementById('players').innerHTML = '';

      querySnapshot.forEach((doc) => {
        const color = doc.id === user.uid ? '#FF0' : '#FFF';

        if (doc.id === user.uid) {
          componete.maxScore = doc.data().score;
        }

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
  }

  setupAuthButtons(authService) {
    document.getElementById('sign-out').addEventListener('click', () => {
      authService.signOut();
    });

    document.getElementById('delete-account').addEventListener('click', () => {
      // Delete account functionality would go here
      console.log('Delete account clicked');
    });
  }
}
