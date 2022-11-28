import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetchAllCompanyEvents = (payload: any) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  // Initial fetch of data on hook usage
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const runFetch = async () => {
      try {
        const response = await axios.post(
          `${process.env.NODE_ENV === 'production' ? '/api' : ''}/companyevent/filtered`,
          payload,
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
  }, [payload.page]);

  // Callable refresh when filtering changes
  const refreshData = async () => {
    setLoaded(false);
    const controller = new AbortController();
    try {
      const response = await axios.post(
        `${process.env.NODE_ENV === 'production' ? '/api' : ''}/companyevent/filtered`,
        payload,
        {
          signal: controller.signal,
        },
      );
      setData(response.data.data);
      setError('');
     
    } catch (error: any) {
      console.log(`Response status: ${error.response?.status}`);
      setError(error.response?.data.message);
    }
    setLoaded(true);
  };

  return { data, error, loaded, refreshData };
};

export default useFetchAllCompanyEvents;
