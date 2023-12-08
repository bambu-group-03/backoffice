'use client';

import { useAuthContext } from '@/context/AuthContext';

import Navbar from './navbar';

export default async function Nav() {
  const { user } = useAuthContext() as { user: any };
  // const session = await getServerSession();
  return <Navbar user={user} />;
}
