import moment from 'moment';
import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../Hooks/UseAxiosPrivate';
import { CountyType } from '../Types/CountyType';
import { ExtendedCompanyEventDto } from '../Types/Dto/Requests/ExtendedCompanyEventDto';
import { SportType } from '../Types/SportType';
import { EventCard } from './EventCard';
import { LoadingSpinner } from './LoadingSpinner';

export const UpcomingMatches = () => {
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [matches, setMatches] = useState<ExtendedCompanyEventDto[]>([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getReferee = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get('/companyevent/latest/3', {
          signal: controller.signal,
        });
        isMounted && setMatches(response.data.data);
        setLoading(false);
      } catch (error: any) {
        console.log(`Response status: ${error.response?.status}`);
        setLoading(false);
        if (error.response.status !== 500) {
          // navigate('/login', { state: { from: location }, replace: true });
          console.log('Got 500 as response in UpcomingMatches');
        } else {
          setError(true);
          setErrorMsg(error.response.data.message);
          console.log(error);
        }
      }
    };

    getReferee();

    return () => {
      isMounted = false;
      controller.abort;
    };
  }, []);
  return loading ? (
    <LoadingSpinner className="w-full" />
  ) : error ? (
    <p>{errorMsg}</p>
  ) : (
    <div className="container w-full lg:w-2/3 mx-auto space-y-2 lg:space-y-0 lg:gap-2 lg:grid lg:grid-cols-3">
      {matches.length > 0 &&
        matches.map((match: ExtendedCompanyEventDto) => (
          <EventCard key={match.id} companyEvent={match} />
        ))}
    </div>
  );
};
