
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Text,
} from '@tremor/react';
import { profileWidth } from '../user/userProfile';

export interface Admin {
  id: string;
  email: string;
  created_at: string;
}

export default function AdminTable({ admins }: { admins: Admin[] }) {

  
return (
  <Table>
    <TableHead>
      <TableRow>
        <TableHeaderCell>Email</TableHeaderCell>
        <TableHeaderCell>Created at</TableHeaderCell>
      </TableRow>
    </TableHead>
    <TableBody>

    {admins.length === 0 ? 
            <div className={`${profileWidth} mt-10`}>
              {"No Admins"}
            </div>
          :
      admins.map((admin:Admin) => { 

        const admin_date = new Date(admin.created_at as string);
        const admin_date_string = admin_date.toLocaleDateString('en-GB') ;
       
        return(
          <TableRow key={admin.id}>
            <TableCell>
              <Text>{admin.email}</Text>
            </TableCell>
            <TableCell>
              <Text>{admin_date_string}</Text>
            </TableCell>
          </TableRow>
        )
      }
    )
    }
    </TableBody>
  </Table>
);
}