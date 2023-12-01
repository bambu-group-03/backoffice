import { AreaChart, BarChart, Card, Text, Title } from '@tremor/react';
import { useEffect, useState } from 'react';
import { fetch_async } from '../user/commun/fetch_async';
import { BASE_SNAP_STATS } from '../user/commun/urls';
import { set } from 'husky';


const cant_dias:string = "25";

export default function UsersPerMonth() {

  const [userData, setUserData] = useState([]); 


  const [newUsersAgust, setNewUsersAgust] = useState(1200);
  const [newUsersSept, setNewUsersSept] = useState(1500);
  const [newUsersOct, setNewUsersOct] = useState(3000);
  const [newUsersNov, setNewUsersNov] = useState(2580);


  let data = [{
    Month: '08-21',
    NewUsers: newUsersAgust,
  },
  {
    Month: '09-21',
    NewUsers: newUsersSept,
  },
  {
    Month: '10-22',
    NewUsers: newUsersOct,
  },
  {
    Month: '11-22',
    NewUsers: newUsersNov,
  }];

  

  const url = BASE_SNAP_STATS + "frequency/daily/number_of_points/" + cant_dias;

  useEffect(() => {
    const fetchUsers = async () => {
      let snap_stats = await fetch_async(url); 
      console.log(snap_stats);
    };
    fetchUsers();
  }, []);

  const tag = "NewUsers";
  const description = "New users since lauch";
  const color = "indigo";
  


  return (
  <Card>
    <Title>{description}</Title>
    <BarChart
      className="mt-4 h-80"
      data={data}
      categories={[tag]}
      index="Month"
      colors={[color]}
      valueFormatter={(number: number) =>
        ` ${Intl.NumberFormat('us').format(number).toString()}`
      }
      yAxisWidth={60}
    />
  </Card>
);}