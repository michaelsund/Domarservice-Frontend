import { useState } from 'react';
import internal from 'stream';
import { axiosPrivate } from '../Helpers/Axios';
import { BookScheduleByCompanyBody } from '../Types/BookScheduleByCompanyBody';

const usePostRequestByCompany = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);

  const sendRequestByCompany = async (data: BookScheduleByCompanyBody) => {
    const controller = new AbortController();
    console.log(data);
    try {
      const response = await axiosPrivate.post(
        `${process.env.NODE_ENV === 'production' ? '/api' : ''}/bookingrequest/request-by-company`,
        data,
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

  return { sendRequestByCompany, success, error, loaded };
};

export default usePostRequestByCompany;
