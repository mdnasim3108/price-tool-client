// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCskMJhGrSNbImBT-t2TloAtxXqK51mVdg",
  authDomain: "pricetoolauth.firebaseapp.com",
  projectId: "pricetoolauth",
  storageBucket: "pricetoolauth.appspot.com",
  messagingSenderId: "263336977121",
  appId: "1:263336977121:web:f6801b7fba3a4896e38da0",
  measurementId: "G-RPSSN7L5SS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app
