import axios from 'axios';
import { useEffect, useState } from 'react';
import { ExtendedCompanyEventDto } from '../Types/Dto/Requests/ExtendedCompanyEventDto';

const useFetchMyRefereeEventRequests = () => {
  const [data, setData] = useState<ExtendedCompanyEventDto[]>();
  const [error, setError] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const runFetch = async () => {
      try {
        const response = await axios.get(
          `${process.env.NODE_ENV === 'production' ? '/api' : ''}/companyevent/for-referee`,
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

export default useFetchMyRefereeEventRequests;
