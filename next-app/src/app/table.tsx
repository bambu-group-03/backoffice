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

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  phone_number: string;
  bio_msg: string;
  profile_photo_id: string;
  blocked: boolean;
  certified?: boolean;
  is_followed?: boolean;
  ubication?: string;
  status?: string;
  created_at?: string;
}

export default function UsersTable({ users }: { users: User[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Username</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Link</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              {user.first_name} {user.last_name}
            </TableCell>
            <TableCell>
              <Text>{user.username}</Text>
            </TableCell>
            <TableCell>
              <Text>{user.email}</Text>
            </TableCell>
            <TableCell>
              <Link
                href={`/user?id=${user.id}`}
                className="text-blue-500 hover:text-blue-700"
              >
                <span className="link">View</span>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
