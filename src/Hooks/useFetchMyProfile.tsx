import axios from 'axios';
import { useEffect, useState } from 'react';
import { Profile } from '../Types/Profile';

const useFetchMyProfile = () => {
  const [data, setData] = useState<Profile>();
  const [error, setError] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const runFetch = async () => {
      try {
        const response = await axios.get(
          `${process.env.NODE_ENV === 'production' ? '/api' : ''}/authenticate/profile`,
          {
            signal: controller.signal,
          },
        );
        isMounted && setData(response.data.data);
        isMounted && setError('');
      } catch (error: any) {
        console.log(`Response status: ${error.response?.status}`);
        setError(error.response?.data.message);
      }
      setLoaded(true);
    };

    runFetch();
    return () => {
      isMounted = false;
      controller.abort;
    };
  }, []);

  return { data, error, loaded };
};

export default useFetchMyProfile;
