// import axios from "axios";
// import { userInfo } from "./useLogin";


// function authHeader() {
//   // return auth header with jwt if user is logged in and request is to the api url
//   const user = userInfo;
//   const isLoggedIn = user && user.token && user.isLoggedIn;
//   if (isLoggedIn) {
//     return { Authorization: `Bearer ${user.token}` };
//   } else {
//     return {}
//   }
// }

// export function get(url: string) {
//   return axios({
//     url: url,
//     method: 'GET',
//     headers: authHeader()
//   })
//   .then(res => res.data)
// }

// export async function post(url, data) {
//   // console.log('authHeader: ' + authHeader())
//   console.log('from post function')
//   const res = await axios({
//     url: url,
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json', ...authHeader() },
//     withCredentials: true,
//     data: JSON.stringify(data)
//   });
//   return res.data;
// }