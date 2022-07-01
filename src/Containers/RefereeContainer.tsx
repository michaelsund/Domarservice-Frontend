import React, { useState, useEffect } from 'react';
import axios from '../Helpers/Axios';
import { CountyType } from '../Types/CountyType';
import { CountyDto } from '../Types/Dto/CountyDto';
import { RefereeSportDto } from '../Types/Dto/RefereeSportDto';
import { RefereeDto } from '../Types/Dto/Requests/RefereeDto';
import { RefereeType } from '../Types/RefereeType';
import { SportType } from '../Types/SportType';
import useRefreshToken from '../Hooks/UseRefreshToken';
import useAuth from '../Hooks/UseAuth';

const RefereeContainer = () => {
  // const navigate = useNavigate();
  const [referee, setReferee] = useState<RefereeDto>();
  const refresh = useRefreshToken();
  const { auth }: any = useAuth();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getReferee = async () => {
      try {
        const response = await axios.get('/referee/2', {
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        });
        console.log(response.data);
        isMounted && setReferee(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getReferee();

    return () => {
      isMounted = false;
      controller.abort;
    };
  }, []);

  return (
    <div style={{ width: '20%', display: 'flex', flexDirection: 'column' }}>
      {referee !== undefined && (
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
      )}
      <button onClick={() => refresh()}>Refresh token</button>
    </div>
  );
};

export default RefereeContainer;
