'use client';

import { Card } from '@tremor/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAuthContext } from '@/context/AuthContext';

import SearchUsers from '../search-users';
import UsersTable from '../table';
import { fetch_async } from '../user/commun/fetch_async';
import { BASE_REAL_URL } from '../user/commun/urls';

export const dynamic = 'force-dynamic';

async function Page({ searchParams }: { searchParams: { q: string } }) {
  const search = searchParams.q ?? '';
  console.log('search', search);

  const { user } = useAuthContext() as { user: any };
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Redirect to the logIn page if the user is not logged in
    if (user == null) {
      router.push('/signin');
    }
  }, [user, router]);

  const limit = 1000;
  const offset = 0;

  // Load data
  useEffect(() => {
    const fetchData = async () => {
      const url = `${BASE_REAL_URL}users?limit=${limit}&offset=${offset}`;
      const data: [] = await fetch_async(url, 'identity');
      setUsers(data);
    };
    fetchData();
  }, []);

  return (
    <main className="mx-auto max-w-7xl p-4 md:p-10">
      <SearchUsers set={setUsers} />
      <Card className="mt-6">
        <UsersTable users={users} />
      </Card>
    </main>
  );
}

export default Page;
