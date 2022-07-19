import { auth, provider,createUserWithEmailAndPassword, signInWithPopup } from '../firebase.config.js'

const SignUpwithGoogle = async () => {
  try {
    const response = await signInWithPopup(auth, provider)
  } catch (error) {
    console.log(error)
  }
}
const SignUpwithEmail = async (email : string, password : string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
  } catch (error) {
    console.log(error)
  }
}

export { SignUpwithGoogle, SignUpwithEmail }