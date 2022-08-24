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
  // Can select multiple countys.
  const [countysFilter, setCountysFilter] = useState<number[]>([]);
  const [sportsFilter, setSportsFilter] = useState<number[]>([]);
  const [refereesFilter, setRefereesFilter] = useState<number[]>([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getPage = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.post(
          `${process.env.NODE_ENV === 'production' ? '/api' : ''}/companyevent/filtered`,
          {
            page,
            countysFilter,
            sportsFilter,
            refereesFilter
          },
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
        if (error.response.status === 403) {
          navigate('/inte-behorig');
        } else if (error.response.status !== 500) {
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

  const handleGetNewData = async () => {
    setLoading(true);
    try {
      const response = await axiosPrivate.post(
        `${process.env.NODE_ENV === 'production' ? '/api' : ''}/companyevent/filtered`,
        {
          page,
          countysFilter,
          sportsFilter,
          refereesFilter
        },
      );
      setMatches(response.data.data);
      setLoading(false);
      setError(false);
    } catch (error: any) {
      console.log(`Response status: ${error.response?.status}`);
      setLoading(false);
      if (error.response.status === 403) {
        navigate('/inte-behorig');
      } else if (error.response.status !== 500) {
        navigate('/login', { state: { from: location }, replace: true });
      } else {
        setError(true);
        setErrorMsg(error.response.data.message);
        console.log(error);
      }
    }
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };

  const handleSubmitFilter = () => {
    handleGetNewData();
  };

  const handleCountysArray = (countyIndex: number) => {
    if (countysFilter.includes(countyIndex)) {
      setCountysFilter(countysFilter.filter((item) => item !== countyIndex));
    } else {
      setCountysFilter([countyIndex, ...countysFilter]);
    }
  };

  const handleSportsArray = (sportIndex: number) => {
    if (sportsFilter.includes(sportIndex)) {
      setSportsFilter(sportsFilter.filter((item) => item !== sportIndex));
    } else {
      setSportsFilter([sportIndex, ...sportsFilter]);
    }
  };

  const handleRefereesArray = (refereeIndex: number) => {
    if (refereesFilter.includes(refereeIndex)) {
      setRefereesFilter(refereesFilter.filter((item) => item !== refereeIndex));
    } else {
      setRefereesFilter([refereeIndex, ...refereesFilter]);
    }
  };

  return (
    <div className="flex flex-col items-center text-gray-900 dark:text-white">
      <b>Jag letar efter matcher i.</b>
      <p>Län</p>
      <div className="flex flex-row flex-wrap">
        {Object.values(CountyType).map((value: string, i: number) => (
          <div key={i} className="p-4">
            <input
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="checkbox"
              onChange={() => handleCountysArray(i)}
            />
            <label className="form-check-label inline-block text-gray-800">{value}</label>
          </div>
        ))}
      </div>
      <p>Sporter</p>
      {Object.values(SportType).map((value: string, i: number) => (
        <div key={i}>
          <input
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="checkbox"
            onChange={() => handleSportsArray(i)}
          />
          <label className="form-check-label inline-block text-gray-800">{value}</label>
        </div>
      ))}
       <p>Domartyper</p>
      {Object.values(RefereeType).map((value: string, i: number) => (
        <div key={i}>
          <input
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-primary focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
            type="checkbox"
            onChange={() => handleRefereesArray(i)}
          />
          <label className="form-check-label inline-block text-gray-800">{value}</label>
        </div>
      ))}
      <Button text="Filtrera" onClick={() => handleSubmitFilter()} />
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
