import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../Hooks/UseAxiosPrivate';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../Components/LoadingSpinner';

const VerifyEmailContainer = () => {
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');
  const email = queryParams.get('email');

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    console.log(token);
    const handleVerifyEmail = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(
          `${
            process.env.NODE_ENV === 'production' ? '/api' : ''
          }/authenticate/confirm-email?token=${token}&email=${email}`,
          {
            signal: controller.signal,
          },
        );
        // isMounted && setProfile(response.data.data);
        setLoading(false);
      } catch (error: any) {
        console.log(`Response status: ${error.response?.status}`);
        setLoading(false);
        setError(true);
        setErrorMsg(error.response.data.message);
        console.log(error);
      }
    };

    handleVerifyEmail();

    return () => {
      isMounted = false;
      controller.abort;
    };
  }, []);

  return (
    <div className="flex flex-col px-4 items-center text-gray-900 dark:text-white">
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>
          <h1>Tusan! något gick fel.</h1>
          <p>{errorMsg}</p>
        </div>
      ) : (
        <p>E-posten verifierades!</p>
      )}
    </div>
  );
};

export default VerifyEmailContainer;
