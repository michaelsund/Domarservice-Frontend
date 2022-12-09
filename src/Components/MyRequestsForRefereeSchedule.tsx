import moment from 'moment';
import React from 'react';
import useFetchAllMyRequestsOnRefereeSchedule from '../Hooks/useFetchAllMyRequestsOnRefereeSchedule';
import useGetRevokeBookingRequestOnRefereeSchedule from '../Hooks/useGetRevokeBookingRequestOnRefereeSchedule';
import { BookingRequestByCompanyDto } from '../Types/Dto/BookingRequestByCompanyDto';
import { Button } from './Button';

export const MyRequestsForRefereeSchedule = () => {
  const { companyRequestsOnSchedules }: any = useFetchAllMyRequestsOnRefereeSchedule();
  const { revokeRequest }: any = useGetRevokeBookingRequestOnRefereeSchedule();

  return (
    <div>
      {companyRequestsOnSchedules?.map((request: BookingRequestByCompanyDto) => (
        <div key={request.id}>
          <Button text="Ta bort" onClick={() => revokeRequest(request.id)}/>
          <p>
            {moment(request.schedule.from).format('MMM DD hh:mm')}{' '}
            {moment(request.schedule.to).format('hh:mm')} {request.schedule.referee.surname}{' '}
            {request.schedule.referee.lastname} Svar: {request.accepted ? 'Ja' : 'Nej'}
          </p>
          <br />
        </div>
      ))}
    </div>
  );
};
