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
import { ExtendedCompanyEventDto } from '../Types/Dto/Requests/ExtendedCompanyEventDto';
import moment from 'moment';
import { Button } from '../Components/Button';
import { EventCard } from '../Components/EventCard';

const AllEventsContainer = () => {
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [matches, setMatches] = useState<ExtendedCompanyEventDto[]>([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getPage = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get(
          `${process.env.NODE_ENV === 'production' ? '/api' : ''}/companyevent/all/${page}`,
          {
            signal: controller.signal,
          },
        );
        isMounted && setMatches(response.data.data);
        setLoading(false);
        setError(false);
      } catch (error: any) {
        console.log(`Response status: ${error.response?.status}`);
        setLoading(false);
        if (error.response.status !== 500) {
          navigate('/login', { state: { from: location }, replace: true });
        } else {
          setError(true);
          setErrorMsg(error.response.data.message);
          console.log(error);
        }
      }
    };

    getPage();

    return () => {
      isMounted = false;
      controller.abort;
    };
  }, [page]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="flex flex-col items-center text-gray-900 dark:text-white">
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{errorMsg}</p>
      ) : (
        matches.length > 0 && (
          <div className="grid grid-flow-col space-x-4">
            {matches.map((match: ExtendedCompanyEventDto) => (
              <EventCard key={match.id} companyEvent={match} />
            ))}
          </div>
        )
      )}
      <div className="flex flex-row space-x-2 pt-8">
        <Button text="Tillbaka" onClick={() => previousPage()} disabled={page === 1} />
        <Button text="Nästa" onClick={() => nextPage()} disabled={error} />
      </div>
    </div>
  );
};

export default AllEventsContainer;
