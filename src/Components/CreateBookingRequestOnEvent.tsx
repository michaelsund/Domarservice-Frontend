import React, { useContext, useEffect, useState } from 'react';
import { axiosPrivate } from '../Helpers/Axios';
import { DomarserviceContext } from '../Context/DomarserviceContext';
import { BookingRequestByRefereeDto } from '../Types/Dto/BookingRequestByRefereeDto';
import { RefereeType } from '../Types/RefereeType';
import { SportType } from '../Types/SportType';
import { Button } from './Button';

interface IProps {
  eventId?: number;
  existingBookingRequests?: BookingRequestByRefereeDto[];
  message?: string;
  refereeType?: RefereeType;
  sportType?: SportType;
  refreshData(): any;
}

export const CreateBookingRequestOnEvent = (props: IProps) => {
  const { id }: any = useContext(DomarserviceContext);
  const [allreadyRequested, setAllreadyRequested] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    props.existingBookingRequests?.map((request: BookingRequestByRefereeDto) => {
      if (request.referee.id === id) {
        setAllreadyRequested(true);
        console.log('found you!');
      }
    });
  }, []);

  const handleSubmitBookingRequest = async () => {
    if (props.eventId) {
      const controller = new AbortController();
      try {
        await axiosPrivate.post(
          `${
            process.env.NODE_ENV === 'production' ? '/api' : ''
          }/bookingrequest/request-by-referee`,
          {
            companyEventId: props.eventId,
            message: props.message,
            refereeType: Object.values(RefereeType)[props.refereeType as any],
            sportType: Object.values(RefereeType)[props.sportType as any],
          },
          {
            signal: controller.signal,
          },
        );
        // Reload data from parent component.
        await props.refreshData();
      } catch (error: any) {
        console.log(`Response status: ${error.response?.status}`);
        setError(error.response?.data.message);
      }
    }
  };

  const handleRevertBookingRequest = async () => {
    if (props.eventId) {
      const controller = new AbortController();
      try {
        await axiosPrivate.get(
          `${
            process.env.NODE_ENV === 'production' ? '/api' : ''
          }/bookingrequest/revoke-request-by-referee/${props.eventId}`,
          {
            signal: controller.signal,
          },
        );
        // Reload data from parent component.
        await props.refreshData();
      } catch (error: any) {
        console.log(`Response status: ${error.response?.status}`);
        setError(error.response?.data.message);
      }
    }
  };

  return allreadyRequested ? (
    <>
      <b>Du har redan anmält intresse.</b>
      <Button text="Avanmäl" onClick={() => handleRevertBookingRequest()} />
    </>
  ) : (
    <Button text="Anmäl intresse att döma" onClick={() => handleSubmitBookingRequest()} />
  );
};
