import axios from '../Helpers/Axios';

const useRefreshToken = () => {

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
