import React, { useState } from 'react';
import useAxiosPrivate from '../Hooks/UseAxiosPrivate';
import { CountyType } from '../Types/CountyType';
import { RefereeSport } from '../Types/Dto/RefereeSport';
import { RefereeType } from '../Types/RefereeType';
import { SportType } from '../Types/SportType';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { Button } from '../Components/Button';
import { Card } from '../Components/Card';
import moment from 'moment';
import { RefereeScheduleDto } from '../Types/Dto/Requests/RefereeScheduleDto';
import useFetchAllRefereeSchedules from '../Hooks/useFetchAllRefereeSchedules';

const AllRefereeScheduleContainer = () => {
  const [page, setPage] = useState<number>(1);
  const [countysFilter, setCountysFilter] = useState<number[]>([]);
  const [sportsFilter, setSportsFilter] = useState<number[]>([]);
  const [refereesFilter, setRefereesFilter] = useState<number[]>([]);
  const [redirectToLogin, setRedirectToLogin] = useState<boolean>(false);
  const [availableFromDate, setAvailableFromDate] = useState<string>(moment().format('YYYY-MM-DD'));
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  // Axiosprivate hook needs to be imported here.
  const axiosPrivate = useAxiosPrivate();
  const { data, error, loaded, refreshData }: any = useFetchAllRefereeSchedules({
    page,
    availableFromDate,
    countysFilter,
    sportsFilter,
    refereesFilter,
    redirectToLogin,
  });

  const navigateToLogin = () => {
    navigate('/login', { state: { from: location }, replace: true });
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const previousPage = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };

  const handleSubmitFilter = async () => {
    await refreshData();
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
          <h1 className="flex-1 text-2xl font-normal tracking-tight">
            Hitta domare till din match
          </h1>
          <div
            className="flex justify-center  items-center h-8 w-8"
            onClick={() => setShowFilters(!showFilters)}
          >
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
              <label className="block text-gray-700 text-sm font-bold mb-2">Välj datum</label>
              <input
                className="text-gray-900 placeholder:italic placeholder:text-gray-900 block w-full border border-slate-300 rounded-sm py-2 p-3 shadow-sm outline-primaryHover focus:outline-1"
                value={availableFromDate}
                onChange={(e) => setAvailableFromDate(e.target.value)}
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
      {!loaded ? (
        <LoadingSpinner />
      ) : error.length > 0 ? (
        <>
          <p>{error}</p>
        </>
      ) : (
        data !== null && (
          <Card className="mb-6 w-full lg:w-2/3 p-6">
            <div className="flex justify-center">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Tillgänglig
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Namn
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Dömer
                    </th>
                  </tr>
                </thead>
                {data.map((schedule: RefereeScheduleDto) => (
                  <tbody key={Math.random()}>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td>{moment(schedule.availableAt).format('MMM-DD')}</td>
                      <td>
                        {schedule.referee.surname} {schedule.referee.lastname}
                      </td>
                      <td>
                        {schedule.referee.sports.map((sport: RefereeSport) => (
                          <span key={Math.random()}>
                            {Object.values(SportType)[sport.sportType as any]}{' '}
                            {Object.values(RefereeType)[sport.refereeType as any]}{' '}
                          </span>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </Card>
        )
      )}
      <div className="flex flex-row space-x-2 pt-8">
        <Button text="Föregående" onClick={() => previousPage()} disabled={page === 1} />
        <Button text="Nästa" onClick={() => nextPage()} disabled={error} />
      </div>
    </div>
  );
};

export default AllRefereeScheduleContainer;
