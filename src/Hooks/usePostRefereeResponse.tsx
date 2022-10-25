import { useState } from 'react';
import { axiosPrivate } from '../Helpers/Axios';

interface ISendAwnser {
  requestId: number;
  accepted: boolean;
}

const usePostRefereeResponse = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);

  const sendAwnser = async (data: ISendAwnser) => {
    const controller = new AbortController();

    try {
      const response = await axiosPrivate.post(
        `${process.env.NODE_ENV === 'production' ? '/api' : ''}/bookingrequest/referee-awnser`,
        {
          requestId: data.requestId,
          accepted: data.accepted,
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

  return { sendAwnser, success, error, loaded };
};

export default usePostRefereeResponse;
