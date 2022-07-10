import moment from 'moment';
import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../Hooks/UseAxiosPrivate';
import { CountyType } from '../Types/CountyType';
import { ExtendedCompanyEventDto } from '../Types/Dto/Requests/ExtendedCompanyEventDto';
import { SportType } from '../Types/SportType';
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
  return (
    <div className="grid grid-flow-col gap-4">
      {loading ? (
        <LoadingSpinner className="w-full" />
      ) : error ? (
        <p>{errorMsg}</p>
      ) : (
        matches.length > 0 &&
        matches.map((match: ExtendedCompanyEventDto) => (
          <div key={match.id} className="h-52 p-6 bg-white rounded-2xl">
            <p>
              {match.company.name} i {CountyType[match.company.county]} {match.company.city}
            </p>
            <p>{match.name}</p>
            <p>{match.location}</p>
            <p>Domare: {match.refereeTypesForEvent.length}</p>
            <p>Sport: {SportType[match.sportType]}</p>
            <p>{moment(match.date).format('YYYY-MM-DD')}</p>
          </div>
        ))
      )}
    </div>
  );
};
