import { getAuth, signOut } from 'firebase/auth';

import firebaseApp from '../config';

// Get the authentication instance using the Firebase app
const auth = getAuth(firebaseApp);

export default async function logOut() {
  let result = null;
  let error = null;

  try {
    result = await signOut(auth);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
