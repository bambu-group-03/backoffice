import { Text, Title } from '@tremor/react';

import Search from './search';

export default async function Loading() {
  return (
    <main className="mx-auto max-w-7xl p-4 md:p-10">
      <Title>Users</Title>
      <Text>
        A list of users retrieved from a MySQL database (PlanetScale).
      </Text>
      <Search disabled />
      <div className="tremor-base tr-relative tr-w-full tr-mx-auto tr-ring-1 tr-mt-6 tr-max-w-none tr-bg-white tr-shadow tr-border-blue-400 tr-ring-gray-200 tr-pl-6 tr-pr-6 tr-pt-6 tr-pb-6 tr-rounded-lg h-[360px]" />
    </main>
  );
}
