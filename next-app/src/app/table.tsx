import Link from "next/link";
import type { MDXRemoteSerializeResult } from 'next-mdx-remote';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from '@tremor/react';

export interface User {
  id: number;
  name: string;
  firstName: string;
  username: string;
  email: string;
  verified: boolean;
  image:string;
  bio?: string;
  bioMdx: MDXRemoteSerializeResult<Record<string, unknown>>;
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
            <TableCell>{user.name}</TableCell>
            <TableCell>
              <Text>{user.username}</Text>
            </TableCell>
            <TableCell>
              <Text>{user.email}</Text>
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
