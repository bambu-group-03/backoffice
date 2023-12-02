import { AreaChart, Card, Text, Title } from '@tremor/react';
import { useEffect, useState } from 'react';
import { fetch_async } from '../user/commun/fetch_async';
import { BASE_SNAP_STATS_URL } from '../user/commun/urls';

const cant_dias:string = "25";

export default function GrowthStats() {

  const [userData, setUserData] = useState([]); 
  const [snapData, setSnapData] = useState([]);

  const [snapsAgust, setSnapsAgust] = useState(2890);
  const [snapsSept, setSnapsSept] = useState(5890);
  const [snapsOct, setSnapsOct] = useState(6890);
  const [snapsNov, setSnapsNov] = useState(5890);

  const [newUsersAgust, setNewUsersAgust] = useState(1200);
  const [newUsersSept, setNewUsersSept] = useState(1500);
  const [newUsersOct, setNewUsersOct] = useState(3000);
  const [newUsersNov, setNewUsersNov] = useState(2580);
  
let data = [{
  Month: '08-21',
  Snaps: snapsAgust,
  NewUsers: newUsersAgust,
},
{
  Month: '09-21',
  Snaps: snapsSept,
  NewUsers: newUsersSept,
},
{
  Month: '10-22',
  Snaps: snapsOct,
  NewUsers: newUsersOct,
},
{
  Month: '11-22',
  Snaps: snapsNov,
  NewUsers: newUsersNov,
}];



const url = BASE_SNAP_STATS_URL + "frequency/daily/number_of_points/" + cant_dias;

useEffect(() => {
  const fetchUsers = async () => {
    let snap_stats = await fetch_async(url); 
    setSnapData(snap_stats);
    console.log(snap_stats);
  };
  fetchUsers();
}, []);



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

