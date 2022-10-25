import React, { useState } from 'react';
import useAxiosPrivate from '../Hooks/UseAxiosPrivate';
import { LoadingSpinner } from './LoadingSpinner';
import { Profile } from '../Types/Profile';
import useFetchMyRequestsFromCompanies from '../Hooks/useFetchMyRequestsFromCompanies';
import { RefereeScheduleDto } from '../Types/Dto/Requests/RefereeScheduleDto';
import { BookingRequestByCompanysDto } from '../Types/Dto/Requests/BookingRequestByCompanysDto';
import moment from 'moment';
import { Button } from './Button';
import { CompanyRequest } from './CompanyRequest';

interface IUseFetchMyRequestsFromCompanies {
  data: RefereeScheduleDto[] | undefined;
  error: string;
  loaded: boolean;
}

const MyRequestsFromCompanies = () => {
  const [profile, setProfile] = useState<Profile>();
  const axiosPrivate = useAxiosPrivate();
  const { data, error, loaded }: IUseFetchMyRequestsFromCompanies =
    useFetchMyRequestsFromCompanies();

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
            {data.map((schedule: RefereeScheduleDto) => (
              <div key={schedule.id}>
                <p className="text-xl text-center" key={schedule.id}>{moment(schedule.availableAt).format('DD MMM')}</p>
                  {schedule.bookingRequestByCompanys.map((x: BookingRequestByCompanysDto) => (
                    // Own component here! Can use the usePostRefereeResponse hook
                    <CompanyRequest key={x.id} bookingRequestByCompany={x} />
                  ))}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default MyRequestsFromCompanies;
