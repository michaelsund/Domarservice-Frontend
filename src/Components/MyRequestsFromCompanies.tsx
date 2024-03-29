import React, { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { Profile } from '../Types/Profile';
import useFetchMyRequestsFromCompanies from '../Hooks/useFetchMyRequestsFromCompanies';
import { RefereeScheduleDto } from '../Types/Dto/Requests/RefereeScheduleDto';
import moment from 'moment';
import { Button } from './Button';
import { CompanyRequest } from './CompanyRequest';
import { BookingRequestByCompanyDto } from '../Types/Dto/BookingRequestByCompanyDto';

interface IUseFetchMyRequestsFromCompanies {
  data: RefereeScheduleDto[] | undefined;
  error: string;
  loaded: boolean;
}

const MyRequestsFromCompanies = () => {
  const [profile, setProfile] = useState<Profile>();
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
                {/* <p className="text-xl text-center" key={schedule.id}>{moment(schedule.from).format('DD MMM HH:mm')} - {moment(schedule.to).format('HH:mm')}</p> */}
                  {schedule.bookingRequestByCompanys.map((x: BookingRequestByCompanyDto) => (
                    // Own component here! Can use the usePostRefereeResponse hook
                    <CompanyRequest key={x.id} bookingRequestByCompany={x} schedule={schedule} />
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
