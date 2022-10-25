import moment from 'moment';
import React from 'react';
import useAxiosPrivate from '../Hooks/UseAxiosPrivate';
import useFetchMyEvents from '../Hooks/useFetchMyEvents';
import { BookingRequestByRefereeDto } from '../Types/Dto/BookingRequestByRefereeDto';
import { CompanyEventDto } from '../Types/Dto/Requests/CompanyEventDto';
import usePostCompanyResponse from '../Hooks/usePostCompanyResponse';
import { Button } from './Button';

interface IUsePostRefereeResponse {
  sendAwnser: any;
  success: boolean;
  error: string;
  loaded: boolean;
}

interface IUseFetchMyEvents {
  data: CompanyEventDto[] | undefined;
  error: string;
  loaded: boolean;
}

export const MyCompanyEvents = () => {
  const axiosPrivate = useAxiosPrivate();
  const { data, error, loaded }: IUseFetchMyEvents = useFetchMyEvents();
  const companyResponse: IUsePostRefereeResponse = usePostCompanyResponse();

  return (
    <div>
      {data?.map((companyEvent: CompanyEventDto) => (
        <div key={companyEvent.id}>
          <p>
            {moment(companyEvent.date).format('YYYY-MM-DD')} - {companyEvent.name} -
            {companyEvent.location}
          </p>
          <p className="text-xl">Anmälda domare</p>
          {companyEvent.bookingRequestByReferees.map((request: BookingRequestByRefereeDto) => (
            <div key={request.id}>
              <p>
                {request.referee.surname} {request.referee.lastname} :{' '}
                {request.accepted ? 'Accepterad' : 'Inte accepterad'}
              </p>
              <Button text="Acceptera" onClick={() => companyResponse.sendAwnser({ requestId: request.id, accepted: true })} />
              <Button text="Acceptera inte" onClick={() => companyResponse.sendAwnser({ requestId: request.id, accepted: false })} />
            </div>
          ))}
          <br />
        </div>
      ))}
    </div>
  );
};
