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

export default function UsersInteractionTable({ users, interaction }: { users: User[], interaction: string }) {
  return (

    
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Username</TableHeaderCell>
          <TableHeaderCell>Link</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        
        {users.length === 0 ? 
            <div className={`${profileWidth} mt-10`}>
            {"No " + interaction}
            </div>
          :

        users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.firstName} {user.lastName}</TableCell>
            <TableCell>
              <Text>{user.username}</Text>
            </TableCell>
            <TableCell>
              <Link href={`/user?id=${user.id}`} className="text-blue-500 hover:text-blue-700">
                <span className="link">View</span>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
