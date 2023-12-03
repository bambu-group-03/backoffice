import { Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell,Text, Button } from "@tremor/react";
import Link from "next/link";
import { User } from "../table";
import {  put_async } from "../user/commun/fetch_async";
import { useEffect, useState } from "react";
import { profileWidth } from "../user/userProfile";


export default function VerifyTable({ users }: { users: User[] }) {

  const [userStatus, setUserStatus] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const initialUserStatus: { [key: string]: string } = {};
    users.forEach((user: User) => {
      initialUserStatus[user.id] = user.status? user.status : "Pending";
    });
    setUserStatus(initialUserStatus);
  }, [users]);

  const updateUserStatus = async (userId: string, status: string) => {
    setUserStatus((prevStatus) => ({
      ...prevStatus,
      [userId]: status === "approve" ? "Approved" : "Rejected",
    }));
    
    const url = "/api/certified_request/" + status + "/" + userId;

    await put_async(url, "identity");
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell className=" text-center">Username</TableHeaderCell>
          <TableHeaderCell className=" text-center">Email</TableHeaderCell>
          <TableHeaderCell className=" text-center">Date</TableHeaderCell>
          <TableHeaderCell className=" text-center">State</TableHeaderCell>
          <TableHeaderCell className=" text-center">Aprove</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          users.length === 0 ?
          
          <div className={`${profileWidth} mt-10`}>
            {"No users waiting to be certified"}
          </div>
        :
        
        users.map((user) => {

          const userStat = userStatus[user.id] || "Pending";
          const admin_date = new Date(user.created_at as string);
          const admin_date_string = admin_date.toLocaleDateString('en-GB');


          return (  

          <TableRow key={user.id}>

            <TableCell>
              <Link href={`/user?id=${user.id}`} className="text-blue-500 hover:text-blue-700">
                <span className="link">
                   {user.username}
                </span>
              </Link>
            </TableCell>

            <TableCell>
              <Text>{user.email}</Text>
            </TableCell>

            <TableCell  className="text-center space-x-4">
              <Text>{admin_date_string}</Text>
            </TableCell>
      
            <TableCell className="text-center">
              <Text>{userStat}</Text>
            </TableCell>

            <TableCell className="text-center space-x-4">
              <Button className="bg-blue-500 hover:bg-blue-800 text-white px-4 py-2 rounded"
                onClick={async() => {
                  await updateUserStatus(user.id, "approve");
                }}
              >Aprove</Button>

              <Button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                onClick={async() => {
                  await updateUserStatus(user.id, "reject");
                }}
              >Reject</Button>
            </TableCell>
          
          </TableRow>
        )
      }
      )}
      </TableBody>
    </Table>
  );
}
