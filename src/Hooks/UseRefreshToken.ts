import axios from '../Helpers/Axios';
import { useNavigate } from 'react-router-dom';

const useRefreshToken = () => {
  const navigate = useNavigate();

  const refresh = async () => {
    console.log('refreshing token');
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
  return refresh;
};

export default useRefreshToken;
