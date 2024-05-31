
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAs0y-GK2Fnqei4eeDvQOXVqLANYVI1tTE",
    authDomain: "todo-cadaf.firebaseapp.com",
    projectId: "todo-cadaf",
    storageBucket: "todo-cadaf.appspot.com",
    messagingSenderId: "133021622061",
    appId: "1:133021622061:web:a46041ae348ba3d5f93da4",
    measurementId: "G-JHQYN55WLM"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };