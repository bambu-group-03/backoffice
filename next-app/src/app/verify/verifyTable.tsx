import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from '@tremor/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { delete_async, put_async } from '../user/commun/fetch_async';
import { profileWidth } from '../user/userProfile';
import { Tab } from '@headlessui/react';

type CertifiedType = {
  id: string;
  user_id: string;
  dni: string;
  img1_url: string;
  img2_url: string;
  status: string;
  created_at: string;
  username: string;
  email: string;
};

export default function VerifyTable({ users }: { users: CertifiedType[] }) {
  const [userStatus, setUserStatus] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const initialUserStatus: { [key: string]: string } = {};
    users.forEach((user: CertifiedType) => {
      initialUserStatus[user.id] = user.status ? user.status : 'Pending';
    });
    setUserStatus(initialUserStatus);
  }, [users]);

  const updateUserStatus = async (userId: string, status: string) => {
    setUserStatus((prevStatus) => ({
      ...prevStatus,
      [userId]: status === 'approve' ? 'Approved' : 'Rejected',
    }));

    const url = `/api/certified_request/${status}/${userId}`;

    await put_async(url, 'identity');
  };

  const deleteUserStatus = async (userId: string) => {
    setUserStatus((prevStatus) => ({
      ...prevStatus,
      [userId]: 'Deleted',
    }));

    const url = `/api/certified_request/delete/${userId}`;

    await delete_async(url, 'identity');
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell className=" text-center">Username</TableHeaderCell>
          <TableHeaderCell className=" text-center">DNI</TableHeaderCell>
          <TableHeaderCell className=" text-center">Email</TableHeaderCell>
          <TableHeaderCell className=" text-center">Date</TableHeaderCell>
          <TableHeaderCell className=" text-center">State</TableHeaderCell>
          <TableHeaderCell className=" text-center">Action</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.length === 0 ? (
          <div className={`${profileWidth} mt-10`}>
            No users waiting to be certified
          </div>
        ) : (
          users.map((user) => {
            const userStat = userStatus[user.id] || 'Pending';
            const admin_date = new Date(user.created_at as string);
            const admin_date_string = admin_date.toLocaleDateString('en-GB');

            return (
              <TableRow key={user.id}>
                <TableCell>
                  <Text className='text-center'>
                  <Link
                    href={`/user?id=${user.user_id}`}
                    className="text-blue-500 hover:text-blue-700 text-center"
                  >
                    <span className="link">{user.username}</span>
                  </Link>
                  </Text>
                </TableCell>

                <TableCell>
                  <Text className='text-center'>{user.dni}</Text>
                </TableCell>

                <TableCell>
                  <Text className='text-center'>{user.email}</Text>
                </TableCell>

                <TableCell className="space-x-4 text-center">
                  <Text>{admin_date_string}</Text>
                </TableCell>

                <TableCell className="text-center">
                  <Text>{userStat}</Text>
                </TableCell>

                <TableCell className="space-x-4 text-center">
                  {userStat === 'Pending' ? (
                    <div>
                      <Button
                        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-800"
                        onClick={async () => {
                          await updateUserStatus(user.id, 'approve');
                        }}
                      >
                        Aprove
                      </Button>

                      <Button
                        className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                        onClick={async () => {
                          await updateUserStatus(user.id, 'reject');
                        }}
                      >
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Button
                        className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                        onClick={async () => {
                          await deleteUserStatus(user.id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}
