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

/**
 * DatabaseService - Handles Firestore database operations
 */
export class DatabaseService {
  constructor(app) {
    this.db = getFirestore(app);
    this.playersRef = collection(this.db, 'players');
    this.queryOrderBy = query(this.playersRef, orderBy('score', 'desc'));
  }

  async updateScore(id, score) {
    await updateDoc(doc(this.db, 'players', id), { score });
  }

  async ensurePlayerExists(userId, user) {
    const docRef = doc(this.db, "players", userId);
    const d = await getDoc(docRef);

    if (!d.exists()) {
      await setDoc(docRef, {
        nickname: user.displayName,
        email: user.email,
        score: 0
      });
    }
  }

  subscribeToLeaderboard(callback) {
    return onSnapshot(this.queryOrderBy, callback);
  }

  getPlayerRef(userId) {
    return doc(this.db, "players", userId);
  }
}
