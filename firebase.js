// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCJ0OLZYP4Wt1km_WL3Wn54IVb99Wiod_4",
  authDomain: "progas-aadf6.firebaseapp.com",
  projectId: "progas-aadf6",
  storageBucket: "progas-aadf6.appspot.com",
  messagingSenderId: "642592681905",
  appId: "1:642592681905:web:e9b321004b0b0a2596d790",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
