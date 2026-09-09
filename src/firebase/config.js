import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Replace with your Firebase project configuration
// Get these values from Firebase Console > Project Settings > General > Your apps
const firebaseConfig = {
  apiKey: "AIzaSyDK5LgjZLAPkcHDIqcTCa__xqNM5Thn6rc",
  authDomain: "propertypasip-44239.firebaseapp.com",
  projectId: "propertypasip-44239",
  storageBucket: "propertypasip-44239.firebasestorage.app",
  messagingSenderId: "267835325389",
  appId: "1:267835325389:web:09d26a31d4ae80bd03e284",
  measurementId: "G-8DE1BH6SSW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
