import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const apiKey = import.meta.env.VITE_FIREBASE_KEY
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID
const appId = import.meta.env.VITE_FIREBASE_APP_ID
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "finlens-6ed66.firebaseapp.com",
  projectId: projectId,
  storageBucket: "finlens-6ed66.firebasestorage.app",
  messagingSenderId: "151746989738",
  appId: appId,
  measurementId: "G-Y4NE97S5XM"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);