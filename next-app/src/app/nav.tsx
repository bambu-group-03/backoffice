'use client'

import Navbar from './navbar';
import { useAuthContext } from '@/context/AuthContext';

export default async function Nav() {
  const { user } = useAuthContext() as { user: any };
  //const session = await getServerSession();
  return <Navbar user={user} />;
}
