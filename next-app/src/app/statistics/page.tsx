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


const BASE_USER_STATS_URL = "https://api-identity-socializer-luiscusihuaman.cloud.okteto.net/api/metrics";
const BASE_SNAP_STATS_URL = "https://api-content-discovery-luiscusihuaman.cloud.okteto.net/api/feed/snaps/stats";

// User URLs
const URL_USER_STATS =  BASE_USER_STATS_URL + "/get_user_rates" ;
const URL_LOCATILY_STATS = BASE_USER_STATS_URL + "/get_ubication_count" ;
const URL_LOGIN_STATS = BASE_USER_STATS_URL + "/get_log_in_rates";
const URL_SIGNUP_STATS = BASE_USER_STATS_URL + "/get_sign_up_rates";

// Snap URLs
const URL_SNAP_STATS = BASE_SNAP_STATS_URL + "/";

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

  // User Stats
  const [totalUsers, setTotalUsers] = useState(0);
  const [blockedUsers, setBlockedUsers] = useState(0);
  const [nonBlockedUsers, setNonBlockedUsers] = useState(0);
  const [blockedUsersRate, setBlockedUsersRate] = useState(0);
  const [nonBlockedUsersRate, setNonBlockedUsersRate] = useState(0);


  useEffect(() => {
    const fetchUserStats = async () => {
      let user_stats = await fetch_async(URL_USER_STATS);
      setTotalUsers(user_stats.total_users);
      setBlockedUsers(user_stats.blocked_users);
      setNonBlockedUsers(user_stats.non_blocked_users);
      setBlockedUsersRate(user_stats.blocked_users_rate);
      setNonBlockedUsersRate(user_stats.non_blocked_users_rate);
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

  // Location Stats
  const [locations, setLocations] = useState<any[]>([]); 

  const [location, setLocation] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const fetchLocationStats = async () => {
      let locations_stats = await fetch_async(URL_LOCATILY_STATS);
      console.log(locations_stats);
      console.log("Entre aca");
      setLocations(locations_stats);
    };
    fetchLocationStats();
  }, []);
  
  useEffect(() => {
    if (locations.length > 0) {
      const mappedLocations = locations.map((loc: any) => ({
        name: loc.name,
        value: loc.value
      }));
      setLocation(mappedLocations);
    }
  }, [locations]);

  // LogIn Stats
  const [totalLogIns, setTotalLogIns] = useState(0);
  const [totalLogInSuccssful, setTotalLogInSuccssful] = useState(0);
  const [totalLogInGoogle, setTotalLogInGoogle] = useState(0);
  const [totalLogInError, setTotalLogInError] = useState(0);
  const [logInSuccessfulRate, setLogInSuccessfulRate] = useState(0);
  const [logInErrorRate, setLogInErrorRate] = useState(0);
  const [resetPassword, setResetPassword] = useState(0);
 

  useEffect(() => {
    const fetchLogInStats = async () => {
      let logInStats = await fetch_async(URL_LOGIN_STATS);
      setTotalLogIns(logInStats.total_log_ins);
      setTotalLogInSuccssful(logInStats.log_in_successful);
      setTotalLogInGoogle(logInStats.log_in_google);
      setTotalLogInError(logInStats.log_in_error);
      setLogInSuccessfulRate(logInStats.log_in_successful_rate);
      setLogInErrorRate(logInStats.log_in_error_rate);
      setResetPassword(logInStats.reset_password);
    };
    fetchLogInStats();
  }, []);

  const logIn = [
    { name: "Total Log Ins", value: totalLogIns },
    { name: "Total LogIn Successful", value: totalLogInSuccssful },
    { name: "Total LogIn Google", value: totalLogInGoogle },
    { name: "Total LogIn Error", value: totalLogInError },
    { name: "Total LogIn Successful Rate", value: logInSuccessfulRate },
    { name: "Total LogIn Error Rate", value: logInErrorRate },
    { name: "Total Reset Password", value: resetPassword },
  ];

  // Sign Up Stats
  const [totalSignUps, setTotalSignUps] = useState(0);
  const [signUpSuccessful, setSignUpSuccessful] = useState(0);
  const [signUpGoogle, setSignUpGoogle] = useState(0);
  const [signUpError, setSignUpError] = useState(0);
  const [signUpSuccessfulRate, setSignUpSuccessfulRate] = useState(0);
  const [signUpErrorRate, setSignUpErrorRate] = useState(0);
  const [totalCompleteSignUp, setTotalCompleteSignUp] = useState(0);
  const [completeSignUpSuccessful, setCompleteSignUpSuccessful] = useState(0);
  const [completeSignUpError, setCompleteSignUpError] = useState(0);
  const [completeSignUpSuccessfulRate, setCompleteSignUpSuccessfulRate] = useState(0);
  const [completeSignUpErrorRate, setCompleteSignUpErrorRate] = useState(0);

  useEffect(() => {
    const fetchSignUpStats = async () => {
      let signUpStats = await fetch_async(URL_SIGNUP_STATS);
      setTotalSignUps(signUpStats.total_sign_ups);
      setSignUpSuccessful(signUpStats.sign_up_successful);
      setSignUpGoogle(signUpStats.sign_up_google);
      setSignUpError(signUpStats.sign_up_error);
      setSignUpSuccessfulRate(signUpStats.sign_up_successful_rate);
      setSignUpErrorRate(signUpStats.sign_up_error_rate);
      setTotalCompleteSignUp(signUpStats.total_complete_sign_up);
      setCompleteSignUpSuccessful(signUpStats.complete_sign_up_successful);
      setCompleteSignUpError(signUpStats.complete_sign_up_error);
      setCompleteSignUpSuccessfulRate(signUpStats.complete_sign_up_successful_rate);
      setCompleteSignUpErrorRate(signUpStats.complete_sign_up_error_rate);
    };
    fetchSignUpStats();
  }, []);

  const signUp = [
    { name: "Total Sign Ups", value: totalSignUps },
    { name: "Sign Up Successful", value: signUpSuccessful },
    { name: "Sign Up Google", value: signUpGoogle },
    { name: "Sign Up Error", value: signUpError },
    { name: "Sign Up Successful Rate", value: signUpSuccessfulRate },
    { name: "Sign Up Error Rate", value: signUpErrorRate },
    { name: "Total Complete Sign Up", value: totalCompleteSignUp },
    { name: "Complete Sign Up Successful", value: completeSignUpSuccessful },
    { name: "Complete Sign Up Error", value: completeSignUpError },
    { name: "Complete Sign Up Successful Rate", value: completeSignUpSuccessfulRate },
    { name: "Complete Sign Up Error Rate", value: completeSignUpErrorRate },
  ];


  const data : MyStats[] = [
    {
      category: "Users",
      stat: totalUsers.toString(),
      data: users,
    },
    {
      category: "Locations",
      stat: locations.length.toString(),
      data: location,
    },
    {
      category: "Log In Rates",
      stat: totalLogIns.toString(),
      data: logIn,
    },

    {
      category: "Sing Up Rates",
      stat: signUpSuccessful.toString(),
      data: signUp,
    }
    
  ];


  // Snap Stats
  const [totalSnaps, setTotalSnaps] = useState(0);
  const [blockedSnaps, setBlockedSnaps] = useState(0);
  const [nonBlockedSnaps, setNonBlockedSnaps] = useState(0);
  const [blockedSnapsRate, setBlockedSnapsRate] = useState(0);
  const [nonBlockedSnapsRate, setNonBlockedSnapsRate] = useState(0);


  useEffect(() => {
    const fetchSnapstats = async () => {
      let user_stats = await fetch_async(URL_SNAP_STATS);
      setTotalSnaps(user_stats.total_Snaps);
      setBlockedSnaps(user_stats.blocked_Snaps);
      setNonBlockedSnaps(user_stats.non_blocked_Snaps);
      setBlockedSnapsRate(user_stats.blocked_Snaps_rate);
      setNonBlockedSnapsRate(user_stats.non_blocked_Snaps_rate);
    };
    fetchSnapstats();
  }, []);

  const Snaps = [
    { name: "total Snaps", value: totalSnaps },
    { name: "blocked_user", value: blockedSnaps },
    { name: "non blocked Snaps", value: nonBlockedSnaps },
    { name: "blocked Snaps rate", value: blockedSnapsRate },
    { name: "non blocked Snaps rate", value: nonBlockedSnapsRate },
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