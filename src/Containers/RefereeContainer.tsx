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

const RefereeContainer = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [referee, setReferee] = useState<RefereeDto>();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getReferee = async () => {
      setLoading(true);
      try {
        const response = await axiosPrivate.get('/referee/2', {
          signal: controller.signal,
        });
        isMounted && setReferee(response.data.data);
        setLoading(false);
      } catch (error: any) {
        console.log(error);
        setLoading(false);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    getReferee();

    return () => {
      isMounted = false;
      controller.abort;
    };
  }, []);

  return (
    <div className="flex flex-col px-4 text-gray-900 dark:text-white">
      {loading ? (
        <LoadingSpinner />
      ) : (
        referee !== undefined && (
          <div>
            <h2>
              {referee?.surname} {referee?.lastname}
            </h2>
            <h4>Sporter</h4>
            <ul>
              {referee.sports.map((sport: RefereeSportDto) => (
                <li key={`sport- ${sport.sportType}-${sport.refereeType}`}>
                  {SportType[sport.sportType]} - {RefereeType[sport.refereeType]}
                </li>
              ))}
            </ul>
            <h4>Län</h4>
            <ul>
              {referee.countys.map((county: CountyDto) => (
                <li key={`county- ${county.countyType}`}>{CountyType[county.countyType]}</li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
};

export default RefereeContainer;
