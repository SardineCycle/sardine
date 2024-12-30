// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBN5flQFEo_cBhynX7lWu4tmyAJKcBh1AE",
  authDomain: "sardine-d1904.firebaseapp.com",
  projectId: "sardine-d1904",
  storageBucket: "sardine-d1904.firebasestorage.app",
  messagingSenderId: "711768074332",
  appId: "1:711768074332:web:efb515e8d2a1beae39de99",
  measurementId: "G-20BJ9KVYX2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);