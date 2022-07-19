import {
  auth,
  provider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from '../firebase.config.js';

const SignUpwithGoogle = async () => {
  try {
    const response = await signInWithPopup(auth, provider);
  } catch (error) {
    console.log(error);
  }
};
// @ts-ignore
const SignUpwithEmail = async (email: string, password: string, setError, Redirect) => {
  try {
    console.log(email, password)
    await createUserWithEmailAndPassword(auth, email, password);
    Redirect()
  } catch (error) {
    // @ts-ignore
    setError({state: true, message: error.message});
    console.log(error);
  }
};

export { SignUpwithGoogle, SignUpwithEmail };
