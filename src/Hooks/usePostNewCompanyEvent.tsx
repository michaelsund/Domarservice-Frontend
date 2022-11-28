import axios from 'axios';
import { useState } from 'react';
import { ISendNewEvent } from '../Types/ISendNewEvent';

const usePostNewCompanyEvent = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const sendNewEvent = async (payload: ISendNewEvent) => {
    const controller = new AbortController();
    console.log(payload);
    payload.date = new Date(payload.date).toJSON()
    try {
      const response = await axios.post(
        `${process.env.NODE_ENV === 'production' ? '/api' : ''}/companyevent/create`,
        payload,
        {
          signal: controller.signal,
        },
      );
      setSuccess(response.data.success);
      setLoading(false);
      setError('');
    } catch (error: any) {
      console.log(`Response status: ${error.response?.status}`);
      setError(error.response?.data.message);
      setLoading(false);
    }
    setLoading(true);
  };

  return { sendNewEvent, success, error, loading };
};

export default usePostNewCompanyEvent;
