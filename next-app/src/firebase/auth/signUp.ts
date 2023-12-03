import firebaseApp from "../config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

import { BASE_REAL_URL, BASE_TEST_URL } from "@/app/user/commun/urls";
import { post_async_with_body } from "@/app/user/commun/fetch_async";

// Get the authentication instance using the Firebase app
const auth = getAuth(firebaseApp);

// Post to identity-socializer para el userCred
const registerIntoDb = async (name = 'ANONIM_ADMIN', email: string, id: string) => {
  let res = null;

  // 'http://10.0.2.2:8000/api/auth/create_admin'
  const url = BASE_REAL_URL + 'create_admin'; // 'https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/auth/create_admin';

  const datos = {
    id: id,
    email: email,
    name: name,
  };

  res = await post_async_with_body(url, datos);

  return res;
};

export async function register_in_db(email: string, id: string) {
  
  try{
        const result = await registerIntoDb(email.split("@")[0] , email, id);
        
        if(result !== null && result.status === 200){
          console.log("User created in DB");
        }else{
          console.error(result?.status !== 200 ? "Error in DB: Response status != 200" : "Error in SignUp: Call a Dev!");
        }
  }
  catch(err){
    console.error(err);
  }

  return;
}


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

