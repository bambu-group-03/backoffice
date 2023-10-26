'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { User } from '../table';
import { fetch_async } from './commun/fetch_async';
import { BASE_TEST_URL } from './commun/urls';
import UserProfile from './userProfile';

const ProfilePage = async () => {
  const [user, setUser] = useState({});

  const pathname = usePathname();
  const searchParams = useSearchParams();

  // const query = `${pathname}?${searchParams}`

  const url = `${BASE_TEST_URL}users/${searchParams?.toString().split('=')[1]}`;

  useEffect(() => {
    const fetchPost = async () => {
      const data: User = await fetch_async(url);
      setUser(data);
    };
    fetchPost();
  }, []);

  return <UserProfile settings={false} user={user} />;
};

export default ProfilePage;
