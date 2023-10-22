import firebaseApp from "../config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

// Get the authentication instance using the Firebase app
const auth = getAuth(firebaseApp);

export default async function signUp(email: string, password: string) {
  let result = null,
  error = null; 

  try {
    console.log("signUp");
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e; // Catch and store any error that occurs during sign-up
  }

  return { result, error }; // Return the sign-up result and error (if any)
}
