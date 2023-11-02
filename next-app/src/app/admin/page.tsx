// 'use client'

// import { useAuthContext } from "@/context/AuthContext";
// import router, { useRouter } from "next/router";
// import result from "postcss/lib/result";
// import { useEffect } from "react";

// const handleSingUp = async ( event: { preventDefault: () => void } ) => {
//   event.preventDefault();



//   router.push( "/" );
// }


// export default async function AdminPage(){
  

//   const { user } = useAuthContext() as { user: any };
//   const router = useRouter();

//   useEffect( () => {
    
//     // Redirect to the logIn page if the user is not logged in
//     if ( user == null ) {
//       router.push( "/signin" );
//     }
//   }, [ user, router ] );
  
//   return (

//     <main className="mx-auto max-w-7xl p-4 md:p-10">
//       <div className="flex  bg-gradient-to-b from-zinc-200 pb-6 pt-8  lg:static lg:w-auto  lg:rounded-xl lg:border ">
//         <button onClick={() => router.push( "/signup" )}>Create Admin Account</button>
//       </div>
//     </main>
//   );
// }

import { redirect } from 'next/navigation';

export default async function SnapsPage(){
  redirect('/');
}