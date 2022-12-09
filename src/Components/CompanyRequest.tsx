import moment from 'moment';
import React from 'react';
import usePostRefereeResponse from '../Hooks/usePostRefereeResponse';
import { BookingRequestByCompanyDto } from '../Types/Dto/BookingRequestByCompanyDto';
import { ScheduleDto } from '../Types/Dto/ScheduleDto';
import { Button } from './Button';

interface IUsePostRefereeResponse {
  sendAwnser: any;
  success: boolean;
  error: string;
  loaded: boolean;
}

interface IProps {
  bookingRequestByCompany: BookingRequestByCompanyDto;
  schedule: ScheduleDto;
}

export const CompanyRequest = (props: IProps) => {
  const { sendAwnser, success, error, loaded }: IUsePostRefereeResponse = usePostRefereeResponse();

  return (
    <div>
      <p key={props.bookingRequestByCompany.id}>
        {moment(props.schedule.from).format('MMM-DD HH:mm')} -{' '}
        {moment(props.schedule.to).format('HH:mm')}
        <br />
        {props.bookingRequestByCompany.requestingCompany.name}:{' '}
        {/* {props.bookingRequestByCompany.accepted === false &&
        props.bookingRequestByCompany.respondedAt === '0001-01-01T00:00:00'
          ? 'Inget svar har lämnats än.'
          : props.bookingRequestByCompany.accepted
          ? 'Du har svarat ja.'
          : 'Du har svarat nej.'}
        {props.bookingRequestByCompany.respondedAt !== '0001-01-01T00:00:00' &&
          `Svarade: ${moment(props.bookingRequestByCompany.respondedAt).format('DD MMM')}`} */}
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
