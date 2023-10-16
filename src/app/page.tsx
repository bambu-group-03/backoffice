import { Card, Text, Title } from '@tremor/react';

import Search from './search';
import type { User } from './table';
import UsersTable from './table';

export const dynamic = 'force-dynamic';
const dummyUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@example.com',
  },
  {
    id: 2,
    name: 'Alice Smith',
    username: 'alicesmith',
    email: 'alicesmith@example.com',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    username: 'bobjohnson',
    email: 'bobjohnson@example.com',
  },
  // Add more dummy users as needed
];
export default async function IndexPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  console.log('search', search);
  // const users = await queryBuilder
  //   .selectFrom('users')
  //   .select(['id', 'name', 'username', 'email'])
  //   .where('name', 'like', `%${search}%`)
  //   .execute();
  const users = dummyUsers;

  return (
    <main className="mx-auto max-w-7xl p-4 md:p-10">
      <Title>Users</Title>
      <Text>A list of users retrieved from a MySQL database.</Text>
      <Search />
      <Card className="mt-6">
        <UsersTable users={users} />
      </Card>
    </main>
  );
}
