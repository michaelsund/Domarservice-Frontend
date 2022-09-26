import { useEffect, useState } from 'react';
import { axiosPrivate } from '../Helpers/Axios';
import { CompanyEventDto } from '../Types/Dto/Requests/CompanyEventDto';

interface IProps {
  id: number;
};

const useFetchCompanyEvent = (props: IProps) => {
  const [data, setData] = useState<CompanyEventDto>();
  const [error, setError] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);

  // Initial fetch of data on hook usage
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const runFetch = async () => {
      try {
        const response = await axiosPrivate.get(
          `${process.env.NODE_ENV === 'production' ? '/api' : ''}/companyevent/${props.id}`,
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

  // Callable to get data again.
  const refreshData = async () => {
    setLoaded(false);
    const controller = new AbortController();
    try {
      const response = await axiosPrivate.get(
        `${process.env.NODE_ENV === 'production' ? '/api' : ''}/companyevent/${props.id}`,
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

export default useFetchCompanyEvent;
