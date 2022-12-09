import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetchAllMyRequestsOnRefereeSchedule = () => {
  const [companyRequestsOnSchedules, setCompanyRequestsOnSchedules] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  // Initial fetch of data on hook usage
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const runFetch = async () => {
      try {
        const response = await axios.get(
          `${process.env.NODE_ENV === 'production' ? '/api' : ''}/bookingrequest/schedule-requests`,
          {
            signal: controller.signal,
          },
        );
        isMounted && setCompanyRequestsOnSchedules(response.data.data);
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

  return { companyRequestsOnSchedules, error, loaded };
};

export default useFetchAllMyRequestsOnRefereeSchedule;
