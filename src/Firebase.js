// import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBli9MGPn2J6go7CQmbmg1qJxq8vOCQjjc',
  authDomain: 'snapchat-clone-e13b4.firebaseapp.com',
  projectId: 'snapchat-clone-e13b4',
  storageBucket: 'snapchat-clone-e13b4.appspot.com',
  messagingSenderId: '521217682983',
  appId: '1:521217682983:web:206b2692ee0684d39f2802',
  measurementId: 'G-VFY5405RYD',
}

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const storage = getStorage(firebaseApp);
const provider = new GoogleAuthProvider();

export { db, auth, storage, provider };

