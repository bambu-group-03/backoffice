// import { Env } from '@env';
// import axios from 'axios';
// // Configurar encabezados por defecto para todas las solicitudes
// // Instancia para el microservicio de contenido
// const contentService = axios.create({ baseURL: `${Env.API_URL}/content` });

// // Instancia para el microservicio de identidad
// const identityService = axios.create({ baseURL: `${Env.API_URL}/identity` });

// contentService.defaults.headers.common.clientToken = 'ADMIN_TOKEN';
// contentService.defaults.headers.common['Content-Type'] = 'application/json';
// contentService.defaults.headers.common.Accept = 'application/json';

// identityService.defaults.headers.common.clientToken = 'ADMIN_TOKEN';
// identityService.defaults.headers.common['Content-Type'] = 'application/json';
// identityService.defaults.headers.common.Accept = 'application/json';

// export const client = {
//   content: contentService,
//   identity: identityService,
// };

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
    }).then((response) => {
      return response;
    }
    );
    resp = await response.json();
  }catch(error){
      throw new Error(`Failed to fetch users: ${error.status} ${error.statusText}`);
  }

  return resp;

} 

export async function post_async(url:string){

  let resp:any = null;
  
  try{
    const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
    }).then((response) => {
      return response;
      }
    );
    resp = await response.json();
  }catch(error){
      throw new Error(`Failed to fetch users: ${error.status} ${error.statusText}`);
  }

  return resp;

} 

export async function post_async_with_body(url:string, datos:{}){

  let resp:any = null;
  
  try{
    const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
    }).then((response) => {
      return response;
      }
    );
    resp = await response.json();
  }catch(error){
      throw new Error(`Failed to fetch users: ${error.status} ${error.statusText}`);
  }

  return resp;

} 