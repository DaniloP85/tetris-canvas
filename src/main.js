import "./style.css";
import { AuthService } from './AuthService';
import { DatabaseService } from './DatabaseService';
import { GameController } from './GameController';
import { InputHandler } from './InputHandler';
import { UIManager } from './UIManager';

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  appId: process.env.appId,
  messagingSenderId: process.env.messagingSenderId,
  storageBucket: process.env.storageBucket
};

// Initialize game controller
const gameController = new GameController('tetris');

// Initialize database service (will be set after auth initializes)
let databaseService;
let uiManager;

// Handle user sign in
const handleSignedInUser = (user) => {
  uiManager.showSignedInUser(user, gameController.componete, gameController.nextPiece);
};

// Handle user sign out
const handleSignedOutUser = () => {
  uiManager.showSignedOutUser();
};

// Initialize authentication service
const authService = new AuthService(firebaseConfig, handleSignedInUser, handleSignedOutUser);

// Initialize database service after auth
databaseService = new DatabaseService(authService.getApp());

// Initialize UI manager
uiManager = new UIManager(databaseService);
uiManager.setupAuthButtons(authService);

// Set update function for game components
gameController.setUpdateFunction((id, score) => {
  databaseService.updateScore(id, score);
});

// Initialize input handler
new InputHandler(gameController.getKeyboard(), gameController);

// Start authentication
authService.start();