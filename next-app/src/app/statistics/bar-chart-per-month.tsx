import { BarChart, Card, Text, Title } from '@tremor/react';

import type { DataPerMonth } from './types';

export default function PerMonth({
  data_per_month,
}: {
  data_per_month: DataPerMonth;
}) {
  const tag = 'value';
  const color: string = data_per_month.color.toString();

  return (
    <Card>
      <Title>{data_per_month.name}</Title>
      <Text>{data_per_month.description}</Text>
      <BarChart
        className="mt-4 h-80"
        data={data_per_month.data}
        categories={[tag]}
        index="month"
        colors={[color]}
        valueFormatter={(number: number) =>
          ` ${Intl.NumberFormat('us').format(number).toString()}`
        }
        yAxisWidth={60}
      />
    </Card>
  );
}
