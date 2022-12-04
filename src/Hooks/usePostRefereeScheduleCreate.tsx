import axios from 'axios';
import { useState } from 'react';

const usePostRefereeScheduleCreate = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [sendRefereeScheduleCreateMessage, setSendRefereeScheduleCreateMessage] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);

  const sendRefereeScheduleCreateResetMessage = () => setSendRefereeScheduleCreateMessage('');

  const sendRefereeScheduleCreate = async (from: Date, to: Date) => {
    const controller = new AbortController();

    // Check here that From is lower and at the same day as To.
    // TODO: 

    try {
      const response = await axios.post(
        `${process.env.NODE_ENV === 'production' ? '/api' : ''}/refereeschedule/create`,
        {
          from,
          to
        },
        {
          signal: controller.signal,
        },
      );
      setSuccess(response.data.success);
      setSendRefereeScheduleCreateMessage(response.data.message);
    } catch (error: any) {
      console.log(`Response status: ${error.response?.status}`);
      setSendRefereeScheduleCreateMessage(error.response?.data.message);
    }
    setLoaded(true);
  };

  return { sendRefereeScheduleCreate, success, sendRefereeScheduleCreateMessage, sendRefereeScheduleCreateResetMessage, loaded };
};

export default usePostRefereeScheduleCreate;
