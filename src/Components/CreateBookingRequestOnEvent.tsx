import React, { useContext, useEffect, useState } from 'react';
import { axiosPrivate } from '../Helpers/Axios';
import { DomarserviceContext } from '../Context/DomarserviceContext';
import { BookingRequestByRefereeDto } from '../Types/Dto/BookingRequestByRefereeDto';
import { RefereeType } from '../Types/RefereeType';
import { SportType } from '../Types/SportType';
import { ResultWithMessage } from '../Types/ResultWithMessage';
import { Button } from './Button';

interface IProps {
  eventId?: number;
  existingBookingRequests?: BookingRequestByRefereeDto[];
  message?: string;
  refreshData(): any;
}

export const CreateBookingRequestOnEvent = (props: IProps) => {
  const { id }: any = useContext(DomarserviceContext);
  const [allreadyRequested, setAllreadyRequested] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [refereeType, setRefereeType] = useState<number>();

  useEffect(() => {
    props.existingBookingRequests?.map((request: BookingRequestByRefereeDto) => {
      if (request.referee.id === id) {
        setAllreadyRequested(true);
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
            refereeType: refereeType,
          },
          {
            signal: controller.signal,
          },
        );
        setError(false);
        setErrorMessage('');
        // Reload data from parent component.
        await props.refreshData();
      } catch (error: any) {
        setError(true);
        setErrorMessage(error.response?.data.message);
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
        setError(false);
        setErrorMessage('');
        // Reload data from parent component.
        await props.refreshData();
      } catch (error: any) {
        setError(true);
        setErrorMessage(error.response?.data.message);
      }
    }
  };

  return (
    <>
      {allreadyRequested ? (
        <>
          <b>Du har redan anmält intresse.</b>
          <Button text="Avanmäl" onClick={() => handleRevertBookingRequest()} />
        </>
      ) : (
        <div className="flex flex-col w-full items-center">
          <div className="flex flex-col mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Roll</label>
            <select
              className="text-gray-900 placeholder:italic placeholder:text-gray-900 block w-full border border-slate-300 rounded-sm py-2 p-3 shadow-sm outline-primaryHover focus:outline-1"
              placeholder="Välj din domarroll"
              onChange={(e) => setRefereeType(parseInt(e.target.value))}
            >
              {Object.values(RefereeType).map((value: string, i: number) => (
                <option key={i} value={Object.keys(RefereeType).indexOf(value)}>
                  {value}
                </option>
              ))}
            </select>
            <Button
              className="mt-4"
              text="Anmäl intresse att döma"
              onClick={() => handleSubmitBookingRequest()}
            />
          </div>
        </div>
      )}
      {error && <p>{errorMessage}</p>}
    </>
  );
};
