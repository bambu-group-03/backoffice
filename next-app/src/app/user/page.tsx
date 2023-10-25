'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { User } from '../table';
import UserProfile from './userProfile';
import { fetch_async } from './commun/fetch_async';
import error from 'next/error';
import { useEffect, useState } from 'react';


const ProfilePage = async () => {

  let [user, setUser] = useState({
    id: 1,
    name: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    verified: true,
    image:"",
    bio: "",
  });

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = `${pathname}?${searchParams}`

  const url = `https://dummyjson.com/users/${searchParams?.toString().slice(-1)}`; //"https://dummyjson.com/users/1";


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