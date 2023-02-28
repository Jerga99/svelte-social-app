
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9MIvlUMT-_hk56HKF4D3e7Bbs6Ueo9Lg",
  authDomain: "svelte-social.firebaseapp.com",
  projectId: "svelte-social",
  storageBucket: "svelte-social.appspot.com",
  messagingSenderId: "209764616304",
  appId: "1:209764616304:web:1de523cd320dc27b6b4cb5"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const firebaseAuth = getAuth(app);

