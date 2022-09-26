import React, { useState } from 'react';
import moment from 'moment';
import useAxiosPrivate from '../Hooks/UseAxiosPrivate';
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
  // Axiosprivate hook needs to be imported here.
  const axiosPrivate = useAxiosPrivate();
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
      ) : error.length > 0 ? (
        <>
          <p>{error}</p>
          <p>
            Du kanske behöver <b onClick={() => navigateToLogin()}>Logga in</b>
          </p>
        </>
      ) : (
        <div>
          <p>Id: {data?.id} Name: {data?.name}</p>
          <p>{moment(data?.date).format('MMM-DD')}</p>
          <p>{data?.location}</p>
          {data?.bookingRequestByReferees !== undefined && (
            <div className="m-8">
              <b>Domare / Kommer inte visas här sen!</b>
              {data?.bookingRequestByReferees.map((request: BookingRequestByRefereeDto) => (
                <div key={request.id}>
                  <p>
                    Id: {request.referee.id} {request.referee.surname} {request.referee.lastname} <b>{String(request.accepted)}</b>
                  </p>
                  <p>{request.message}</p>
                </div>
              ))}
            </div>
          )}
          <CreateBookingRequestOnEvent
            existingBookingRequests={data?.bookingRequestByReferees}
            eventId={data?.id}
            refereeType={RefereeType.Huvuddomare}
            message="Jag kan döma!"
            sportType={Object.values(SportType)[data?.sportType as any]}
            refreshData={refreshData}
          />
        </div>
      )}
    </div>
  );
};

export default CompanyEventContainer;
