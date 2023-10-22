import { Card, Text, Title } from '@tremor/react';

import Search from './search';
import type { User } from './table';
import UsersTable from './table';

const REFRESH_INTERVAL = 1000 * 60 * 60 * 24; // 24 hours

export const dynamic = 'force-dynamic';

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    next: { revalidate: REFRESH_INTERVAL },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

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

  const users: User[] = await getData();

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
