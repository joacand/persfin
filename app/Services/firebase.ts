import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1QlIp4j3EE4j3cFNETFxsiBB9MPT5o4s",
  authDomain: "persfin-e1e0a.firebaseapp.com",
  projectId: "persfin-e1e0a",
  storageBucket: "persfin-e1e0a.firebasestorage.app",
  messagingSenderId: "659449497592",
  appId: "1:659449497592:web:08403e7f439dbb0d0b380d"
};

// Initialize app once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);