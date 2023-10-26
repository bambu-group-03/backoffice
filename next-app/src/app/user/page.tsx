'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { User } from '../table';
import { fetchAsync } from './commun/fetch_async';
import { BASE_TEST_URL } from './commun/urls';
import UserProfile from './userProfile';

const ProfilePage = async () => {
  const [user, setUser] = useState({});

  const searchParams = useSearchParams();

  // const query = `${pathname}?${searchParams}`

  useEffect(() => {
    const url = `${BASE_TEST_URL}users/${searchParams
      ?.toString()
      .split('=')[1]}`;
    const fetchPost = async () => {
      const data: User = await fetchAsync(url);
      setUser(data);
    };
    fetchPost();
  }, [searchParams]);

  return <UserProfile settings={false} user={user} />;
};

export default ProfilePage;
