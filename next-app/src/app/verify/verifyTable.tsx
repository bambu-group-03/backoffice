import { Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell,Text, Button } from "@tremor/react";
import Link from "next/link";
import { User } from "../table";


export default function VerifyTable({ users }: { users: User[] }) {
  

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell className=" text-center">Name</TableHeaderCell>
          <TableHeaderCell className=" text-center">Username</TableHeaderCell>
          <TableHeaderCell className=" text-center">Email</TableHeaderCell>
          <TableHeaderCell className=" text-center">Link</TableHeaderCell>
          <TableHeaderCell className=" text-center">Aprove</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.first_name} {user.last_name}</TableCell>
            <TableCell>
              <Text>{user.username}</Text>
            </TableCell>
            <TableCell>
              <Text>{user.email}</Text>
            </TableCell>
            
            <TableCell className="text-center">
              <Link href={`/user?id=${user.id}`} className="text-blue-500 hover:text-blue-700">
                <span className="link"
                >View</span>
              </Link>
            </TableCell>

            <TableCell className="text-center space-x-4">
              <Button className="bg-blue-500 hover:bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => console.log("Aprove")}
              >Aprove</Button>

              <Button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                onClick={() => console.log("Reject")}
              >Reject</Button>
            </TableCell>
          
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
