'use client';

import { Card } from '@tremor/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAuthContext } from '@/context/AuthContext';

import { fetch_async } from '../user/commun/fetch_async';
import { URL_CERTIFICATE_BASE } from '../user/commun/urls';
import VerifyTable from './verifyTable';

export default function VerifyPage() {
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
      const url = `${URL_CERTIFICATE_BASE}get_all_certified_requests?limit=${limit}&offset=${offset}`;
      const data: [] = await fetch_async(url, 'identity');
      setUsers(data);
    };
    fetchData();
  }, []);

  return (
    <main className="mx-auto max-w-7xl p-4 md:p-10">
      <Card className="mt-0">
        <VerifyTable users={users} />
      </Card>
    </main>
  );
}
