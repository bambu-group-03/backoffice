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

import { BASE_INTERACTION_URL, BASE_REAL_URL, BASE_TEST_URL, BASE_TWEET_URL,  } from '../../app/user/commun/urls';

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
       
        break;

      case 2: // GET user following

        const fetchFollowing = async () => {
          const url = BASE_INTERACTION_URL + user.id + "/following"; 
          let following_received: [] = await fetch_async(url); 
          setFollowing(following_received);
        };
        fetchFollowing();
        break;

      case 3: // GET user followers

        const fetchFollowers = async () => {
          const url = BASE_INTERACTION_URL + user.id + "/followers"; 
          console.log("url: " + url);
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
    </div>
  );
}
