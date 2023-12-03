import { Table, TableHead, TableRow, TableHeaderCell, TableBody, Text, TableCell } from "@tremor/react";
import { Switch } from '@headlessui/react'
import { profileWidth } from "./userProfile";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { post_async } from "./commun/fetch_async";
import { BASE_TWEET_VISIBILITY } from "./commun/urls";


export interface Snap {
  id: string;
  username:string,
  user_id: string;
  author: string;
  content:string;
  visibility: number;
  shares?: number;
  likes?: number;
  privacy? : number;
  created_at?: string;
}

const SNAP_VISIBLE = 1;
const SNAP_PRIVATE = 1;

export default function SnapTable({ snaps }: { snaps: Snap[] }) {
  
  const router = useRouter();

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

        {snaps.length === 0 ? 
            <div className={`${profileWidth} mt-10`}>
            {"No snaps"}
            </div>
          :

          snaps.map((snap:Snap) => {

            const [snapVisible, setSnapVisible] = useState((snap.visibility === SNAP_VISIBLE)? true : false);


            const snap_date = new Date(snap.created_at as string);
            const snap_date_string = snap_date.toLocaleDateString('en-GB');
            
            return (     

            <TableRow key={snap.id}>
              <TableCell>
                <Link href={`/user?id=${snap.user_id}`} className="text-blue-500 hover:text-blue-700"
                  onClick={()=> router.push( `/user?id=${snap.user_id}` )}>
                  <span className="link"> @{ snap.username }</span>
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
                <Text className="text-center">{snap.privacy === SNAP_PRIVATE ? "Private" : "Public" }</Text>
              </TableCell>

              <TableCell>
                <Text className="text-right">{snap_date_string}</Text>
              </TableCell>
              
              <TableCell className="flex justify-center items-center">
                <Switch
                    checked={snapVisible}
                    onChange={async (visibility) => {
                        
                      let url = "";
                      let res = null;

                      if (visibility.valueOf() === true) {

                        url = BASE_TWEET_VISIBILITY + snap.author + "/set_public/" + snap.id;
                        res = await post_async(url, "content");
                      }else{
                        url = BASE_TWEET_VISIBILITY + snap.author + "/set_private/" + snap.id;
                        res = await post_async(url, "content");
                      }
                      
                      setSnapVisible(visibility);
                    }}
                    className={`${
                      snapVisible ? 'bg-blue-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full`}
                  >
                    <span className="sr-only">Enable notifications</span>
                    <span
                      className={`${
                        snapVisible ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                    />
                </Switch>
              </TableCell>
             
            </TableRow>
            )}
          )}
      </TableBody>      
    </Table>
  );
}