'use client'

import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import { DEFAULT_NEW_ADMIN_IMG_LINK } from '../user/commun/urls';


export default async function AdminPage(){

  const { user } = useAuthContext() as { user: any };
  const router = useRouter();

  useEffect( () => {
    
    // Redirect to the logIn page if the user is not logged in
    if ( user === null ) {
      router.push( "/" );
    }
  }, [ user, [] ] );
  
  return (

    <main className="mx-auto max-w-7xl p-4 md:p-10">


		<div className="container mx-auto">
			<div className="flex justify-center px-6 my-12">

				<div className="w-full xl:w-3/4 lg:w-11/12 flex">

					<div
						className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
						// style="background-image: url('https://source.unsplash.com/K4mSJ7kc0As/600x800')"
					>
             <Image
              src={DEFAULT_NEW_ADMIN_IMG_LINK}
              alt='new_admin_img'
              width={500}
              height={500}
              />

          </div>

         

					<div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
{/*             
						<h3 className="pt-4 text-2xl text-center">Create Account</h3> */}
						<div className="px-8  pt-6 pb-8 mb-4 bg-white rounded">
							{/*</div><div className="mb-4">
								 <label className="block mb-2 text-sm font-bold text-gray-700" >
									Username
								</label>
								<input
									className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="username"
									type="text"
									placeholder="Username"
								/>
							</div>
							<div className="mb-4">
								<label className="block mb-2 text-sm font-bold text-gray-700" >
									Password
								</label>
								<input
									className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									id="password"
									type="password"
									placeholder="******************"
								/>
								<p className="text-xs italic text-red-500">Please choose a password.</p>
							</div>
							<div className="mb-4">
								<input className="mr-2 leading-tight" type="checkbox" id="checkbox_id" />
								<label className="text-sm" >
									Remember Me
								</label>
							</div> */}
							<div className="mb-6 py-10 text-center">
								{/* <button
									className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
									type="button"
								>
									Sign In
								</button> */}
                <div className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline">
                  <button onClick={() => router.push( "/signup" )}>Create Admin Account</button>
                </div>
							</div>
							<hr className="mb-6 border-t" />
							{/* <div className="text-center">
								<a
									className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
									href="#"
								>
									Create an Account!
								</a>
							</div> */}
							<div className="text-center">
								<a
									className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
									href="#"
								>
									Forgot Password?
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

       
    </main>
  );
}
