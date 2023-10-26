'use client';

import { Button, Card, Title } from '@tremor/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAuthContext } from '@/context/AuthContext';
import logOut from '@/firebase/auth/signOut';

import Search from '../search';
import UsersTable from '../table';
import { fetchAsync } from '../user/commun/fetch_async';
import { BASE_TEST_URL } from '../user/commun/urls';

export const dynamic = 'force-dynamic';

async function logOutAccount(event: { preventDefault: () => void }) {
  event.preventDefault();

  const { error } = await logOut();
  if (error) {
    console.log(error);
  }
}

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

  // Load data
  useEffect(() => {
    const fetchPost = async () => {
      const url = `${BASE_TEST_URL}users?limit=10&offset=0`;
      const data: [] = await fetchAsync(url);
      setUsers(data);
    };
    fetchPost();
  }, []);

  return (
    <main className="mx-auto max-w-7xl p-4 md:p-10">
      <div className="flex  bg-gradient-to-b from-zinc-200 pb-6 pt-8  lg:static lg:w-auto  lg:rounded-xl lg:border ">
        <Button onClick={() => router.push('/signup')}>
          Create Admin Account
        </Button>
      </div>

      <Title>Users</Title>
      <Search />
      <Card className="mt-6">
        <UsersTable users={users} />
      </Card>

      <div className="flex bg-gradient-to-b from-zinc-200 pb-6 pt-8  lg:static lg:w-auto  lg:rounded-xl lg:border ">
        <Button onClick={logOutAccount}>LogOut</Button>
      </div>
    </main>
  );
}

export default Page;
