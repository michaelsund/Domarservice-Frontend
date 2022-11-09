import { useState } from 'react';
import { axiosPrivate } from '../Helpers/Axios';

const usePostRefereeScheduleCreate = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);

  const sendRefereeScheduleCreate = async (availableAt: string) => {
    const controller = new AbortController();

    try {
      const response = await axiosPrivate.post(
        `${process.env.NODE_ENV === 'production' ? '/api' : ''}/refereeschedule/create`,
        {
          availableAt
        },
        {
          signal: controller.signal,
        },
      );
      setSuccess(response.data.success);
      setError('');
    } catch (error: any) {
      console.log(`Response status: ${error.response?.status}`);
      setError(error.response?.data.message);
    }
    setLoaded(true);
  };

  return { sendRefereeScheduleCreate, success, error, loaded };
};

export default usePostRefereeScheduleCreate;
