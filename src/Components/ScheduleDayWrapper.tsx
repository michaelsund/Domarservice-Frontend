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
      {props.day.availableTimes.map((availableTimeslot: Available) => (
        <div className="my-2" key={availableTimeslot.id}>
          <p>
            {moment(availableTimeslot.from).format('DD/MM HH:mm')} -{' '}
            {moment(availableTimeslot.to).format('HH:mm')} scheduleId: {availableTimeslot.id}
          </p>
          <Button
            text="Ta bort tiden"
            small
            onClick={() => sendRefereeScheduleDelete(availableTimeslot.id)}
          />
          <>
            {props.day.bookingRequestByCompanys.map(
              (request: BookingRequestByCompanyDto) =>
                request.schedule.id === availableTimeslot.id && (
                  <p key={request.id}>
                    {request.requestingCompany.name}{' '}
                    {request.accepted ? 'är accepterad.' : 'har gjort en förfrågan.'} på schemaId{' '}
                    {request.schedule.id} med eget id: {request.id}
                  </p>
                ),
            )}
          </>
        </div>
      ))}
    </>
  );
};
