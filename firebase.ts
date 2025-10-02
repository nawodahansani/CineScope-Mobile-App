// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDArVjx4P00mDavOJjzu2o7coTA0kHBDVc",
  authDomain: "cinescope-2be15.firebaseapp.com",
  projectId: "cinescope-2be15",
  storageBucket: "cinescope-2be15.firebasestorage.app",
  messagingSenderId: "479392987359",
  appId: "1:479392987359:web:d7742394412a3b05f1916a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);

// Firestore
export const firestore = getFirestore(app);  // ✅ persistence disabled by default