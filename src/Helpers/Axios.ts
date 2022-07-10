import axios from 'axios';

export default axios.create({
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
