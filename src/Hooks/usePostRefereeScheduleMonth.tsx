import axios from 'axios';
import { useState } from 'react';
import { RefereeMonthScheduleDto } from '../Types/Dto/RefereeMonthScheduleDto';

const usePostRefereeScheduleMonth = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<RefereeMonthScheduleDto[]>();

  const sendMonthScheduleRequest = async (refereeId: number, year: number, month: number) => {
    const controller = new AbortController();

    try {
      const response = await axios.post(
        `${process.env.NODE_ENV === 'production' ? '/api' : ''}/refereeschedule/month`,
        {
          refereeId: refereeId,
          year: year,
          month: month,
        },
        {
          signal: controller.signal,
        },
      );
      setData(response.data.data);
      setSuccess(response.data.success);
      setError('');
    } catch (error: any) {
      console.log(`Response status: ${error.response?.status}`);
      setError(error.response?.data.message);
    }
    setLoaded(true);
  };

  return { sendMonthScheduleRequest, data, success, error, loaded };
};

export default usePostRefereeScheduleMonth;
