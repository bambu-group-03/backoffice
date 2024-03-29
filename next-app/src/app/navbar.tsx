'use client';

import { Disclosure, Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { DefaultSession } from 'next-auth';
import { Fragment } from 'react';

import logOut from '@/firebase/auth/signOut';

const navigation = [
  { name: 'Users', href: '/' },
  { name: 'Snaps', href: '/snaps' },
  { name: 'Admin', href: '/admin' },
  { name: 'Statistics', href: '/statistics' },
  { name: 'Verify', href: '/verify' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

async function logOutAccount(event: { preventDefault: () => void }) {
  event.preventDefault();

  const { result, error } = await logOut();
  if (error) {
    console.log(error);
  }
}

export default function Navbar({ user }: { user: DefaultSession['user'] }) {
  const pathname = usePathname();

  return (
    <Disclosure as="nav" className="bg-white shadow-sm">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="flex shrink-0 items-center">
                  <Image
                    className="h-18 w-18 rounded-full"
                    src={
                      user?.image ||
                      'https://avatars.githubusercontent.com/t/8529037?s=116&v=4'
                    }
                    height={50}
                    width={50}
                    alt={`${user?.name || 'placeholder'} avatar`}
                  />
                </div>
                <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        pathname === item.href
                          ? 'border-slate-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
                      )}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button
                      className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                      disabled={!user}
                    >
                      <span className="sr-only">Open user menu</span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                        />
                      </svg>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                      {user ? (
                        <Menu.Item>
                          {({ active, close }) => (
                            <button
                              type="button"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'flex w-full px-4 py-2 text-sm text-gray-700',
                              )}
                              onClick={(e) => {
                                e.preventDefault();
                                logOutAccount(e);
                                close();
                              }}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      ) : (
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              type="button"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'flex w-full px-4 py-2 text-sm text-gray-700',
                              )}
                              onClick={() => console.log(user)}
                            >
                              Sign in
                            </button>
                          )}
                        </Menu.Item>
                      )}

                      {/* <Menu.Item>
                          {({ active }) => (
                            <button
                              type="button"
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'flex w-full px-4 py-2 text-sm text-gray-700',
                              )}
                              onClick={logOutAccount}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item> */}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              {/* <div className="-mr-2 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div> */}
            </div>
          </div>
          {/* 
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    pathname === item.href
                      ? 'bg-slate-50 border-slate-500 text-slate-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium',
                  )}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
              {user ? (
                <>
                  <div className="flex items-center px-4">
                    <div className="shrink-0">
                      <Image
                        className="h-8 w-8 rounded-full"
                        src={user.image || 'https://avatar.vercel.sh/leerob'}
                        height={32}
                        width={32}
                        alt={`${user.name} avatar`}
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {user.name}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <button
                      type="button"
                      onClick={() => signOut()}
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                    >
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-3 space-y-1">
                  <button
                    type="button"
                    onClick={() => signIn('github')}
                    className="flex w-full px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  >
                    Sign in
                  </button>
                </div>
              )}
            </div>
          </Disclosure.Panel> */}
        </>
      )}
    </Disclosure>
  );
}
