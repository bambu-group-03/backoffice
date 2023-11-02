import { redirect } from 'next/navigation';

export default async function IndexPage(){
  redirect('/users');
}


// IndexPage({
//   searchParams,
// }: {
//   searchParams: { q: string };
// }) {
//   const search = searchParams.q ?? '';
//   console.log('search', search);
//   // const users = await queryBuilder
//   //   .selectFrom('users')
//   //   .select(['id', 'name', 'username', 'email'])
//   //   .where('name', 'like', `%${search}%`)
//   //   .execute();

//   const users: User[] = await getData();

//   return (
//     <main className="mx-auto max-w-7xl p-4 md:p-10">
//       <Title>Users</Title>
//       <Text>A list of users retrieved from a MySQL database.</Text>
//       <Search />
//       <Card className="mt-6">
//         <UsersTable users={users} />
//       </Card>
//     </main>
//   );
//}
