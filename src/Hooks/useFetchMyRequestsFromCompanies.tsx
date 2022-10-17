import { useEffect, useState } from 'react';
import { axiosPrivate } from '../Helpers/Axios';
import { RefereeScheduleDto } from '../Types/Dto/Requests/RefereeScheduleDto';

const useFetchMyRequestsFromCompanies = () => {
  const [data, setData] = useState<RefereeScheduleDto[]>();
  const [error, setError] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const runFetch = async () => {
      try {
        const response = await axiosPrivate.get(
          `${process.env.NODE_ENV === 'production' ? '/api' : ''}/refereeschedule/from-companies`,
          {
            signal: controller.signal,
          },
        );
        isMounted && setData(response.data.data);
        console.log(response.data.data);
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

export default useFetchMyRequestsFromCompanies;
