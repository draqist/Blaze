import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebase.config.js'
import {useRouter} from 'next/router'

const SignUpwithGoogle = async () => {
  const router =  useRouter()
  try {
    const response = await signInWithPopup(auth, provider)
    router.push('/dashboard')
  } catch (error) {
    console.log(error)
  }
}

const SignUpwithEmail = async () => {
  try {
    
  } catch (error) {
    console.log(error)
  }
}

export {SignUpwithGoogle}