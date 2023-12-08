'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { User } from '../table';
import { fetch_async } from './commun/fetch_async';
import { BASE_REAL_URL } from './commun/urls';
import UserProfile from './userProfile';

const ProfilePage = async () => {
  const [user, setUser] = useState({});

  const searchParams = useSearchParams();

  // const query = `${pathname}?${searchParams}`

  const url = `${BASE_REAL_URL}users/${searchParams?.toString().split('=')[1]}`;

  useEffect(() => {
    const fetchUsers = async () => {
      const user: User = await fetch_async(url, 'identity');
      setUser(user);
    };
    fetchUsers();
  }, []);

  return <UserProfile settings={false} user={user} />;
};

export default ProfilePage;
