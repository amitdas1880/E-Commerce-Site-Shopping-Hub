import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDU0hHaAVopg_Su0dWicjwFEetQT1rkeSs",
  authDomain: "e-commerce-shopping-app-96f8c.firebaseapp.com",
  projectId: "e-commerce-shopping-app-96f8c",
  storageBucket: "e-commerce-shopping-app-96f8c.appspot.com",
  messagingSenderId: "154570464854",
  appId: "1:154570464854:web:9c62788ca3f0947982a5f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app)

export {fireDB,auth };


// Firebase Document link
  // Sign up new users :   https://firebase.google.com/docs/auth/web/start
  // Add a document :      https://firebase.google.com/docs/firestore/manage-data/add-data