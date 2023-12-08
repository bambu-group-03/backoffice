import { BarList, Card, Flex, Grid, Metric, Text, Title } from '@tremor/react';

import PerMonth from './bar-chart-per-month';
import type { DataPerMonth, MyStats } from './types';

export default function UserStats({
  data,
  users_per_month,
}: {
  data: MyStats[];
  users_per_month: DataPerMonth;
}) {
  return (
    <div className="mx-auto max-w-7xl p-4 md:p-5">
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6">
        {data.map((item) => (
          <Card key={item.category}>
            <Title>{item.category}</Title>
            <Flex
              justifyContent="start"
              alignItems="baseline"
              className="space-x-2"
            >
              <Metric>{item.stat}</Metric>
              <Text>Total</Text>
            </Flex>
            <Flex className="mt-6">
              <Text>Stat</Text>
              <Text className="text-right">Total</Text>
            </Flex>
            <BarList
              data={item.data}
              valueFormatter={(number: number) =>
                Intl.NumberFormat('us').format(number).toString()
              }
              className="mt-2"
            />
          </Card>
        ))}
      </Grid>

      <div className="mx-auto max-w-7xl py-4">
        <PerMonth data_per_month={users_per_month} />
      </div>
    </div>
  );
}
