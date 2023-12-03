'use client';

import { useAuthContext } from "@/context/AuthContext";
import { Card } from "@tremor/react";
import { useState, useEffect } from "react";
import { fetch_async } from "../user/commun/fetch_async";
import VerifyTable from "./verifyTable";
import { useRouter } from "next/navigation";

import { URL_CERTIFICATE_BASE } from "../user/commun/urls";

export default function VerifyPage() {
  const { user } = useAuthContext() as { user: any };
  const router = useRouter();
  let [users, setUsers] = useState([]);

  useEffect( () => {
    
    // Redirect to the logIn page if the user is not logged in
    if ( user == null ) {
      router.push( "/signin" );
    }
  }, [ user, router ] );

  let limit = 1000;
  let offset = 0;


  // Load data
  useEffect(() => {
    const fetchData = async () => {
      const url = URL_CERTIFICATE_BASE + "get_all_certified_requests?limit="+limit+"&offset="+offset;
      let data: [] = await fetch_async(url, "identity");
      setUsers(data);
    };
    fetchData();
  }, []);


  return (
    <main className="mx-auto max-w-7xl p-4 md:p-10">
       <Card className="mt-0">
         <VerifyTable users={users} />
       </Card>     
    </main>
  );
}