import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjh2fZTMSRY0sZuAYSTRbNBoc4VVpUrcw",
  authDomain: "fontaine-dev.firebaseapp.com",
  projectId: "fontaine-dev",
  storageBucket: "fontaine-dev.appspot.com",
  messagingSenderId: "901350104619",
  appId: "1:901350104619:web:7cbc7f225ef3ed93e5946e",
  measurementId: "G-7NDJ740NT3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);