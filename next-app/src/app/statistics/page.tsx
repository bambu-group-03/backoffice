"use client";

import { Tab } from '@headlessui/react'
import GrowthStats from "./growth-chart";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { profileWidth } from "../user/userProfile";
import UserStats from "./userStats";
import { MyStats } from "./types";
import SnapStats from './snapStats';
import { fetch_async } from '../user/commun/fetch_async';

const url_user_stats = "https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/metrics/get_user_rates" ;
const url_locality_stats = "https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/metrics/get_ubication_count" ;

// Formato de fecha 2024-01-01T00:00:00

// const users = [
//   { name: "total users", value: 1230 },
//   { name: "blocked_user", value: 751 },
//   { name: "non blocked users", value: 471 },
//   { name: "blocked users rate", value: 280 },
// ];

// const shop = [
//   { name: "/home", value: 453 },
//   { name: "/imprint", value: 351 },
//   { name: "/shop", value: 271 },
//   { name: "/pricing", value: 191 },
// ];

const app = [
  { name: "/shop", value: 789 },
  { name: "/product-features", value: 676 },
  { name: "/about", value: 564 },
  { name: "/login", value: 234 },
  { name: "/downloads", value: 191 },
];


export default function StatisticsPage() {

  const router = useRouter();

  // Admin must be logged in to create a new user 
  const { user } = useAuthContext() as { user: any };

  useEffect( () => {
    // Redirect to the logIn page if the user is not logged in
    if ( user == null ) {
      router.push( "/signin" );
    }
  }, [ user, router ] );

  const [totalUsers, setTotalUsers] = useState(0);
  const [blockedUsers, setBlockedUsers] = useState(0);
  const [nonBlockedUsers, setNonBlockedUsers] = useState(0);
  const [blockedUsersRate, setBlockedUsersRate] = useState(0);
  const [nonBlockedUsersRate, setNonBlockedUsersRate] = useState(0);


  useEffect(() => {
    const fetchUserStats = async () => {
      let user_stats = await fetch_async(url_user_stats);
      setTotalUsers(user_stats.total_users);
      setBlockedUsers(user_stats.blocked_users);
      setNonBlockedUsers(user_stats.non_blocked_users);
      setBlockedUsersRate(user_stats.blocked_users_rate);
      setNonBlockedUsersRate(user_stats.non_blocked_users_rate);
      console.log(user_stats);
    };
    fetchUserStats();
  }, []);

  const users = [
    { name: "total users", value: totalUsers },
    { name: "blocked_user", value: blockedUsers },
    { name: "non blocked users", value: nonBlockedUsers },
    { name: "blocked users rate", value: blockedUsersRate },
    { name: "non blocked users rate", value: nonBlockedUsersRate },
  ];

  const [locations, setLocations] = useState<any[]>([]); 

  const [location, setLocation] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const fetchLocationStats = async () => {
      let locations_stats = await fetch_async(url_locality_stats);
      console.log(locations_stats);
      console.log("Entre aca");
      setLocations(locations_stats);
    };
    fetchLocationStats();
  }, []);
  
  useEffect(() => {
    if (locations.length > 0) {
      const mappedLocations = locations.map((loc: any) => ({
        name: loc,
        value: loc.value
      }));
      setLocation(mappedLocations);
    }
  }, [locations]);


  const data : MyStats[] = [
    {
      category: "Users",
      stat: "10,234",
      data: users,
    },
    {
      category: "Location",
      stat: "2",
      data: location,
    },
    {
      category: "Mobile App",
      stat: "2,543",
      data: app,
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
<main className="mx-auto max-w-7xl p-2  ">
  <Tab.Group defaultIndex={0} selectedIndex={selectedIndex} 
        onChange={setSelectedIndex}
      >
      <div className="mt-6 sm:mt-2 2xl:mt-5">
        <div className="border-b border-gray-800">
          <div className={`${profileWidth} mt-10`}>
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          
              <Tab.List>

                <Tab  key={"user_stats_tab"} >
                  {({ selected }) => (
                    <div
                      className={
                        selected ?  `text-black-500 bg-slate-300 whitespace-nowrap py-3 px-5 border-b-2 font-medium text-sm font-mono`
                        : `whitespace-nowrap py-3 px-5 border-b-2 font-medium text-sm font-mono `
                      }
                      data-headlessui-state="selected"
                      >
                      Users
                    </div>
                  )}
                </Tab>

                <Tab  key={"snap_stats_tab"} >
                  {({ selected }) => (
                    <div
                      className={
                        selected ?  `text-black-500 bg-slate-300 whitespace-nowrap py-3 px-5 border-b-2 font-medium text-sm font-mono`
                        : `whitespace-nowrap py-3 px-5 border-b-2 font-medium text-sm font-mono`
                      }
                      data-headlessui-state="selected"
                      >
                      Snaps
                    </div>
                  )}
                </Tab>

                <Tab  key={"growth_stats_tab"} >
                  {({ selected }) => (
                    <div
                      className={
                        selected ?  `text-black-500 bg-slate-300 whitespace-nowrap py-3 px-5 border-b-2 font-medium text-sm font-mono`
                        : `whitespace-nowrap py-3 px-5 border-b-2 font-medium text-sm font-mono`
                      }
                      data-headlessui-state="selected"
                      >
                      Growth
                    </div>
                  )}
                </Tab>
              
              </Tab.List>
            </nav>
          </div>
        </div>

      <Tab.Panels>
            <Tab.Panel>
            <UserStats data={data}/> 
            </Tab.Panel>
        
          <Tab.Panel>
            <SnapStats data={data} />
          </Tab.Panel>

          <Tab.Panel>
            <GrowthStats />
          </Tab.Panel>
      </Tab.Panels>
    </div>    
  </Tab.Group>
</main>    
  );
  
}