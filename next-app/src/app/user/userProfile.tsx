import React, { Fragment, useCallback, useEffect, useState } from 'react';
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
import { Tab } from '@headlessui/react'
import TextareaAutosize from 'react-textarea-autosize';
import { getGradient } from '@/components/lib/gradient';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Switch } from '@headlessui/react'
import Image from 'next/image';

import { BASE_REAL_URL, BASE_TEST_URL, BASE_TWEET_URL,  } from '../../app/user/commun/urls';

import { DEFAULT_IMG_LINK } from './commun/urls';
import { fetch_async, put_async } from './commun/fetch_async';
import { Card, Text, Title } from '@tremor/react';
import SnapTable from './userSnaps';
import UsersInteractionTable from './userInteractions';


export const profileWidth = 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8';

function validImgUrl(url: string) {
  if(url.startsWith('http://') || url.startsWith('https://')){
    return url;
  }
  return DEFAULT_IMG_LINK
}

export default function UsersTable({ user }: {  user: User }) {


  const [data, setData] = useState(
    {
      id: user?.id || "-1",
      firstName: user?.first_name || 'Anonymous',
      lastName: user?.last_name || '',
      username: user?.username || 'anon',
      image: user?.profile_photo_id || DEFAULT_IMG_LINK,
      bio: user?.bio_msg || 'No Bio provided',
      user_verified: user?.verified || false,
      user_blocked: user?.blocked || false ,
    }
  );

  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snaps, setSnaps] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    setData(
      {
        id: user?.id || "-1",
        firstName: user?.first_name || 'Anonymous',
        lastName: user?.last_name || '',
        username: user?.username || 'anon',
        image: user?.profile_photo_id || DEFAULT_IMG_LINK,
        bio: user?.bio_msg || 'No Bio provided',
        user_verified: user?.verified || false,
        user_blocked: user?.blocked || false ,
      }
    );
    console.log("user: " + user);
  }, [user]);



  useEffect(() => {

    switch (selectedIndex) {
      case 0: // display bio
        break;
      
      case 1: // Display Snaps

        console.log("user.id: " + user.id);

        const limit = 30;
        const offset = 0;

        const fetchSnaps = async () => {
          const url = BASE_TWEET_URL +  user.id + "/snaps?limit=" + limit + "&offset=" + offset;

          console.log("url: " + url);

          let snaps_received: [] = await fetch_async(url); 
          setSnaps(snaps_received.snaps);
        };
        fetchSnaps();
       
        //setTweets( ["Tweet 1", "Tweet 2", "Tweet 3", "Tweet 4"]);
        break;

      case 2: // GET user following

        const fetchFollowing = async () => {
          //const url = "http://localhost:8000/api/auth/string_1/following"
          const url = BASE_REAL_URL + "api/auth/" + user.id + "/following"; 
          let following_received: [] = await fetch_async(url); 
          setFollowing(following_received);
        };
        fetchFollowing();


        //setFollowing(["Luis", "Edu", "Dani", "Mafer"]);
        break;
      case 3: // GET user followers

        const fetchFollowers = async () => {
          //const url = "http://localhost:8000/api/auth/string_1/followers"
          const url = BASE_REAL_URL + "api/auth/" + user.id + "/followers"; 
          let followers_received: [] = await fetch_async(url); 
          setFollowers(followers_received);
        };
        fetchFollowers();
        break;

      default:
        break;
    }

  }, [selectedIndex, []]);

  return (

    <div className="min-h-screen pb-20">
      <div>

        <div
          className={`h-48 w-full lg:h-20 
          ${getGradient(data.username)}`}
        >
        </div>

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
              src={validImgUrl(data.image)}
              alt={data.firstName}
              width={300}
              height={300}
            />
          </div>
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="flex min-w-0 flex-1 items-center space-x-2">
              <h1 className="text-2xl font-semibold text-black truncate">
                {data.firstName} {data.lastName}
              </h1>
              <h2 className="text-sm font-mono text-gray-400 truncate">
                @{data.username}
              </h2>
              {data.user_verified && (
                <CheckInCircleIcon className="w-6 h-6 text-[#0070F3]" />
              )}
            </div>
            {/* {user.verified ? (
              <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <a
                  href={`https://github.com/${data.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center px-4 py-2 border border-gray-800 hover:border-white shadow-sm text-sm font-medium rounded-md text-black font-mono bg-black focus:outline-none focus:ring-0 transition-all"
                >
                  <GitHubIcon className="mr-3 h-5 w-5 text-black" />
                  <span>More info</span>
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
            )} */}

        <Switch
            checked={!data.user_blocked}
            onChange={async () => {

              let url = "";
              let res = null;

              if (data.user_blocked) {
                url = BASE_REAL_URL + "unblock_user/" + data.id;
                res = await put_async(url);
              }else{
                url = BASE_REAL_URL + "block_user/" + data.id;
                res = await put_async(url);
              }

              setData({
                ...data,
                user_blocked: !data.user_blocked
              });
               
              }
            }
            className={`${
              !data.user_blocked ? 'bg-blue-600' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Enable notifications</span>
            <span
              className={`${
                !data.user_blocked ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
          </div>
          
        </div>
      </div>

      {/* Tabs */}
      <Tab.Group defaultIndex={0} selectedIndex={selectedIndex} 
        onChange={setSelectedIndex}
      >
      <div className="mt-6 sm:mt-2 2xl:mt-5">
        <div className="border-b border-gray-800">
          <div className={`${profileWidth} mt-10`}>
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          
          <Tab.List>

          <Tab  key={"profile_tab"} >
            {({ selected }) => (
              <div
                className={
                  selected ?  `text-black-500 bg-slate-300 whitespace-nowrap py-3 px-5 border-b-2 font-medium text-sm font-mono`
                   : `whitespace-nowrap py-3 px-5 border-b-2 font-medium text-sm font-mono`
                }
                data-headlessui-state="selected"
                >
                Profile
              </div>
            )}
          </Tab>

          <Tab  key={"snaps_tab"} >
            {({ selected }) => (
              <div
                className={
                  selected ?  `text-black-500 bg-slate-300 whitespace-nowrap py-3 px-5 border-b-2 font-medium text-sm font-mono`
                   : `whitespace-nowrap py-3 px-5 border-b-2 font-medium text-sm font-mono`
                }
                data-headlessui-state="selected"
                >
                Snaps
              </div>
            )}
          </Tab>

          <Tab  key={"following_tab"} >
            {({ selected }) => (
              <div
                className={
                  selected ?  `text-black-500 bg-slate-300 whitespace-nowrap py-3 px-5 border-b-2 font-medium text-sm font-mono`
                   : `whitespace-nowrap py-3 px-5 border-b-2 font-medium text-sm font-mono`
                }
                data-headlessui-state="selected"
                >
                Following
              </div>
            )}
          </Tab>

          <Tab  key={"followers_tab"} >
            {({ selected }) => (
              <div
                className={
                  selected ?  `text-black-500 bg-slate-300 whitespace-nowrap py-3 px-5 border-b-2 font-medium text-sm font-mono`
                   : `whitespace-nowrap py-3 px-5 border-b-2 font-medium text-sm font-mono`
                }
                data-headlessui-state="selected"
                >
                Followers
              </div>
            )}
          </Tab>
        </Tab.List>
            </nav>
          </div>
        </div>

      <Tab.Panels>
        <Tab.Panel>
            
               {/* Bio */}
          <div className={`${profileWidth} mt-10`}>
            <h2 className="font-semibold font-mono text-2xl text-black">Bio</h2>
              <article className="mt-3 max-w-2xl text-sm tracking-wider leading-6 text-black font-mono prose prose-headings:text-black prose-a:text-black">
                <p className="text-gray-400">{data.bio}</p>
              </article>
          </div>

        </Tab.Panel>
        
        <Tab.Panel>
          <div className={`${profileWidth} mt-10`}>
            <Card className="mt-6">
             <SnapTable snaps={snaps}></SnapTable>
            </Card> 

          </div>
        </Tab.Panel>
      
        <Tab.Panel>
          <div className={`${profileWidth} mt-10`}>
            <Card className="mt-6">
              <UsersInteractionTable users={following} interaction='following'></UsersInteractionTable>
            </Card> 
          </div>
          
        </Tab.Panel>
        
        <Tab.Panel>

          <div className={`${profileWidth} mt-10`}>
            <Card className="mt-6">
              <UsersInteractionTable users={followers} interaction='followers'></UsersInteractionTable>
            </Card>
          </div>

        </Tab.Panel>

      </Tab.Panels>
      </div>    
    </Tab.Group>

      {/* // Hacer switch para mostrar los datos de cada tab */}

     

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
          <Link href={`/${data.username}`} shallow replace scroll={false}>
            <a className="rounded-full border border-gray-800 hover:border-white w-12 h-12 flex justify-center items-center transition-all">
              <XIcon className="h-4 w-4 text-black" />
            </a>
          </Link>
        </div>
      ) : session?.username === data.username ? (
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
