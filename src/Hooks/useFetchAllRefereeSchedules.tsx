import { useEffect, useState } from 'react';
import { axiosPrivate } from '../Helpers/Axios';

const useFetchAllRefereeSchedules = (payload: any) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  // Initial fetch of data on hook usage
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const runFetch = async () => {
      try {
        const response = await axiosPrivate.post(
          `${process.env.NODE_ENV === 'production' ? '/api' : ''}/refereeSchedule/filtered`,
          payload,
          {
            signal: controller.signal,
          },
        );
        isMounted && setData(response.data.data);
        isMounted && setError('');
      } catch (error: any) {
        console.log(`Response status: ${error.response?.status}`);
        console.log(error);
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
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.post(
        `${process.env.NODE_ENV === 'production' ? '/api' : ''}/refereeSchedule/filtered`,
        payload,
        {
          signal: controller.signal,
        },
      );
      setData(response.data.data);
      setError('');
    } catch (error: any) {
      console.log(`Response status: ${error.response?.status}`);
      console.log(error);
      setError(error.response?.data.message);
    }
    setLoaded(true);
  };

  return { data, error, loaded, refreshData };
};

export default useFetchAllRefereeSchedules;
