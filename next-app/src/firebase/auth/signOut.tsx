import firebaseApp from "../config";
import { signOut, getAuth } from "firebase/auth";

// Get the authentication instance using the Firebase app
const auth = getAuth(firebaseApp);

export default async function logOut() {

  let result = null, 
  error = null; 

  try {
    result = await signOut(auth);
  } catch (e) {
    error = e;
  }

  return { result, error }; 
}