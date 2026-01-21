// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAx6JdgUKuPMnRxMw6hTQ9Yn7E7iVBokI8",
  authDomain: "openguardai.firebaseapp.com",
  projectId: "openguardai",
  storageBucket: "openguardai.firebasestorage.app",
  messagingSenderId: "1063738159370",
  appId: "1:1063738159370:web:d5e01bef7ebba4b9920af3",
  measurementId: "G-TPYF3SXYR3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);