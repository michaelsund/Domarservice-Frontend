import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { SportType } from '../Types/SportType';
import Soccer1 from '../Images/soccer1.jpg';
import Hockey1 from '../Images/hockey1.jpg';
import Innebandy1 from '../Images/innebandy1.jpg';
import { Link } from 'react-router-dom';
import { CountyType } from '../Types/CountyType';
import { RefereeType } from '../Types/RefereeType';
import { DomarserviceContext } from '../Context/DomarserviceContext';
import { Card } from './Card';
import { Role } from '../Types/Role';
import { BookingRequestByRefereeDto } from '../Types/Dto/BookingRequestByRefereeDto';
import { ExtendedCompanyEventDto } from '../Types/Dto/Requests/ExtendedCompanyEventDto';

interface IProps {
  companyEvent: ExtendedCompanyEventDto;
}

export const EventCard = (props: IProps) => {
  const { role, id }: any = useContext(DomarserviceContext);
  const [allreadyRequested, setAllreadyRequested] = useState<boolean>(false);
  const [allreadyAccepted, setAllreadyAccepted] = useState<boolean>(false);

  useEffect(() => {
    props.companyEvent.bookingRequestByReferees?.map((request: BookingRequestByRefereeDto) => {
      if (request.referee.id === id) {
        setAllreadyRequested(true);
        if (request.accepted) {
          setAllreadyAccepted(true);
        }
      }
    });
  }, [props]);

  let imageType = '';
  switch (props.companyEvent.sportType) {
    case Object.keys(SportType).indexOf('Ishockey'):
      imageType = Hockey1;
      break;
    case Object.keys(SportType).indexOf('Fotboll'):
      imageType = Soccer1;
      break;
    case Object.keys(SportType).indexOf('Innebandy'):
      imageType = Innebandy1;
      break;
    default:
      break;
  }
  return (
    <Card>
      <div className="absolute flex flex-col justify-center items-center left-0 top-40 bg-primary h-16 w-16">
        <p className="text-white font-normal text-xl">
          {moment(props.companyEvent.date).format('DD')}
        </p>
        <p className="text-white font-normal text-sm">
          {moment(props.companyEvent.date).format('MMM')}
        </p>
      </div>
      <img className="object-cover h-56 w-full rounded-t-md" src={imageType} alt="" />
      <div className="flex justify-center space-x-6 text-xs px-6 pt-4 pb-2">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 outline-primaryHover mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          {props.companyEvent.refereeTypesForEvent.length} domare
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 outline-primaryHover mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          {moment(props.companyEvent.date).format('DD MMM')}
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 outline-primaryHover mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {props.companyEvent.company.city}
        </div>
      </div>
      <div className="flex flex-col items-start px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {Object.values(SportType)[props.companyEvent.sportType]}
        </div>
        <p className="text-base">Förening: {props.companyEvent.company.name}</p>
        <p className="text-base">
          Id: {props.companyEvent.id} - {props.companyEvent.name}
        </p>
        <p>Plats: {props.companyEvent.location}</p>
        <b>Spelas i län: {Object.values(CountyType)[props.companyEvent.company.county as any]}</b>
        <div>
          Domare som behövs:{' '}
          {props.companyEvent.refereeTypesForEvent.map((val: any) => (
            <p key={Math.random()}>{Object.values(RefereeType)[val.refereeType]}</p>
          ))}
        </div>
        {(role === Role.RefereeUser || role === Role.Admin) &&
          (allreadyRequested ? (
            allreadyAccepted ? (
              <Link
                className="text-primary hover:text-primaryHover hover:no-underline text-xs underline mt-4"
                to={`/match/${props.companyEvent.id}`}
              >
                Du ska döma, gå till matchen.
              </Link>
            ) : (
              <Link
                className="text-primary hover:text-primaryHover hover:no-underline text-xs underline mt-4"
                to={`/match/${props.companyEvent.id}`}
              >
                Du är anmäld, gå till matchen.
              </Link>
            )
          ) : (
            <Link
              className="text-primary hover:text-primaryHover hover:no-underline text-xs underline mt-4"
              to={`/match/${props.companyEvent.id}`}
            >
              Jag vill döma.
            </Link>
          ))}
      </div>
    </Card>
  );
};
