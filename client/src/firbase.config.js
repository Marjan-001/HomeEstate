// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-a65b4.firebaseapp.com",
  projectId: "real-estate-a65b4",
  storageBucket: "real-estate-a65b4.appspot.com",
  messagingSenderId: "21247032843",
  appId: "1:21247032843:web:689f7af48249b22ab4510e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);