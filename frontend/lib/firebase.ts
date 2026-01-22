import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAx6JdgUKuPMnRxMw6hTQ9Yn7E7iVBokI8",
  authDomain: "openguardai.firebaseapp.com",
  projectId: "openguardai",
  storageBucket: "openguardai.firebasestorage.app",
  messagingSenderId: "1063738159370",
  appId: "1:1063738159370:web:d5e01bef7ebba4b9920af3",
  // ❌ measurementId REMOVED
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
