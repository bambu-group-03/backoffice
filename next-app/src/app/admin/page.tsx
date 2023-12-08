'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useAuthContext } from '@/context/AuthContext';

import { fetch_async } from '../user/commun/fetch_async';
import { BASE_REAL_URL } from '../user/commun/urls';
import AdminTable from './admins';

export default async function AdminPage() {
  const { user } = useAuthContext() as { user: any };
  const router = useRouter();
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    // Redirect to the logIn page if the user is not logged in
    if (user === null) {
      router.push('/');
    }
  }, [user, []]);

  const limit = 1000;
  const offset = 0;

  useEffect(() => {
    const fetchData = async () => {
      const url = `${BASE_REAL_URL}admins?limit=${limit}&offset=${offset}`;
      const data: [] = await fetch_async(url, 'identity');
      setAdmins(data);
    };
    fetchData();
  }, []);

  return (
    <main className="mx-auto max-w-7xl p-4 md:p-10">
      <div className="container mx-auto">
        <div className="my-12 flex justify-center px-6">
          <div className="flex w-full lg:w-11/12 xl:w-3/4">
            <div className="hidden h-auto w-full rounded-l-lg bg-gray-400 bg-cover lg:block lg:w-1/2">
              <Image
                src="/assets/images/new_admin.jpg"
                alt="new_admin_img"
                width={500}
                height={500}
              />
            </div>

            <div className="w-full rounded-lg bg-white p-5 lg:w-1/2 lg:rounded-l-none">
              <div className="mb-4  rounded bg-white px-8 pb-8 pt-6">
                <div className="mb-6 py-10 text-center">
                  <div className="focus:shadow-outline w-full rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none">
                    <button onClick={() => router.push('/signup')}>
                      Create Admin Account
                    </button>
                  </div>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <a
                    className="inline-block align-baseline text-sm text-blue-500 hover:text-blue-800"
                    href="./recover-password"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h1>All Admins</h1>
        <AdminTable admins={admins} />
      </div>
    </main>
  );
}
