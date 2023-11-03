import { Table, TableHead, TableRow, TableHeaderCell, TableBody, Text, TableCell } from "@tremor/react";
import { Switch } from '@headlessui/react'
import { profileWidth } from "./userProfile";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export interface Snap {
  id: number;
  user_id: number;
  content:string;
}

export default function SnapTable({ snaps }: { snaps: Snap[] }) {
  
  const router = useRouter();

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Username</TableHeaderCell>
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

            const [snapVisible, setSnapVisible] = useState(true);
            
            return (     

            <TableRow key={snap.id}>
              <TableCell>
                <Link href={`/user?id=${snap.user_id}`} className="text-blue-500 hover:text-blue-700"
                  onClick={()=> router.push( `/user?id=${snap.user_id}` )}>
                  <span className="link"> @{snap.user_id}</span>
                </Link>
              </TableCell>
              
              <TableCell>
                <Text>{snap.content}</Text>
              </TableCell>
              
              <TableCell>
                <Switch
                    checked={snapVisible}
                    onChange={(visibility) => {
                      setSnapVisible(visibility);
                      
                      // Pegarle al backend para cambiar la visibilidad del snap
                      
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