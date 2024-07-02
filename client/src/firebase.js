// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-770f5.firebaseapp.com",
  projectId: "estate-770f5",
  storageBucket: "estate-770f5.appspot.com",
  messagingSenderId: "1022192150623",
  appId: "1:1022192150623:web:b241a24281ab2298aa53ea"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);