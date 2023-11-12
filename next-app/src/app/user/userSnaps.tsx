import { Table, TableHead, TableRow, TableHeaderCell, TableBody, Text, TableCell } from "@tremor/react";
import { Switch } from '@headlessui/react'
import { profileWidth } from "./userProfile";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { put_async } from "./commun/fetch_async";
import { BASE_TWEET_URL, BASE_TWEET_VISIBILITY } from "./commun/urls";

export interface Snap {
  id: string;
  username:string,
  user_id: string;
  author: string;
  content:string;
  visibility: number;
}

const SNAP_VISIBLE = 1;

export default function SnapTable({ snaps }: { snaps: Snap[] }) {
  
  const router = useRouter();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>User ID</TableHeaderCell>
          <TableHeaderCell>Content</TableHeaderCell>
          <TableHeaderCell>Visibility</TableHeaderCell>
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

            const user_id = snap.username ? snap.username : snap.user_id;
            
            return (     

            <TableRow key={snap.id}>
              <TableCell>
                <Link href={`/user?id=${user_id}`} className="text-blue-500 hover:text-blue-700"
                  onClick={()=> router.push( `/user?id=${user_id}` )}>
                  <span className="link"> @{user_id}</span>
                </Link>
              </TableCell>
              
              <TableCell>
                <Text>{snap.content}</Text>
              </TableCell>
              
              <TableCell>
                <Switch
                    checked={snapVisible}
                    onChange={async (visibility) => {
                        
                      let url = "";
                      let res = null;

                      if (visibility.valueOf() === true) {

                        url = BASE_TWEET_VISIBILITY + snap.user_id + "/set_public/" + snap.id;
                        console.log("url: " + url);
                        res = await put_async(url);
                      }else{
                        url = BASE_TWEET_VISIBILITY + snap.user_id + "/set_private/" + snap.id;
                        console.log("url: " + url);
                        res = await put_async(url);
                      }
                      
                      console.log("response: " + res.status);
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