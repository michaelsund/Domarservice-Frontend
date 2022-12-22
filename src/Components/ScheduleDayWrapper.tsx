import moment from 'moment';
import React, { useEffect, useState } from 'react';
import usePostRefereeScheduleCreate from '../Hooks/usePostRefereeScheduleCreate';
import usePostRefereeScheduleDelete from '../Hooks/usePostRefereeScheduleDelete';
import { Available } from '../Types/Available';
import { BookingRequestByCompanyDto } from '../Types/Dto/BookingRequestByCompanyDto';
import { RefereeMonthScheduleDto } from '../Types/Dto/RefereeMonthScheduleDto';
import { Button } from './Button';

interface IProps {
  day: RefereeMonthScheduleDto;
  date: string;
  fromTime: string;
  toTime: string;
}

export const ScheduleDayWrapper = (props: IProps) => {
  const { sendRefereeScheduleCreate, sendRefereeScheduleCreateMessage }: any =
    usePostRefereeScheduleCreate();
  const { sendRefereeScheduleDelete }: any = usePostRefereeScheduleDelete();
  const [canBeRemoved, setCanBeRemoved] = useState<boolean>(true);

  useEffect(() => {
    props.day.bookingRequestByCompanys.map((request: BookingRequestByCompanyDto) => {
      // The referee needs to decline the request before the scheduled time can be removed.
      if (request.accepted) {
        setCanBeRemoved(false);
      }
    });
  }, []);

  const handleCreateNewAvailableDay = () => {
    sendRefereeScheduleCreate(
      moment(props.date + ' ' + props.fromTime).utcOffset(+1),
      moment(props.date + ' ' + props.toTime).utcOffset(+1),
    );
  };

  return (
    <>
      <p>Lägg till en ny tid den {props.date}</p>
      <Button text="Lägg till" onClick={() => handleCreateNewAvailableDay()} />
      <p>{sendRefereeScheduleCreateMessage}</p>
      {props.day.availableTimes.length > 0 && <p>Tillgängliga tider</p>}
      {props.day.availableTimes.map((availableDay: Available) => (
        <div className="my-2" key={availableDay.id}>
          <p>
            {moment(availableDay.from).format('DD/MM HH:mm')} -{' '}
            {moment(availableDay.to).format('HH:mm')} scheduleId: {availableDay.id}
          </p>
          <>
            {props.day.bookingRequestByCompanys.map(
              (request: BookingRequestByCompanyDto) =>
                request.schedule.id === availableDay.id && (
                  <p key={request.id}>{request.requestingCompany.name} {request.accepted ? 'är accepterad.' : 'har gjort en förfrågan.'}</p>
                ),
                // <p key={request.id}>{request.requestingCompany.name} på scheduleId: {request.schedule.id}</p>
            )}
          </>
        </div>
      ))}
      {/* {canBeRemoved && (
        <Button
          text="Ta bort schemadagen"
          small
          onClick={() => sendRefereeScheduleDelete(props.day.id)}
        />
      )} */}
    </>
  );
};
