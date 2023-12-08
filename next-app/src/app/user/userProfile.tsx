// import { MDXRemote } from 'next-mdx-remote';
import { Tab } from '@headlessui/react';
import { Switch } from '@headlessui/react';
import { Card } from '@tremor/react';
import React, { useEffect, useState } from 'react';

import { BlurImage, CheckInCircleIcon } from '@/components/icons';
import { getGradient } from '@/components/lib/gradient';

import type { User } from '../table';
import { fetch_async, put_async } from './commun/fetch_async';
import {
  BASE_INTERACTION_URL,
  BASE_REAL_URL,
  BASE_TWEET_URL,
  DEFAULT_IMG_LINK,
} from './commun/urls';
import UsersInteractionTable from './userInteractions';
import SnapTable from './userSnaps';

export const profileWidth = 'max-w-5xl mx-auto px-4 sm:px-6 lg:px-8';

function validImgUrl(url: string) {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return DEFAULT_IMG_LINK;
}

export default function UsersTable({ user }: { user: User }) {
  const [data, setData] = useState({
    id: user?.id || '-1',
    firstName: user?.first_name || 'Anonymous',
    lastName: user?.last_name || '',
    username: user?.username || 'anon',
    image: user?.profile_photo_id || DEFAULT_IMG_LINK,
    bio: user?.bio_msg || 'No Bio provided',
    user_verified: user?.certified || false,
    user_blocked: user?.blocked || false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snaps, setSnaps] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    setData({
      id: user?.id || '-1',
      firstName: user?.first_name || 'Anonymous',
      lastName: user?.last_name || '',
      username: user?.username || 'anon',
      image: user?.profile_photo_id || DEFAULT_IMG_LINK,
      bio: user?.bio_msg || 'No Bio provided',
      user_verified: user?.certified || false,
      user_blocked: user?.blocked || false,
    });
  }, [user]);

  useEffect(() => {
    switch (selectedIndex) {
      case 0: // display bio
        break;

      case 1: // Display Snaps
        const limit = 30;
        const offset = 0;

        const fetchSnaps = async () => {
          const url = `${BASE_TWEET_URL}admin/${user.id}/snaps?limit=${limit}&offset=${offset}`;

          const snaps_received: [] = await fetch_async(url, 'content');
          setSnaps(snaps_received.snaps);
        };
        fetchSnaps();

        break;

      case 2: // GET user following
        const fetchFollowing = async () => {
          const url = `${BASE_INTERACTION_URL + user.id}/following`;
          const following_received: [] = await fetch_async(url, 'identity');
          setFollowing(following_received);
        };
        fetchFollowing();
        break;

      case 3: // GET user followers
        const fetchFollowers = async () => {
          const url = `${BASE_INTERACTION_URL + user.id}/followers`;
          console.log(`url: ${url}`);
          const followers_received: [] = await fetch_async(url, 'identity');
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
        />

        <div
          className={`${profileWidth} -mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5`}
        >
          <div className="group relative h-24 w-24 overflow-hidden rounded-full sm:h-32 sm:w-32">
            <BlurImage
              src={validImgUrl(data.image)}
              alt={data.firstName}
              width={300}
              height={300}
            />
          </div>
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="flex min-w-0 flex-1 items-center space-x-2">
              <h1 className="truncate text-2xl font-semibold text-black">
                {data.firstName} {data.lastName}
              </h1>
              <h2 className="truncate font-mono text-sm text-gray-400">
                @{data.username}
              </h2>
              {data.user_verified && (
                <CheckInCircleIcon className="h-6 w-6 text-[#0070F3]" />
              )}
            </div>

            <Switch
              checked={!data.user_blocked}
              onChange={async () => {
                let url = '';
                let res = null;

                if (data.user_blocked) {
                  url = `${BASE_REAL_URL}unblock_user/${data.id}`;
                  res = await put_async(url, 'identity');
                } else {
                  url = `${BASE_REAL_URL}block_user/${data.id}`;
                  res = await put_async(url, 'identity');
                }

                setData({
                  ...data,
                  user_blocked: !data.user_blocked,
                });
              }}
              className={`${
                !data.user_blocked ? 'bg-blue-600' : 'bg-gray-200'
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Enable notifications</span>
              <span
                className={`${
                  !data.user_blocked ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tab.Group
        defaultIndex={0}
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
      >
        <div className="mt-6 sm:mt-2 2xl:mt-5">
          <div className="border-b border-gray-800">
            <div className={`${profileWidth} mt-10`}>
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <Tab.List>
                  <Tab key="profile_tab">
                    {({ selected }) => (
                      <div
                        className={
                          selected
                            ? `text-black-500 whitespace-nowrap border-b-2 bg-slate-300 px-5 py-3 font-mono text-sm font-medium`
                            : `whitespace-nowrap border-b-2 px-5 py-3 font-mono text-sm font-medium`
                        }
                        data-headlessui-state="selected"
                      >
                        Profile
                      </div>
                    )}
                  </Tab>

                  <Tab key="snaps_tab">
                    {({ selected }) => (
                      <div
                        className={
                          selected
                            ? `text-black-500 whitespace-nowrap border-b-2 bg-slate-300 px-5 py-3 font-mono text-sm font-medium`
                            : `whitespace-nowrap border-b-2 px-5 py-3 font-mono text-sm font-medium`
                        }
                        data-headlessui-state="selected"
                      >
                        Snaps
                      </div>
                    )}
                  </Tab>

                  <Tab key="following_tab">
                    {({ selected }) => (
                      <div
                        className={
                          selected
                            ? `text-black-500 whitespace-nowrap border-b-2 bg-slate-300 px-5 py-3 font-mono text-sm font-medium`
                            : `whitespace-nowrap border-b-2 px-5 py-3 font-mono text-sm font-medium`
                        }
                        data-headlessui-state="selected"
                      >
                        Following
                      </div>
                    )}
                  </Tab>

                  <Tab key="followers_tab">
                    {({ selected }) => (
                      <div
                        className={
                          selected
                            ? `text-black-500 whitespace-nowrap border-b-2 bg-slate-300 px-5 py-3 font-mono text-sm font-medium`
                            : `whitespace-nowrap border-b-2 px-5 py-3 font-mono text-sm font-medium`
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
                <h2 className="font-mono text-2xl font-semibold text-black">
                  Bio
                </h2>
                <article className="prose prose-headings:text-black prose-a:text-black mt-3 max-w-2xl font-mono text-sm leading-6 tracking-wider text-black">
                  <p className="text-gray-400">{data.bio}</p>
                </article>
              </div>
            </Tab.Panel>

            <Tab.Panel>
              <div className={`${profileWidth} mt-10`}>
                <Card className="mt-6">
                  <SnapTable snaps={snaps} />
                </Card>
              </div>
            </Tab.Panel>

            <Tab.Panel>
              <div className={`${profileWidth} mt-10`}>
                <Card className="mt-6">
                  <UsersInteractionTable
                    users={following}
                    interaction="following"
                  />
                </Card>
              </div>
            </Tab.Panel>

            <Tab.Panel>
              <div className={`${profileWidth} mt-10`}>
                <Card className="mt-6">
                  <UsersInteractionTable
                    users={followers}
                    interaction="followers"
                  />
                </Card>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </div>
      </Tab.Group>
    </div>
  );
}
