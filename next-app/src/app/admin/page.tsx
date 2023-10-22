'use client'
import { useAuthContext } from "@/context/AuthContext";
import logOut from "@/firebase/auth/signOut";
import { useRouter, redirect } from "next/navigation";
import { useEffect } from "react";

import { Card, Text, Title } from '@tremor/react';


import Search from '../../app/search';
import type { User } from '../../app/table';
import UsersTable from '../../app/table';

const REFRESH_INTERVAL = 1000 * 60 * 60 * 24; // 24 hours

export const dynamic = 'force-dynamic';

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    next: { revalidate: REFRESH_INTERVAL },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
  }

  return res.json();
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
       <Text>A list of users retrieved from a MySQL database.</Text>
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