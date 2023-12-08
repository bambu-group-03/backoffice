'use client';

import { Card } from '@tremor/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAuthContext } from '@/context/AuthContext';

import SearchSnaps from '../search-snaps';
import { fetch_async } from '../user/commun/fetch_async';
import { BASE_TWEET_URL } from '../user/commun/urls';
import type { Snap } from '../user/userSnaps';
import SnapTable from '../user/userSnaps';

export default async function SnapsPage() {
  const { user } = useAuthContext() as { user: any };
  const router = useRouter();

  const [snaps, setSnaps] = useState<Snap[]>([]);

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
      const url = `${BASE_TWEET_URL}get_all_snaps?limit=${limit}&offset=${offset}`;
      const snaps: [] = await fetch_async(url, 'content');
      setSnaps(snaps);
    };
    fetchData();
  }, []);

  return (
    <main className="mx-auto max-w-7xl p-4 md:p-10">
      <SearchSnaps set={setSnaps} />
      <Card className="mt-6">
        <SnapTable snaps={snaps} />
      </Card>
    </main>
  );
}
