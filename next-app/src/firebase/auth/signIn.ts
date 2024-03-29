import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import firebase_app from '../config';

// Get the authentication instance using the Firebase app
const auth = getAuth(firebase_app);

export default async function signIn(email: string, password: string) {
  let result = null;
  let error = null;

  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
