import axios from 'axios';
import { useState } from 'react';

const useGetRevokeBookingRequestOnRefereeSchedule = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loaded, setLoaded] = useState<boolean>(false);

  const revokeRequest = async (requestId: number) => {
    const controller = new AbortController();

    try {
      const response = await axios.get(
        `${process.env.NODE_ENV === 'production' ? '/api' : ''}/bookingrequest/revoke-request-by-company/${requestId}`,
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

  return { revokeRequest, success, error, loaded };
};

export default useGetRevokeBookingRequestOnRefereeSchedule;
