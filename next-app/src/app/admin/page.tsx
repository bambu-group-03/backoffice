'use client'

import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import AdminTable from './admins';
import { fetch_async } from '../user/commun/fetch_async';
import { BASE_REAL_URL } from '../user/commun/urls';


export default async function AdminPage(){

  const { user } = useAuthContext() as { user: any };
  const router = useRouter();
  let [admins, setAdmins] = useState([]);

  useEffect( () => {
    
    // Redirect to the logIn page if the user is not logged in
    if ( user === null ) {
      router.push( "/" );
    }
  }, [ user, [] ] );

  let limit = 1000;
  let offset = 0;

  useEffect(() => {
    const fetchData = async () => {
      const url = BASE_REAL_URL + "admins?limit=" + limit + "&offset=" + offset;
      let data: [] = await fetch_async(url);
      setAdmins(data);
    };
    fetchData();
  }, []);

  return (
    <main className="mx-auto max-w-7xl p-4 md:p-10">
      <div className="container mx-auto">
        <div className="flex justify-center px-6 my-12">

          <div className="w-full xl:w-3/4 lg:w-11/12 flex">

            <div
              className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
            >
              <Image
                src={'/assets/images/new_admin.jpg'}
                alt='new_admin_img'
                width={500}
                height={500}
                />
            </div>

            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <div className="px-8  pt-6 pb-8 mb-4 bg-white rounded">
                
                <div className="mb-6 py-10 text-center">
                
                  <div className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline">
                    <button onClick={() => router.push( "/signup" )}>Create Admin Account</button>
                  </div>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <a
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
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
          <AdminTable admins={admins}/>
          
      </div>
    </main>
  );
}
