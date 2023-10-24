'use client'
import { useAuthContext } from "@/context/AuthContext";
import logOut from "@/firebase/auth/signOut";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Card, Text, Title } from '@tremor/react';


import Search from '../../app/search';
import type { User } from '../../app/table';
import UsersTable from '../../app/table';
import { url } from "inspector";

const REFRESH_INTERVAL = 1000 * 60 * 60 * 24; // 24 hours

export const dynamic = 'force-dynamic';

async function getData() {
  //const url =  'https://jsonplaceholder.typicode.com/users';
  const url = "https://dummyjson.com/users";
  //const url = 'https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/auth/users?limit=10&offset=0'
  const res = await fetch(url, {
    next: { revalidate: REFRESH_INTERVAL },
  });

  console.log('res', res);

  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();

  return data.users
}

async function logOutAccount(event: { preventDefault: () => void }) {
  
    event.preventDefault();
    
    const { result, error } = await logOut();
    if (error) {
      console.log(error)
      return
    }
}

async function Page({
  searchParams,
  }: {
    searchParams: { q: string };
  }   ) {

  const search = searchParams.q ?? '';
  console.log('search', search);
  
  const { user } = useAuthContext() as { user: any };
  const router = useRouter();

  useEffect( () => {
    
    // Redirect to the logIn page if the user is not logged in
    if ( user == null ) {
      router.push( "/signin" );
    }
  }, [ user, router ] );

  const users: User[] = await getData();

  return (
    <main className="mx-auto max-w-7xl p-4 md:p-10">

      <div className="flex  bg-gradient-to-b from-zinc-200 pb-6 pt-8  lg:static lg:w-auto  lg:rounded-xl lg:border ">
        <button onClick={() => router.push( "/signup" )}>Create Admin Account</button>
      </div>
      
     
       <Title>Users</Title>
       <Search />
       <Card className="mt-6">
         <UsersTable users={users} />
       </Card>     
      
      <div className="flex bg-gradient-to-b from-zinc-200 pb-6 pt-8  lg:static lg:w-auto  lg:rounded-xl lg:border ">
        <button onClick={logOutAccount}>LogOut</button>
      </div>
    </main>
  );
}

export default Page;