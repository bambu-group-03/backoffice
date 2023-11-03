'use client'

import { useAuthContext } from "@/context/AuthContext";
import logOut from "@/firebase/auth/signOut";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Card, Text, Title } from '@tremor/react';

import { BASE_TEST_URL, BASE_REAL_URL } from '../user/commun/urls';

import Search from '../search';
import UsersTable from '../table';
import { fetch_async } from "../user/commun/fetch_async";

export const dynamic = 'force-dynamic';


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
  let [users, setUsers] = useState([]);

  useEffect( () => {
    
    // Redirect to the logIn page if the user is not logged in
    if ( user == null ) {
      router.push( "/signin" );
    }
  }, [ user, router ] );


  // Load data
  useEffect(() => {
    const fetchData = async () => {
      const url = BASE_REAL_URL + "users?limit=10&offset=0";
      let data: [] = await fetch_async(url);
      setUsers(data);
    };
    fetchData();
  }, []);


  return (
    <main className="mx-auto max-w-7xl p-4 md:p-10">
       <Search setUsers={setUsers}/>
       <Card className="mt-6">
         <UsersTable users={users} />
       </Card>     
    </main>
  );
}

export default Page;