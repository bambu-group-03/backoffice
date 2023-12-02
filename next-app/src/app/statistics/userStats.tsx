"use client";

import { Grid, Card, Title, Flex, Metric, BarList, Text } from "@tremor/react";
import { MyStats, DataPerMonth } from "./types";
import PerMonth from "./bar-chart-per-month";
import { useState, useEffect } from "react";
import { fetch_async } from "../user/commun/fetch_async";
import { URL_LOCATILY_STATS } from "../user/commun/urls";


export default function UserStats({data}:{data:MyStats[]}) {


  // const [newUsers, setNewUsers] = useState<any[]>([]); 

  // const [totalUsersPerMonth, setTotalUsersPerMonth] = useState<{ month: string; value: number }[]>([]);

  // useEffect(() => {
  //   const fetchNewUsersStats = async () => {
  //     let new_users_per_month_stats = await fetch_async(URL_LOCATILY_STATS);
  //     setNewUsers(new_users_per_month_stats);
  //   };
  //   fetchNewUsersStats();
  // }, []);
  
  // useEffect(() => {
  //   if (newUsers.length > 0) {
  //     const mappedNewUsers = newUsers.map((newUser: any) => ({
  //       month: newUser.month,
  //       value: newUser.value
  //     }));
  //     setTotalUsersPerMonth(mappedNewUsers);
  //   }
  // }, [newUsers]);


  const total_users_per_month  = [{
    month: '08-21',
    value: 2890,
  },
  {
    month: '09-21',
    value: 5890,
  },
  {
    month: '10-22',
    value: 6890,
  },
  {
    month: '11-22',
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