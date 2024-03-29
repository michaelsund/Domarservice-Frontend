import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { Card } from '../Components/Card';
import useFetchCompanyEvent from '../Hooks/useFetchCompanyEvent';
import { CreateBookingRequestOnEvent } from '../Components/CreateBookingRequestOnEvent';
import { RefereeType } from '../Types/RefereeType';
import { SportType } from '../Types/SportType';
import { CompanyEventDto } from '../Types/Dto/Requests/CompanyEventDto';
import { BookingRequestByRefereeDto } from '../Types/Dto/BookingRequestByRefereeDto';

interface IUseFetchCompanyEvent {
  data?: CompanyEventDto;
  error: string;
  loaded: boolean;
  refreshData(): any;
}

const CompanyEventContainer = () => {
  const navigate = useNavigate();
  const { id }: any = useParams();
  const { data, error, loaded, refreshData }: IUseFetchCompanyEvent = useFetchCompanyEvent({
    id,
  });

  const navigateToLogin = () => {
    navigate('/login', { state: { from: location }, replace: true });
  };

  return (
    <div className="flex flex-col items-center text-gray-900 dark:text-white p-6">
      <Card className="mb-6 w-full lg:w-2/3 p-6">
        <div className="flex justify-center">
          <h1 className="flex-1 text-2xl font-normal tracking-tight">Matchen</h1>
        </div>
      </Card>
      {!loaded ? (
        <LoadingSpinner />
      ) : (
        <div>
          <p>
            Id: {data?.id} Name: {data?.name}
          </p>
          <p>{moment(data?.date).format('MMM-DD HH:mm')} till {moment(data?.date).add(data?.durationHours, 'hours').add(data?.durationMinutes, 'minutes').format('HH:mm')}</p>
          <p>Pågår i: {data?.durationHours} timar och {data?.durationMinutes} minuter.</p>
          <p>{data?.location}</p>
          <p>Sport: {Object.values(SportType)[data?.sportType as any]}</p>
          {data?.bookingRequestByReferees !== undefined && (
            <div className="m-8">
              <div>
                Domare som behövs:{' '}
                {data.refereeTypesForEvent.map((val: any) => (
                  <p key={Math.random()}>{Object.values(RefereeType)[val.refereeType]}</p>
                ))}
              </div>
              <b>Domare / Kommer inte visas här sen!</b>
              {data?.bookingRequestByReferees.map((request: BookingRequestByRefereeDto) => (
                <div key={request.id}>
                  <p>
                    Id: {request.referee.id} {request.referee.surname} {request.referee.lastname}{' '}
                    <b>
                      {request.accepted ? 'Accepterad' : 'Väntar på svar'} Type:{' '}
                      {Object.values(RefereeType)[request.refereeType as any]}
                    </b>
                  </p>
                  <p>{request.message}</p>
                </div>
              ))}
            </div>
          )}
          <CreateBookingRequestOnEvent
            existingBookingRequests={data?.bookingRequestByReferees}
            eventId={data?.id}
            message="Jag kan döma!"
            refreshData={refreshData}
          />
        </div>
      )}
    </div>
  );
};

export default CompanyEventContainer;
