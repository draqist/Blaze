import {
  auth,
  createUserWithEmailAndPassword,
  provider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '../firebase.config.js';

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
  setError,
  Redirect,
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
    await createUserWithEmailAndPassword(auth, email, password);
    Redirect();
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
  Redirect: () => void,
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    Redirect();
  } catch (error) {
    console.log(error);
  }
};
export { SignUpwithGoogle, SignUpwithEmail, SignInwithEmail };
