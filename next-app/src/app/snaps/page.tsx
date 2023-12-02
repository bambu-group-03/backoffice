'use client';

import { useState, useEffect } from "react";
import { fetch_async } from "../user/commun/fetch_async";
import { BASE_TEST_URL, BASE_TWEET_URL } from "../user/commun/urls";
import SnapTable from "../user/userSnaps";
import { Card } from "@tremor/react";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Search from "../search-snaps";

export default async function SnapsPage(){

  const { user } = useAuthContext() as { user: any };
  const router = useRouter();

  let [snaps, setSnaps] = useState([]);

  useEffect( () => {
    
    // Redirect to the logIn page if the user is not logged in
    if ( user == null ) {
      router.push( "/signin" );
    }
  }, [ user, router ] );

  const limit = 1000;
  const offset = 0;


  // Load data
  useEffect(() => {
    const fetchData = async () => {
      const url = BASE_TWEET_URL + "get_all_snaps?limit=" + limit + "&offset=" + offset;
      let snaps: [] = await fetch_async(url);
      setSnaps(snaps);
    };
    fetchData();
  }, []);
  
    return (
      <main className="mx-auto max-w-7xl p-4 md:p-10">
         <Search set={setSnaps}/>
        <Card className="mt-6">
          <SnapTable snaps={snaps} />
        </Card>  
      </main>

    )

}