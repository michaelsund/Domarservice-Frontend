import { useEffect, useState } from 'react';
import { axiosPrivate } from '../Helpers/Axios';
import { CompanyEventDto } from '../Types/Dto/Requests/CompanyEventDto';

const useFetchMyEvents = () => {
  const [data, setData] = useState<CompanyEventDto[]>();
  const [error, setError] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const runFetch = async () => {
      try {
        const response = await axiosPrivate.get(
          `${process.env.NODE_ENV === 'production' ? '/api' : ''}/companyevent/my-events`,
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

  const reFetch = async () => {
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get(
        `${process.env.NODE_ENV === 'production' ? '/api' : ''}/companyevent/my-events`,
        {
          signal: controller.signal,
        },
      );
      setData(response.data.data);
      setError('');
    } catch (error: any) {
      console.log(`Response status: ${error.response?.status}`);
      setError(error.response?.data.message);
      setData([]);
    }
    setLoaded(true);
  };

  return { data, reFetch, error, loaded };
};

export default useFetchMyEvents;
