import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../Hooks/UseAxiosPrivate';
import { CountyType } from '../Types/CountyType';
import { CountyDto } from '../Types/Dto/CountyDto';
import { RefereeSportDto } from '../Types/Dto/RefereeSportDto';
import { RefereeDto } from '../Types/Dto/Requests/RefereeDto';
import { RefereeType } from '../Types/RefereeType';
import { SportType } from '../Types/SportType';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { Profile } from '../Types/Profile';

const MyProfileContainer = () => {
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile>();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProfile = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(
          `${process.env.NODE_ENV === 'production' && '/api'}/authenticate/profile`,
          {
            signal: controller.signal,
          },
        );
        isMounted && setProfile(response.data.data);
        setLoading(false);
      } catch (error: any) {
        console.log(`Response status: ${error.response?.status}`);
        setLoading(false);
        if (error.response.status === 401 || error.response.status === 400) {
          navigate('/login', { state: { from: location }, replace: true });
        } else {
          setError(true);
          setErrorMsg(error.response.data.message);
          console.log(error);
        }
      }
    };

    getProfile();

    return () => {
      isMounted = false;
      controller.abort;
    };
  }, []);

  return (
    <div className="flex flex-col px-4 text-gray-900 dark:text-white">
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>
          <h1>Tusan! något gick fel.</h1>
          <p>{errorMsg}</p>
        </div>
      ) : (
        profile !== undefined && (
          <div>
            <h2>
              {profile?.surname} {profile?.lastname}
            </h2>
            <ul>
              <li>Epost: {profile.email}</li>
              <li>Kontot är aktivt: {profile.isActive ? 'Ja' : 'Nej'}</li>
              {profile.role !== null && <li>Roll: {profile.role}</li>}
              {profile.boundRoleId !== 0 && <li>RollId: {profile.boundRoleId}</li>}
            </ul>
          </div>
        )
      )}
    </div>
  );
};

export default MyProfileContainer;
