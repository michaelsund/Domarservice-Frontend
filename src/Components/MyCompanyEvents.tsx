import moment from 'moment';
import React from 'react';
import useAxiosPrivate from '../Hooks/UseAxiosPrivate';
import useFetchMyEvents from '../Hooks/useFetchMyEvents';
import { BookingRequestByRefereeDto } from '../Types/Dto/BookingRequestByRefereeDto';
import { CompanyEventDto } from '../Types/Dto/Requests/CompanyEventDto';
import usePostCompanyResponse from '../Hooks/usePostCompanyResponse';
import { Button } from './Button';
import { DeleteMyEvent } from './DeleteMyEvent';
import { request } from 'https';

interface IUsePostRefereeResponse {
  sendAwnser: any;
  success: boolean;
  error: string;
  loaded: boolean;
}

interface IUseFetchMyEvents {
  data: CompanyEventDto[] | undefined;
  reFetch: () => void;
  error: string;
  loaded: boolean;
}

export const MyCompanyEvents = () => {
  const axiosPrivate = useAxiosPrivate();
  const { data, reFetch, error, loaded }: IUseFetchMyEvents = useFetchMyEvents();
  const companyResponse: IUsePostRefereeResponse = usePostCompanyResponse();

  const sendAwnser = async (requestId: number, awnser: boolean) => {
    await companyResponse.sendAwnser({ requestId: requestId, accepted: awnser });
    reFetch();
  };

  return (
    <div>
      {data?.map((companyEvent: CompanyEventDto) => (
        <div key={companyEvent.id}>
          <p>
            {moment(companyEvent.date).format('YYYY-MM-DD')} - {companyEvent.name} -
            {companyEvent.location}
          </p>
          <DeleteMyEvent eventId={companyEvent.id} parentReload={reFetch} />
          <p className="text-xl">Anmälda domare</p>
          {companyEvent.bookingRequestByReferees.map((request: BookingRequestByRefereeDto) => (
            <div key={request.id}>
              <p>
                {request.referee.surname} {request.referee.lastname} :{' '}
                {request.accepted ? 'Accepterad' : 'Inte accepterad'}
              </p>
              <Button text="Acceptera" onClick={() => sendAwnser(request.id, true)} />
              <Button text="Acceptera inte" onClick={() => sendAwnser(request.id, false)} />
            </div>
          ))}
          <br />
        </div>
      ))}
    </div>
  );
};
