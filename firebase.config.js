// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD75rObGRf-m_TTH4iEU2LN9Ar7rA24XWo",
  authDomain: "blaze-de.firebaseapp.com",
  projectId: "blaze-de",
  storageBucket: "blaze-de.appspot.com",
  messagingSenderId: "782372235547",
  appId: "1:782372235547:web:754e069389bc0498ec8bbe",
  measurementId: "G-XDH33E43XF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);