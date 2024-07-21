// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from  "firebase/firestore"
import { getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: process.env.NEXT_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_MEASUREMENT_ID
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
// const analytics = getAnalytics(app);
export {db,storage}