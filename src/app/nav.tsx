import type { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';

import Navbar from './navbar';

export default async function Nav() {
  const session: Session | null = await getServerSession();
  return <Navbar user={session?.user} />;
}
