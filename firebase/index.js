
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvsGEc3XCWNySJiIvBG2sowvOXFDaGfg0",
  authDomain: "todo-93171.firebaseapp.com",
  projectId: "todo-93171",
  storageBucket: "todo-93171.appspot.com",
  messagingSenderId: "663577063115",
  appId: "1:663577063115:web:bd5440697e1c866a4b754e",
  measurementId: "G-0SJFDVQLLB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };