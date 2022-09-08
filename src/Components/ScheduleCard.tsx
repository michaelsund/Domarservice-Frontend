import React from 'react';
import moment from 'moment';
import { RefereeScheduleDto } from '../Types/Dto/Requests/RefereeScheduleDto';
import { SportType } from '../Types/SportType';
import { RefereeType } from '../Types/RefereeType';
import { Card } from './Card';
import { RefereeSport } from '../Types/Dto/RefereeSport';

interface IProps {
  refereeSchedule: RefereeScheduleDto;
}

export const ScheduleCard = (props: IProps) => {
  return (
    <Card className="p-6">
      <p>Datum: {moment(props.refereeSchedule.availableAt).format('MMM-DD')}</p>
      <p>Schema id: {props.refereeSchedule.id}</p>
      <p>
        {props.refereeSchedule.referee.surname} {props.refereeSchedule.referee.lastname}
      </p>
      <p>Sporter och roller</p>
      <ul>
        {props.refereeSchedule.referee.sports.map((sport: RefereeSport) => (
          <li key={Math.random()}>
            {Object.values(SportType)[sport.sportType as any]} {Object.values(RefereeType)[sport.refereeType as any]}
          </li>
        ))}
      </ul>
    </Card>
  );
};
