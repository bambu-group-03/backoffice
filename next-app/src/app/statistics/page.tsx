"use client";

import { Tab } from '@headlessui/react'
import GrowthStats from "./growth-chart";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { profileWidth } from "../user/userProfile";
import UserStats from "./userStats";
import { DataPerMonth, MyStats } from "./types";
import SnapStats from './snapStats';
import { fetch_async } from '../user/commun/fetch_async';

import { URL_USER_STATS, URL_LOCATILY_STATS, URL_LOGIN_STATS, URL_SIGNUP_STATS, URL_SNAP_STATS, URL_SNAPS_PER_MONTH, URL_USERS_PER_MONTH, URL_RESET_PASSWORD_STATS } from '../user/commun/urls';


export default function StatisticsPage() {

  const router = useRouter();

  // Admin must be logged in to create a new user 
  const { user } = useAuthContext() as { user: any };

  // Redirect to the logIn page if the user is not logged in
  useEffect( () => {
    if ( user == null ) {
      router.push( "/signin" );
    }
  }, [ user, router ] );

  //////////// User Stats /////////////////
  const [totalUsers, setTotalUsers] = useState(0);
  const [blockedUsers, setBlockedUsers] = useState(0);
  const [nonBlockedUsers, setNonBlockedUsers] = useState(0);
  const [blockedUsersRate, setBlockedUsersRate] = useState(0);
  const [nonBlockedUsersRate, setNonBlockedUsersRate] = useState(0);

  useEffect(() => {
    const fetchUserStats = async () => {
      let user_stats = await fetch_async(URL_USER_STATS, "identity");
      setTotalUsers(user_stats.total_users);
      setBlockedUsers(user_stats.blocked_users);
      setNonBlockedUsers(user_stats.non_blocked_users);
      setBlockedUsersRate(user_stats.blocked_users_rate);
      setNonBlockedUsersRate(user_stats.non_blocked_users_rate);
    };
    fetchUserStats();
  }, []);

  const users = [
    { name: "Total Users", value: totalUsers },
    { name: "Blocked User", value: blockedUsers },
    { name: "Non Blocked Users", value: nonBlockedUsers },
    { name: "Blocked Users Rate", value: blockedUsersRate },
    { name: "Non Blocked Users Rate", value: nonBlockedUsersRate },
  ];

  // Location Stats
  const [locations, setLocations] = useState<any[]>([]); 

  const [location, setLocation] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const fetchLocationStats = async () => {
      let locations_stats = await fetch_async(URL_LOCATILY_STATS, "identity");
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

  useEffect(() => {
    const fetchLogInStats = async () => {
      let logInStats = await fetch_async(URL_LOGIN_STATS, "identity");
      setTotalLogIns(logInStats.total_log_ins);
      setTotalLogInSuccssful(logInStats.log_in_successful);
      setTotalLogInGoogle(logInStats.log_in_google);
      setTotalLogInError(logInStats.log_in_error);
      setLogInSuccessfulRate(logInStats.log_in_successful_rate);
      setLogInErrorRate(logInStats.log_in_error_rate);
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
      let signUpStats = await fetch_async(URL_SIGNUP_STATS, "identity");
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

  // Reset Password Stats


  const [totalResetPassword, setTotalResetPassword] = useState(0);
  const [resetPasswordSuccessful, setResetPasswordSuccessful] = useState(0);
  const [resetPasswordError, setResetPasswordError] = useState(0);
  const [resetPasswordSuccessfulRate, setResetPasswordSuccessfulRate] = useState(0);
  const [resetPasswordErrorRate, setResetPasswordErrorRate] = useState(0);

  useEffect(() => {
    const fetchResetPasswordStats = async () => {
      let resetPasswordStats = await fetch_async(URL_RESET_PASSWORD_STATS, "identity");
      setTotalResetPassword(resetPasswordStats.total_reset_password);
      setResetPasswordSuccessful(resetPasswordStats.reset_password_successful);
      setResetPasswordError(resetPasswordStats.reset_password_error);
      setResetPasswordSuccessfulRate(resetPasswordStats.reset_password_successful_rate);
      setResetPasswordErrorRate(resetPasswordStats.reset_password_error_rate);
    };
    fetchResetPasswordStats();
  }, []);

  const resetPassword = [
    { name: "Total Reset Password", value: totalResetPassword },
    { name: "Reset Password Successful", value: resetPasswordSuccessful },
    { name: "Reset Password Error", value: resetPasswordError },
    { name: "Reset Password Successful Rate", value: resetPasswordSuccessfulRate },
    { name: "Reset Password Error Rate", value: resetPasswordErrorRate },
  ];



  const userData : MyStats[] = [
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
    },

    {
      category: "Reset Password Rates",
      stat: totalResetPassword.toString(),
      data: resetPassword,
    }
    
  ];


  ///////////////// Snap Stats /////////////////
  const [totalSnaps, setTotalSnaps] = useState(0);
  const [privateSnaps, setPrivateSnaps] = useState(0);
  const [publicSnaps, setPublicSnaps] = useState(0);

  useEffect(() => {
    const fetchSnapstats = async () => {
      let user_stats = await fetch_async(URL_SNAP_STATS, "content");
      setTotalSnaps(user_stats.total_snaps);
      setPrivateSnaps(user_stats.private_snaps);
      setPublicSnaps(user_stats.public_snaps);
    };
    fetchSnapstats();
  }, []);

  const snaps = [
    { name: "Total Snaps", value: totalSnaps },
    { name: "Private Snaps", value: privateSnaps },
    { name: "Public Snaps", value: publicSnaps },
  ];


  const snapData: MyStats[] = [
  {
    category: "Snaps",
    stat: totalSnaps?.toString(),
    data: snaps,
  },
  ];

  //////// Stats per Month /////////

  const [newSnaps, setNewSnaps] = useState<any[]>([]); 
  const [totalSnapsPerMonth, setTotalSnapsPerMonth] = useState<{ month: string; value: number }[]>([]);

  useEffect(() => {
    const fetchNewUsersStats = async () => {
      let new_snaps_per_month_stats = await fetch_async(URL_SNAPS_PER_MONTH, "content");
      setNewSnaps(new_snaps_per_month_stats);
    };
    fetchNewUsersStats();
  }, []);
  
  useEffect(() => {
    if (newSnaps.length > 0) {
      const mappedNewUsers = newSnaps.map((newSnap) => ({
        month: newSnap.month,
        value: newSnap.value
      }));
      setTotalSnapsPerMonth(mappedNewUsers);
    }
  }, [newSnaps]);

  const snaps_per_month: DataPerMonth = {
    name: "Snaps",
    description: "Total snaps since lauch",
    color: "cyan",
    data: totalSnapsPerMonth,
  };

  const [newUsers, setNewUsers] = useState<any[]>([]); 
  const [totalUsersPerMonth, setTotalUsersPerMonth] = useState<{ month: string; value: number }[]>([]);

  useEffect(() => {
    const fetchNewUsersStats = async () => {
      let new_users_per_month_stats = await fetch_async(URL_USERS_PER_MONTH, "identity");
      setNewUsers(new_users_per_month_stats);
    };
    fetchNewUsersStats();
  }, []);
  
  useEffect(() => {
    if (newUsers.length > 0) {
      const mappedNewUsers = newUsers.map((newUser: any) => ({
        month: newUser.month,
        value: newUser.value
      }));
      setTotalUsersPerMonth(mappedNewUsers);
    }
  }, [newUsers]);


  const users_per_month: DataPerMonth = {
    name: "Users",
    description: "Total users since lauch",
    color: "indigo",
    data: totalUsersPerMonth,
  };

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
            <UserStats data={userData} users_per_month={users_per_month}/> 
            </Tab.Panel>
        
          <Tab.Panel>
            <SnapStats data={snapData} snaps_per_month={snaps_per_month} />
          </Tab.Panel>

          <Tab.Panel>
            <GrowthStats snaps_per_month={snaps_per_month} users_per_month={users_per_month}/>
          </Tab.Panel>
      </Tab.Panels>
    </div>    
  </Tab.Group>
</main>    
  );
  
}