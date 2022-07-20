import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  applyActionCode,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD75rObGRf-m_TTH4iEU2LN9Ar7rA24XWo',
  authDomain: 'blaze-de.firebaseapp.com',
  projectId: 'blaze-de',
  storageBucket: 'blaze-de.appspot.com',
  messagingSenderId: '782372235547',
  appId: '1:782372235547:web:754e069389bc0498ec8bbe',
  measurementId: 'G-XDH33E43XF',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);

export {
  app,
  auth,
  provider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  applyActionCode,
  sendEmailVerification,
  signInWithEmailAndPassword,
};
