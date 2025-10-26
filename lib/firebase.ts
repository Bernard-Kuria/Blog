import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDdOf3yF2LlmKBLKe0Eqn7hIfErBs-R7Xc",
  authDomain: "my-life-uncharted.firebaseapp.com",
  projectId: "my-life-uncharted",
  storageBucket: "my-life-uncharted.firebasestorage.app",
  messagingSenderId: "913164628777",
  appId: "1:913164628777:web:e80fdf57f47786ba093d38",
  measurementId: "G-SNKCNCZMYL",
};

// Prevent re-initialization in Next.js hot reloads
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const storage = getStorage(app);
