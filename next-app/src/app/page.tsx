import { Card, Text, Title } from '@tremor/react';

import Search from './search';
import type { User } from './table';
import UsersTable from './table';

export const dynamic = 'force-dynamic';
const dummyUsers: User[] = [
  {
    id: 1,
    name: 'Edu',
    username: 'edu',
    email: 'edu@gmail.com',
  },
  {
    id: 2,
    name: 'Dani',
    username: 'noxethiems',
    email: 'dani@gmail.com',
  },
  {
    id: 3,
    name: 'M. Pont',
    username: 'Maferep',
    email: 'mafer@gmail.com',
  },
  {
    id: 4,
    name: 'Luis Paredes',
    username: 'LuisParedes1',
    email: 'luis@gmail.com',
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
