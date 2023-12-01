"use client";

import { Tab } from '@headlessui/react'
import Chart from "./growth-chart";

import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { profileWidth } from "../user/userProfile";
import UserStats from "./userStats";
import { MyStats } from "./types";
import SnapStats from './snapStats';


// Formato de fecha 2024-01-01T00:00:00

const website = [
  { name: "/home", value: 1230 },
  { name: "/contact", value: 751 },
  { name: "/gallery", value: 471 },
  { name: "/august-discount-offer", value: 280 },
  { name: "/case-studies", value: 78 },
];

const shop = [
  { name: "/home", value: 453 },
  { name: "/imprint", value: 351 },
  { name: "/shop", value: 271 },
  { name: "/pricing", value: 191 },
];

const app = [
  { name: "/shop", value: 789 },
  { name: "/product-features", value: 676 },
  { name: "/about", value: 564 },
  { name: "/login", value: 234 },
  { name: "/downloads", value: 191 },
];



const data : MyStats[] = [
  {
    category: "Website",
    stat: "10,234",
    data: website,
  },
  {
    category: "Online Shop",
    stat: "12,543",
    data: shop,
  },
  {
    category: "Mobile App",
    stat: "2,543",
    data: app,
  },
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
                      User Stats
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
                      Snaps Stats
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
            <Chart />
          </Tab.Panel>
      </Tab.Panels>

    </div>    
  </Tab.Group>
</main>    
  );
  
}