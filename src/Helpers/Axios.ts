import axios from 'axios';

export default axios.create({
  // proxy: {
  //   host: 'https://localhost:5001',
  //   port: 5001,
  // },
  // baseURL: 'https://localhost:5001',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const axiosPrivate = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});
