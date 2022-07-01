import axios from 'axios';

export default axios.create({
  baseURL: 'https://localhost:5001',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});
