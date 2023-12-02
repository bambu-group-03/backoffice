// Following and Followers table


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from '@tremor/react';
import { User } from '../table';
import Link from 'next/link';
import { profileWidth } from './userProfile';
import router from 'next/router';

export default function UsersInteractionTable({ users, interaction }: { users: User[], interaction: string }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell className="text-justify">Name</TableHeaderCell>
          <TableHeaderCell className="text-justify">Username</TableHeaderCell>
          <TableHeaderCell className="text-center">Ubication</TableHeaderCell>
          <TableHeaderCell className="text-center">Follows Me</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        

        {typeof users.length === 'undefined' || users?.length === 0 ? 
            <div className={`${profileWidth} mt-10`}>
            {"No " + interaction}
            </div>
          :

        users?.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.first_name} {user.last_name}</TableCell>
            <TableCell>
            <Link href={`/user?id=${user.id}`} className="text-blue-500 hover:text-blue-700" 
              onClick={()=>router.push( `/user?id=${user.id}` )}>
               <span className="link"> @{user.username}</span>
            </Link>

             
            </TableCell>
            <TableCell className="text-center">
              <Text >{user.ubication}</Text>
            </TableCell>

            <TableCell className="text-center">
              <Text >{user.is_followed ? "Yes" : "No"}</Text>
            </TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
