import { Grid, Card, Title, Flex, Metric, BarList, Text } from "@tremor/react";
import { MyStats, DataPerMonth } from "./types";
import PerMonth from "./bar-chart-per-month";


export default function UserStats({data}:{data:MyStats[]}) {

  const total_users_per_month  = [{
    Month: '08-21',
    value: 2890,
  },
  {
    Month: '09-21',
    value: 5890,
  },
  {
    Month: '10-22',
    value: 6890,
  },
  {
    Month: '11-22',
    value: 5890,
  }];

  const users_per_month: DataPerMonth = {
    name: "Users",
    description: "Total users since lauch",
    color: "indigo",
    data: total_users_per_month,
  };

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-5">
      <Grid numItemsSm={2} numItemsLg={4} className="gap-6">
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
                Intl.NumberFormat("us").format(number).toString()
              }
              className="mt-2"
            />
          </Card>
        ))}
      </Grid>
      <div className="mx-auto max-w-7xl py-4">
        <PerMonth data_per_month={users_per_month}/>
      </div>
    </div>
    
);}