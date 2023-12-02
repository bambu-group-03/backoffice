import { AreaChart, Card, Text, Title } from '@tremor/react';
import { DataPerMonth } from "./types";


export default function GrowthStats({snaps_per_month, users_per_month}:{snaps_per_month:DataPerMonth, users_per_month:DataPerMonth}) {

  const total_snaps_per_month = snaps_per_month.data;
  const total_users_per_month = users_per_month.data;

  let data = total_snaps_per_month.slice(0, total_snaps_per_month.length).map((_, index) => ({
    Month: total_snaps_per_month[index]?.month,
    Snaps: total_snaps_per_month[index]?.value,
    NewUsers: total_users_per_month[index]?.value,
  }));

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-5">
      <Card>
        <Title>Growth</Title>
            <Text>Comparison between Snaps and New Users</Text>
            <AreaChart
              className="mt-4 h-80"
              data={data}
              categories={['Snaps', 'NewUsers']}
              index="Month"
              colors={['indigo', 'fuchsia']}
              valueFormatter={(number: number) =>
                ` ${Intl.NumberFormat('us').format(number).toString()}`
              }
              yAxisWidth={60}
            />
      </Card>
    </div>
  );
}

