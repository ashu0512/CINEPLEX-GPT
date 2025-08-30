// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_MW58Y47I_SKpvubx0ZZ1Zx-sH994Huw",
  authDomain: "cineplexgpt.firebaseapp.com",
  projectId: "cineplexgpt",
  storageBucket: "cineplexgpt.firebasestorage.app",
  messagingSenderId: "571278882846",
  appId: "1:571278882846:web:c750083c7c5a78f166160f",
  measurementId: "G-FEM7NV8SVB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();