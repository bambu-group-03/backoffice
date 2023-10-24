'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { User } from '../table';
import UserProfile from './userProfile';

const REFRESH_INTERVAL = 1000 * 60 * 60 * 24; // 24 hours


const ProfilePage = async () => {
  //const router = useRouter();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  //const { id } = router.query;

  const query = `${pathname}?${searchParams}`

  const url = `https://dummyjson.com/users/${searchParams?.toString().slice(-1)}`; //"https://dummyjson.com/users/1";


  const res = await fetch(url, {
    next: { revalidate: REFRESH_INTERVAL },
  });

  const user:User = await res.json();

  //console.log('res', res);

  return (
    <UserProfile settings={false} user={user} />
  );
};

export default ProfilePage;