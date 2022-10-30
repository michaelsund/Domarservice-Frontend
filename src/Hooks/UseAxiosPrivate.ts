import { axiosPrivate } from '../Helpers/Axios';
import { useEffect } from 'react';
import useRefreshToken from './UseRefreshToken';
import { useNavigate } from 'react-router-dom';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const navigate = useNavigate();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config: any) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          navigate('/inte-behorig')
        } else if (error?.response?.status === 401 && !prevRequest?.sent) {
          // If the user doesnt have a token saved, we redirect to login route
          if (localStorage.getItem('token') === null) {
            navigate('/login');
          } else {
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

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
