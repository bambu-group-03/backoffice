'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { User } from '../table';
import UserProfile from './userProfile';
import { fetch_async } from './commun/fetch_async';
import error from 'next/error';
import { useEffect, useState } from 'react';


const ProfilePage = async () => {

  let [user, setUser] = useState({});

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = `${pathname}?${searchParams}`

  const url = `http://localhost:8000/api/auth/users/${searchParams?.toString()
                  .split("=")[1]}`; //"http://localhost:8000/api/auth/users/string";


  console.log('url', url);


  useEffect(() => {
    const fetchPost = async () => {
      let data: User = await fetch_async(url); 
      setUser(data);
    };
    fetchPost();
  }, []);

  
  return (
    <UserProfile settings={false} user={user} />
  );
};

export default ProfilePage;