import { Grid, Card, Title, Flex, Metric, BarList, Text } from "@tremor/react";
import { MyStats, DataPerMonth } from "./types";
import PerMonth from "./bar-chart-per-month";

export default function SnapStats({data, snaps_per_month}:{data:MyStats[], snaps_per_month:DataPerMonth}) {
  
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
              <Text>Total views</Text>
            </Flex>
            <Flex className="mt-6">
              <Text>Pages</Text>
              <Text className="text-right">Views</Text>
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
        <PerMonth data_per_month={snaps_per_month}/>
      </div>
      
    </div>
);}