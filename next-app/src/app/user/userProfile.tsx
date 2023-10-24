import React, { useCallback, useEffect, useState } from 'react';
import { User } from '../table';
import {
  CheckInCircleIcon,
  CheckIcon,
  EditIcon,
  GitHubIcon,
  LoadingDots,
  UploadIcon,
  XIcon,
  BlurImage
} from '@/components/icons';
//import { MDXRemote } from 'next-mdx-remote';
import TextareaAutosize from 'react-textarea-autosize';
import { getGradient } from '@/components/lib/gradient';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const profileWidth = 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8';

export default function UsersTable({ settings, user }: {  settings?: boolean, user: User }) {

  
  const [saving, setSaving] = useState(false);

  const [data, setData] = useState({
    username: user.username,
    image: user.image,
    bio: user.bio || 'No Bio provided',
  });


  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [error, setError] = useState('');

 

  const settingsPage =
    settings ||
    (searchParams.get('settings') === 'true' && pathname === '/settings');


  return (

    <div className="min-h-screen pb-20">
      <div>
        <div
          className={`h-48 w-full lg:h-64 
          ${getGradient(user.username)}`}
        />
        <div
          className={`${profileWidth} -mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5`}
        >
          <div className="relative group h-24 w-24 rounded-full overflow-hidden sm:h-32 sm:w-32">
            {/* {settingsPage && (
              <button
                className="absolute bg-gray-800 bg-opacity-50 hover:bg-opacity-70 w-full h-full z-10 transition-all flex items-center justify-center"
                onClick={() =>
                  alert('Image upload has been disabled for demo purposes.')
                }
              >
                <UploadIcon className="h-6 w-6 text-black" />
              </button>
            )} */}
            <BlurImage
              src={user.image}
              alt={user.name}
              width={300}
              height={300}
            />
          </div>
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="flex min-w-0 flex-1 items-center space-x-2">
              <h1 className="text-2xl font-semibold text-black truncate">
                {user.firstName} {user.lastName}
              </h1>
              {user.verified && (
                <CheckInCircleIcon className="w-6 h-6 text-[#0070F3]" />
              )}
            </div>
            {user.verified ? (
              <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <a
                  href={`https://github.com/${user.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center px-4 py-2 border border-gray-800 hover:border-white shadow-sm text-sm font-medium rounded-md text-black font-mono bg-black focus:outline-none focus:ring-0 transition-all"
                >
                  <GitHubIcon className="mr-3 h-5 w-5 text-black" />
                  <span>View GitHub Profile</span>
                </a>
              </div>
            ) : (
              <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <a
                  href="https://github.com/vercel/mongodb-starter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center px-4 py-2 border border-gray-800 hover:border-white shadow-sm text-sm font-medium rounded-md text-black font-mono bg-black focus:outline-none focus:ring-0 transition-all"
                >
                  <GitHubIcon className="mr-3 h-5 w-5 text-black" />
                  <span>Demo Account</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 sm:mt-2 2xl:mt-5">
        <div className="border-b border-gray-800">
          <div className={`${profileWidth} mt-10`}>
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  disabled={tab.name !== 'Profile'}
                  className={`${
                    tab.name === 'Profile'
                      ? 'border-white text-black'
                      : 'border-transparent text-gray-400 cursor-not-allowed'
                  }
                    whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm font-mono`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className={`${profileWidth} mt-16`}>
        <h2 className="font-semibold font-mono text-2xl text-black">Bio</h2>
        {settingsPage ? (
          <>
            <TextareaAutosize
              name="description"
              onInput={(e:any) => {
                setData({
                  ...data,
                  bio: (e.target as HTMLTextAreaElement).value
                });
              }}
              className="mt-1 w-full max-w-2xl px-0 text-sm tracking-wider leading-6 text-black bg-black font-mono border-0 border-b border-gray-800 focus:border-white resize-none focus:outline-none focus:ring-0"
              placeholder="Enter a short bio about yourself... (Markdown supported)"
              value={data.bio}
            />
            <div className="flex justify-end w-full max-w-2xl">
              <p className="text-gray-400 font-mono text-sm">
                {data.bio.length}/256
              </p>
            </div>
          </>
        ) : (
          <article className="mt-3 max-w-2xl text-sm tracking-wider leading-6 text-black font-mono prose prose-headings:text-black prose-a:text-black">
            <p className="text-gray-400">{data.bio}</p>
          </article>
        )}
      </div>

      {/* Edit buttons */}
      {/* {settingsPage ? (
        <div className="fixed bottom-10 right-10 flex items-center space-x-3">
          <p className="text-sm text-gray-500">{error}</p>
          <button
            className={`${
              saving ? 'cursor-not-allowed' : ''
            } rounded-full border border-[#0070F3] hover:border-2 w-12 h-12 flex justify-center items-center transition-all`}
            disabled={saving}
            onClick={handleSave}
          >
            {saving ? (
              <LoadingDots color="white" />
            ) : (
              <CheckIcon className="h-4 w-4 text-black" />
            )}
          </button>
          <Link href={`/${user.username}`} shallow replace scroll={false}>
            <a className="rounded-full border border-gray-800 hover:border-white w-12 h-12 flex justify-center items-center transition-all">
              <XIcon className="h-4 w-4 text-black" />
            </a>
          </Link>
        </div>
      ) : session?.username === user.username ? (
        <Link
          href={{ query: { settings: true } }}
          as="/settings"
          shallow
          replace
          scroll={false}
        >
          <a className="fixed bottom-10 right-10 rounded-full border bg-black border-gray-800 hover:border-white w-12 h-12 flex justify-center items-center transition-all">
            <EditIcon className="h-4 w-4 text-black" />
          </a>
        </Link>
      ) : null} */}
    </div>
  );
}

const tabs = [
  { name: 'Profile' },
  { name: 'Tweets' },
  { name: 'Following' },
  { name: 'Followers' },
];