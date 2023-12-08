import { Switch } from '@headlessui/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from '@tremor/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { post_async } from './commun/fetch_async';
import { BASE_TWEET_VISIBILITY } from './commun/urls';
import { profileWidth } from './userProfile';

export interface Snap {
  id: string;
  username: string;
  user_id: string;
  author: string;
  content: string;
  visibility: number;
  shares?: number;
  likes?: number;
  privacy?: number;
  created_at?: string;
}

const SNAP_VISIBLE = 1;
const SNAP_PRIVATE = 1;

export default function SnapTable({ snaps }: { snaps: Snap[] }) {
  const router = useRouter();

  const [snapVisibilities, setSnapVisibilities] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const initialSnapVisibilities: { [key: string]: boolean } = {};
    snaps.forEach((snap: Snap) => {
      initialSnapVisibilities[snap.id] = snap.visibility === SNAP_VISIBLE;
    });
    setSnapVisibilities(initialSnapVisibilities);
  }, [snaps]);

  const updateSnapVisibility = async (
    author: string,
    snapId: string,
    visibility: boolean,
  ) => {
    setSnapVisibilities((prevVisibilities) => ({
      ...prevVisibilities,
      [snapId]: visibility,
    }));

    const url = visibility
      ? `${BASE_TWEET_VISIBILITY + author}/set_public/${snapId}`
      : `${BASE_TWEET_VISIBILITY + author}/set_private/${snapId}`;

    await post_async(url, 'content');
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell className="text-justify">Username</TableHeaderCell>
          <TableHeaderCell className="text-justify">Content</TableHeaderCell>
          <TableHeaderCell className="text-center">Shares</TableHeaderCell>
          <TableHeaderCell className="text-center">Likes</TableHeaderCell>
          <TableHeaderCell className="text-center">Privacy</TableHeaderCell>
          <TableHeaderCell className="text-center">Date</TableHeaderCell>
          <TableHeaderCell className="text-center">Visibility</TableHeaderCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {snaps.length === 0 ? (
          <div className={`${profileWidth} mt-10`}>No snaps</div>
        ) : (
          snaps.map((snap: Snap) => {
            const snapVisible = snapVisibilities[snap.id] || false;
            const snap_date = new Date(snap.created_at as string);
            const snap_date_string = snap_date.toLocaleDateString('en-GB');

            return (
              <TableRow key={snap.id}>
                <TableCell>
                  <Link
                    href={`/user?id=${snap.user_id}`}
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => router.push(`/user?id=${snap.user_id}`)}
                  >
                    <span className="link"> @{snap.username}</span>
                  </Link>
                </TableCell>

                <TableCell className="whitespace-normal break-words">
                  <Text>{snap.content}</Text>
                </TableCell>

                <TableCell>
                  <Text className="text-center">{snap.shares}</Text>
                </TableCell>

                <TableCell>
                  <Text className="text-center">{snap.likes}</Text>
                </TableCell>

                <TableCell>
                  <Text className="text-center">
                    {snap.privacy === SNAP_PRIVATE ? 'Private' : 'Public'}
                  </Text>
                </TableCell>

                <TableCell>
                  <Text className="text-right">{snap_date_string}</Text>
                </TableCell>

                <TableCell className="flex items-center justify-center">
                  <Switch
                    checked={snapVisible}
                    onChange={async (visibility) => {
                      await updateSnapVisibility(
                        snap.author,
                        snap.id,
                        visibility,
                      );
                    }}
                    className={`${
                      snapVisible ? 'bg-blue-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span className="sr-only">Enable notifications</span>
                    <span
                      className={`${
                        snapVisible ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 rounded-full bg-white transition`}
                    />
                  </Switch>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
