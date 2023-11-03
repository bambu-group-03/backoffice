import { url } from "inspector";
import { string, any } from "zod";

const REFRESH_INTERVAL = 1000 * 60 * 60 * 24; // 24 hours

export async function fetch_async(url:string){

  let data:any = null;
  try{
      const response = await fetch(url, {
        next: { revalidate: REFRESH_INTERVAL },
      });
      data = await response.json();
  }catch(error){
      throw new Error(`Failed to fetch users: ${error.status} ${error.statusText}`);
  }

  return data;
}

export async function put_async(url:string){

  let resp:any = null;
  
  try{
    const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
    //,body: JSON.stringify({ user_id })
    });
    resp = await response.json();
  }catch(error){
      throw new Error(`Failed to fetch users: ${error.status} ${error.statusText}`);
  }

  return resp;

} 