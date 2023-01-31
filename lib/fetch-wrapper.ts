import axios from "axios";
import { getToken } from "./util";


function authHeader() {
  // return auth header with jwt if user is logged in and request is to the api url
  const token = getToken()
  if (!token)
    return {}
  return { Authorization: `Bearer ${token}` };
}

export async function get(url: string, params: any) {
  const res = await axios({
    url: url,
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }, //, ...authHeader() },
    // withCredentials: true,
    params: params
  })
  return res.data;
}

export async function post(url: string, data: any) {
  const res = await axios({
    url: url,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },// ...authHeader() },
    // withCredentials: true,
    data: JSON.stringify(data)
  });
  return res.data;
}