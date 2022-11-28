import axios from 'axios';
import { useState } from 'react';

const usePostRefereeScheduleDelete = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);

  const sendRefereeScheduleDelete = async (scheduleId: number) => {
    const controller = new AbortController();

    try {
      const response = await axios.delete(
        `${process.env.NODE_ENV === 'production' ? '/api' : ''}/refereeschedule/${scheduleId}`,
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

  return { sendRefereeScheduleDelete, success, error, loaded };
};

export default usePostRefereeScheduleDelete;
