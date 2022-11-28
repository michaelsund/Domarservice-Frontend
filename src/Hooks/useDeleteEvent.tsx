import axios from 'axios';
import { useState } from 'react';

const useDeleteEvent = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);

  const sendDelete = async (eventId: number) => {
    const controller = new AbortController();

    try {
      const response = await axios.delete(
        `${process.env.NODE_ENV === 'production' ? '/api' : ''}/companyevent/${eventId}`,
        {
          signal: controller.signal,
        },
      );
      setSuccess(response.data.success);
      setError('');
    } catch (error: any) {
      console.log(`Response status: ${error.response?.status}`);
      setError(error.response?.data.message);
      setSuccess(false);
      setLoaded(true);
    }
    setLoaded(true);
  };

  return { sendDelete, success, error, loaded };
};

export default useDeleteEvent;
