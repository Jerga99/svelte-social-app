// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9MIvlUMT-_hk56HKF4D3e7Bbs6Ueo9Lg",
  authDomain: "svelte-social.firebaseapp.com",
  projectId: "svelte-social",
  storageBucket: "svelte-social.appspot.com",
  messagingSenderId: "209764616304",
  appId: "1:209764616304:web:1de523cd320dc27b6b4cb5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
