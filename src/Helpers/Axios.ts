import axios from 'axios';

export const axiosPrivate = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

const refresh = async () => {
  const response = await axios.post(
    '/authenticate/refresh-token',
    {
      accessToken: localStorage.getItem('token'),
    },
    { withCredentials: true },
  );

  localStorage.setItem('token', response.data.data.token);

  return response.data.data.token;
};

axiosPrivate.interceptors.request.use(
  (config: any) => {
    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      // If the user doesnt have a token saved, we redirect to login route
      if (localStorage.getItem('token') === null) {
        console.log('error! no token set in localstorage!');
      } else {
        console.log('token expired, refreshi token!');
        // Otherwise attach get a new token and attach it
        prevRequest.sent = true;
        const newAccessToken = await refresh();
        prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosPrivate(prevRequest);
      }
    }
    return Promise.reject(error);
  },
);

// axiosPrivate.interceptors.request.eject(requestIntercept);
// axiosPrivate.interceptors.response.eject(responseIntercept);

export default axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
});

