import React, { useState, useEffect, useContext } from 'react';
import useAxiosPrivate from '../Hooks/UseAxiosPrivate';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { Profile } from '../Types/Profile';
import useFetchMyProfile from '../Hooks/useFetchMyProfile';
import MyRefereeEventRequests from '../Components/MyRefereeEventRequests';
import MyRequestsFromCompanies from '../Components/MyRequestsFromCompanies';
import { MyCompanyEvents } from '../Components/MyCompanyEvents';
import { Role } from '../Types/Role';
import { DomarserviceContext } from '../Context/DomarserviceContext';

const MyProfileContainer = () => {
  const [profile, setProfile] = useState<Profile>();
  const { role }: any = useContext(DomarserviceContext);
  const axiosPrivate = useAxiosPrivate();
  const { data, error, loaded }: any = useFetchMyProfile();

  return (
    <div className="flex flex-col px-4 items-center text-gray-900 dark:text-white">
      {!loaded ? (
        <LoadingSpinner />
      ) : error.length > 0 ? (
        <div>
          <h1>Tusan! något gick fel.</h1>
          <p>{error}</p>
        </div>
      ) : (
        data !== undefined && (
          <div>
            <h2>
              {data?.surname} {data?.lastname}
            </h2>
            <ul>
              <li>Epost: {data.email}</li>
              <li>Kontot är aktivt: {data.isActive ? 'Ja' : 'Nej'}</li>
              {data.role !== null && <li>Roll: {data.role}</li>}
              {data.boundRoleId !== 0 && <li>RollId: {data.boundRoleId}</li>}
            </ul>
          </div>
        )
      )}
      <br />
      {role === Role.RefereeUser && (
        <div>
          <h1 className="text-lg">Matcher du ansökt att döma</h1>
          <MyRefereeEventRequests />
          <br />
          <h1 className="text-lg">Förfrågningar från föreningar</h1>
          <MyRequestsFromCompanies />
        </div>
      )}
      {role === Role.CompanyUser && (
        <div>
          <h1 className="text-lg">Din förenings matcher</h1>
          <MyCompanyEvents />
          <br />
        </div>
      )}
    </div>
  );
};

export default MyProfileContainer;
