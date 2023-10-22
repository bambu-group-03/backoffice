'use client'
import { useAuthContext } from "@/context/AuthContext";
import logOut from "@/firebase/auth/signOut";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Page(): JSX.Element {
  
  const { user } = useAuthContext() as { user: any };
  const router = useRouter();

  useEffect( () => {
    
    // Redirect to the logIn page if the user is not logged in
    if ( user == null ) {
      router.push( "/signin" );
    }
  }, [ user, router ] );

  return (
    <div>
      <h1>Only logged-in users can view this page</h1>

      <p>The user is {user.email}</p>      
      <button onClick={ async (event: { preventDefault: () => void }) => {
        event.preventDefault()
        
        const { result, error } = await logOut()
        if (error) {
          console.log(error)
          return
        }
        
        }}>LogOut</button>
    </div>
    
  );
}

export default Page;