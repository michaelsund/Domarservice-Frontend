import axios from '../Helpers/Axios';
import useAuth from './UseAuth';

const useRefreshToken = () => {
  const { auth, setAuth }: any = useAuth();

  const refresh = async () => {
    const response = await axios.post('/authenticate/refresh-token', {
      accessToken: auth.token,
    });

    setAuth((prev: any) => {
      console.log(JSON.stringify(prev));
      console.log(response.data);
      return { ...prev, token: response.data.token };
    });

    return response.data.token;
  };
  return refresh;
};

export default useRefreshToken;
