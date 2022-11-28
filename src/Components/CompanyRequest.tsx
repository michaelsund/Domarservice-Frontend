import moment from 'moment';
import React from 'react';
import useAxiosPrivate from '../Hooks/UseAxiosPrivate';
import usePostRefereeResponse from '../Hooks/usePostRefereeResponse';
import { BookingRequestByCompanysDto } from '../Types/Dto/Requests/BookingRequestByCompanysDto';
import { Button } from './Button';

interface IUsePostRefereeResponse {
  sendAwnser: any;
  success: boolean;
  error: string;
  loaded: boolean;
}

interface IProps {
  bookingRequestByCompany: BookingRequestByCompanysDto;
}

export const CompanyRequest = (props: IProps) => {
  const axiosPrivate = useAxiosPrivate();
  const { sendAwnser, success, error, loaded }: IUsePostRefereeResponse = usePostRefereeResponse();

  return (
    <div>
      <p key={props.bookingRequestByCompany.id}>
        {props.bookingRequestByCompany.requestingCompany.name}:{' '}
        {props.bookingRequestByCompany.accepted === false &&
        props.bookingRequestByCompany.respondedAt === '0001-01-01T00:00:00'
          ? 'Inget svar har lämnats än.'
          : props.bookingRequestByCompany.accepted
          ? 'Du har svarat ja.'
          : 'Du har svarat nej.'
          // props.bookingRequestByCompany.respondedAt !== '0001-01-01T00:00:00' &&
          //   `Svarade: ${moment(props.bookingRequestByCompany.respondedAt).format('DD MMM')}`
        }
        <Button
          text="Ja"
          onClick={() =>
            sendAwnser({ requestId: props.bookingRequestByCompany.id, accepted: true })
          }
        />
        <Button
          text="Nej"
          onClick={() =>
            sendAwnser({ requestId: props.bookingRequestByCompany.id, accepted: false })
          }
        />
      </p>
    </div>
  );
};
