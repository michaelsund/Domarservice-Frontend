import axios from 'axios';
import { useState } from 'react';

const usePostRefereeScheduleCreate = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [sendRefereeScheduleCreateMessage, setSendRefereeScheduleCreateMessage] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);

  const sendRefereeScheduleCreateResetMessage = () => setSendRefereeScheduleCreateMessage('');

  const sendRefereeScheduleCreate = async (availableAt: string) => {
    const controller = new AbortController();

    try {
      const response = await axios.post(
        `${process.env.NODE_ENV === 'production' ? '/api' : ''}/refereeschedule/create`,
        {
          availableAt
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
