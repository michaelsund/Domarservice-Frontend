import React, { useState, useEffect } from 'react';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { Profile } from '../Types/Profile';
import useFetchMyRefereeEventRequests from '../Hooks/useFetchMyRefereeEventRequests';
import { ExtendedCompanyEventDto } from '../Types/Dto/Requests/ExtendedCompanyEventDto';
import { Link } from 'react-router-dom';

interface IUseFetchMyRefereeEventRequests {
  data: ExtendedCompanyEventDto[] | undefined;
  error: string;
  loaded: boolean;
}

const MyRefereeEventRequests = () => {
  const [profile, setProfile] = useState<Profile>();
  const { data, error, loaded }: IUseFetchMyRefereeEventRequests = useFetchMyRefereeEventRequests();

  return (
    <div className="flex flex-col px-4 items-center text-gray-900 dark:text-white">
      {!loaded ? (
        <LoadingSpinner />
      ) : error.length > 0 ? (
        <div>
          <p>{error}</p>
        </div>
      ) : (
        data !== undefined && (
          <div>
            {data.map((event: ExtendedCompanyEventDto) => (
              <p key={event.id}>
                {event.name}{' '}
                <Link
                  className="text-primary hover:text-primaryHover hover:no-underline text-xs underline mt-4"
                  to={`/match/${event.id}`}
                >
                  Till matchen
                </Link>
              </p>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default MyRefereeEventRequests;
