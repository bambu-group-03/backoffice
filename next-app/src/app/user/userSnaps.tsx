import { Table, TableHead, TableRow, TableHeaderCell, TableBody, Text, TableCell } from "@tremor/react";
import { Switch } from '@headlessui/react'
import { profileWidth } from "./userProfile";
import Link from "next/link";
import { useState } from "react";

export interface Snap {
  id: number;
  author: string;
  content:string;
}

export default function SnapTable({ snaps }: { snaps: Snap[] }) {

  const [snapVisible, setSnapVisible] = useState(true);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Author</TableHeaderCell>
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

          snaps.map((snap:Snap) => (
            

            <TableRow key={snap.id}>
              
              <TableCell>{snap.author}</TableCell>
              
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

            ))}
      </TableBody>      
    </Table>
  );
}
