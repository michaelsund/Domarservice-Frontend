import React, { useState, useEffect, useContext } from 'react';
import { apiFetch } from '../Helpers/ApiFetch';
import { CountyType } from '../Types/CountyType';
import { CountyDto } from '../Types/Dto/CountyDto';
import { RefereeSportDto } from '../Types/Dto/RefereeSportDto';
import { RefereeDto } from '../Types/Dto/Requests/RefereeDto';
import { RefereeType } from '../Types/RefereeType';
import { SportType } from '../Types/SportType';

const RefereeContainer = () => {
  const [referee, setReferee] = useState<RefereeDto>();

  const handleFetch = () => {
    apiFetch('/referee/2', {
      method: 'GET',
    })
      .then((response: any) => setReferee(response.body.data))
      .catch((err: any) => {
        console.log('ApiFetch returned error!!!!');
      });
  };

  useEffect(() => {
    handleFetch();
    console.log('i fire once');
  }, []);

  return (
    <div style={{ width: '20%', display: 'flex', flexDirection: 'column' }}>
      {referee !== undefined ? (
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
      ) : (
        <p>No referee data!</p>
      )}
    </div>
  );
};

export default RefereeContainer;
