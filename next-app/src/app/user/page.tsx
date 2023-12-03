'use client'

import { usePathname, useSearchParams } from 'next/navigation';
import { User } from '../table';
import UserProfile from './userProfile';
import { fetch_async } from './commun/fetch_async';
import { useEffect, useState } from 'react';

import { BASE_REAL_URL } from './commun/urls';


const ProfilePage = async () => {

  let [user, setUser] = useState({});

  const searchParams = useSearchParams();

  //const query = `${pathname}?${searchParams}`
                   
  const url = BASE_REAL_URL + "users/" + searchParams?.toString().split("=")[1];

  useEffect(() => {
    const fetchUsers = async () => {
      let user: User = await fetch_async(url, "identity"); 
      setUser(user);
    };
    fetchUsers();
  }, []);

  
  return (
    <UserProfile settings={false} user={user} />
  );
};

export default ProfilePage;
