import React, { useState, useEffect, useContext } from 'react';
import { AuthContext, AuthContextType } from '../Context/AuthContext';
import { CountyType } from '../types/CountyType';
import { CountyDto } from '../types/Dto/CountyDto';
import { RefereeSportDto } from '../types/Dto/RefereeSportDto';
import { RefereeDto } from '../types/Dto/Requests/RefereeDto';
import { RefereeType } from '../types/RefereeType';
import { SportType } from '../types/SportType';

const RefereeContainer = () => {
  const [referee, setReferee] = useState<RefereeDto>();
  const { token } = useContext(AuthContext) as AuthContextType;

  const handleFetch = () => {
    fetch('/referee/2', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then(jsonResponse => {
        setReferee(jsonResponse.data)
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    handleFetch();
    console.log('i fire once');
  }, []);

  return (
    <div style={{ width: '20%', display: 'flex', flexDirection: 'column' }}>
      {referee !== undefined ?
        <div>
          <h2>{referee?.surname} {referee?.lastname}</h2>
          <h4>Sporter</h4>
          <ul>
            {referee.sports.map((sport: RefereeSportDto) =>
              <li key={`sport- ${sport.sportType}-${sport.refereeType}`}>{SportType[sport.sportType]} - {RefereeType[sport.refereeType]}</li>)
            }
          </ul>
          <h4>Län</h4>
          <ul>
            {referee.countys.map((county: CountyDto) =>
              <li key={`county- ${county.countyType}`}>{CountyType[county.countyType]}</li>)
            }
          </ul>
        </div> :
        <p>No referee data!</p>}
    </div>
  );
}

export default RefereeContainer;
