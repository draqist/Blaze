import axios from 'axios';
import {
  auth,
  createUserWithEmailAndPassword,
  provider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '../firebase.config.js';
import { Note, initialNote } from './types.js';

const SignUpwithGoogle = async () => {
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.log(error);
  }
};
// @ts-ignore
const SignUpwithEmail = async (
  email: string,
  password: string,
  setError: any,
  Redirect: () => void,
) => {
  const actionCodeSettings = {
    url: 'http://localhost:3000/dashboard',
    iOS: {
      bundleId: 'com.example.ios',
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12',
    },
    handleCodeInApp: false,
  };

  try {
    await createUserWithEmailAndPassword(auth, email, password).then(
      (userMeta) => {
        if (userMeta) {
          Redirect();
        } else {
          setError({ state: true, message: 'Error logging in' });
        }
      },
    );
    // await sendEmailVerification(newUser.user)
  } catch (error) {
    // @ts-ignore
    setError({ state: true, message: error.message });
    console.log(error);
  }
};
const SignInwithEmail = async (
  email: string,
  password: string,
  setError: any,
  Redirect: () => void,
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password).then((userMeta) => {
      if (userMeta) {
        Redirect();
      } else {
        // setError({state: true, message: "Error logging in"})
      }
    });
  } catch (error) {
    console.log(error);
    // @ts-ignore
    setError({ state: true, message: error.message });
  }
};
async function getNotes() {
  try {
    const notes = await axios.get('/api/notes');
    console.log(notes.data);
  } catch (error) {
    console.log(error);
  }
}

async function createNewNote(
  newNote: Note,
  onClose: () => void,
  setNewNote: () => void,
  initialNote: any,
) {
  try {
    const createnote = await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newNote),
    });
    console.log(createnote);
    onClose();
    return createnote;
  } catch (error) {
    return error;
  } finally {
    // @ts-ignore
    setNewNote(initialNote);
    getNotes();
  }
}
export { SignUpwithGoogle, SignUpwithEmail, SignInwithEmail };
