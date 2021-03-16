const firebase = require('firebase');
require("firebase/firestore");

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC-2EhE1uZ2g2DAWJ4cuP07QWjEg7JwWm8",
    authDomain: "dsp-firebase-763df.firebaseapp.com",
    projectId: "dsp-firebase-763df",
    storageBucket: "dsp-firebase-763df.appspot.com",
    messagingSenderId: "373124393681",
    appId: "1:373124393681:web:36661b391fe12dbd7ef3f0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

console.log(db);
