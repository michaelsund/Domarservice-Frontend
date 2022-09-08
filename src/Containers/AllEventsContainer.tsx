import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../Hooks/UseAxiosPrivate';
import { CountyType } from '../Types/CountyType';
import { CountyDto } from '../Types/Dto/CountyDto';
import { RefereeSport } from '../Types/Dto/RefereeSport';
import { RefereeDto } from '../Types/Dto/Requests/RefereeDto';
import { RefereeType } from '../Types/RefereeType';
import { SportType } from '../Types/SportType';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { ExtendedCompanyEventDto } from '../Types/Dto/Requests/ExtendedCompanyEventDto';
import { Button } from '../Components/Button';
import { EventCard } from '../Components/EventCard';
import { Card } from '../Components/Card';
import moment from 'moment';

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
  const [companySearchString, setCompanySearchString] = useState<string>('');
  // const [fromDate, setFromDate] = useState<string>(moment('2023-01-25T10:14:24+02:00').format());
  const [fromDate, setFromDate] = useState<string>(moment().format('YYYY-MM-DD'));
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getInitialPageWithoutFilters = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.post(
          `${process.env.NODE_ENV === 'production' ? '/api' : ''}/companyevent/filtered`,
          {
            page,
            fromDate,
            countysFilter,
            sportsFilter,
            refereesFilter,
            companySearchString,
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

    getInitialPageWithoutFilters();

    return () => {
      isMounted = false;
      controller.abort;
    };
  }, [page]);

  const handleGetNewData = async () => {
    setPage(1);
    setLoading(true);
    try {
      const response = await axiosPrivate.post(
        `${process.env.NODE_ENV === 'production' ? '/api' : ''}/companyevent/filtered`,
        {
          page,
          fromDate,
          countysFilter,
          sportsFilter,
          refereesFilter,
          companySearchString,
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
    <div className="flex flex-col items-center text-gray-900 dark:text-white p-6">
      <Card className="mb-6 w-full lg:w-2/3 p-6">
        <div className="flex justify-center">
          <h1 className="flex-1 text-2xl font-normal tracking-tight">Hitta matcher att döma</h1>
          <div className="flex justify-center  items-center h-8 w-8" onClick={() => setShowFilters(!showFilters)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 ml-auto fill-primary hover:fill-primaryHover"
            >
              <path
                fillRule="evenodd"
                d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className={`${!showFilters && 'hidden'} mt-8`}>
          <div className="flex flex-col lg:flex-row lg:space-x-2">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Föreningens namn</label>
              <input
                className="text-gray-900 placeholder:italic placeholder:text-gray-900 block w-full border border-slate-300 rounded-sm py-2 p-3 shadow-sm outline-primaryHover focus:outline-1"
                placeholder="Föreningens namn"
                value={companySearchString}
                onChange={(e) => setCompanySearchString(e.target.value)}
                type="text"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Från datum</label>
              <input
                className="text-gray-900 placeholder:italic placeholder:text-gray-900 block w-full border border-slate-300 rounded-sm py-2 p-3 shadow-sm outline-primaryHover focus:outline-1"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                type="date"
              />
            </div>
          </div>
          <h1 className="text-xl font-normal tracking-tight">Län</h1>
          <div className="flex flex-row flex-wrap">
            {Object.values(CountyType).map((value: string, i: number) => (
              <div key={value} className="p-4">
                <input
                  className="form-check-input appearance-none rounded-sm h-4 w-4 border border-gray-300 bg-white checked:bg-primary focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  onChange={() => handleCountysArray(i)}
                />
                <label className="form-check-label inline-block text-gray-800">{value}</label>
              </div>
            ))}
          </div>
          <h1 className="text-xl font-normal tracking-tight">Sporter</h1>
          <div className="flex flex-row flex-wrap">
            {Object.values(SportType).map((value: string, i: number) => (
              <div key={value} className="p-4">
                <input
                  className="form-check-input appearance-none rounded-sm h-4 w-4 border border-gray-300 bg-white checked:bg-primary focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  onChange={() => handleSportsArray(i)}
                />
                <label className="form-check-label inline-block text-gray-800">{value}</label>
              </div>
            ))}
          </div>
          <h1 className="text-xl font-normal tracking-tight">Domare</h1>
          <div className="flex flex-row flex-wrap">
            {Object.values(RefereeType).map((value: string, i: number) => (
              <div key={value} className="p-4">
                <input
                  className="form-check-input appearance-none rounded-sm h-4 w-4 border border-gray-300 bg-white checked:bg-primary focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  type="checkbox"
                  onChange={() => handleRefereesArray(i)}
                />
                <label className="form-check-label inline-block text-gray-800">{value}</label>
              </div>
            ))}
          </div>
          <div className="flex">
            <Button text="Filtrera" onClick={() => handleSubmitFilter()} />
          </div>
        </div>
      </Card>
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <p>{errorMsg}</p>
      ) : (
        matches.length > 0 && (
          <div className="grid w-full lg:w-2/3 mx-auto space-y-2 lg:space-y-0 lg:gap-2 lg:grid-flow-row-dense lg:grid-cols-3 lg:grid-rows-3">
            {matches.map((match: ExtendedCompanyEventDto) => (
              <EventCard key={match.id} companyEvent={match} />
            ))}
          </div>
        )
      )}
      <div className="flex flex-row space-x-2 pt-8">
        <Button text="Föregående" onClick={() => previousPage()} disabled={page === 1} />
        <Button text="Nästa" onClick={() => nextPage()} disabled={error} />
      </div>
    </div>
  );
};

export default AllEventsContainer;
