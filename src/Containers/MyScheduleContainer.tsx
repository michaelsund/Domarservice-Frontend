import moment, { weekdays } from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { Card } from '../Components/Card';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { DomarserviceContext } from '../Context/DomarserviceContext';
import useAxiosPrivate from '../Hooks/UseAxiosPrivate';
import usePostRefereeScheduleMonth from '../Hooks/usePostRefereeScheduleMonth';
import { RefereeMonthScheduleDto } from '../Types/Dto/RefereeMonthScheduleDto';
import { ISendRefereeScheduleMonthRequest } from '../Types/ISendRefereeScheduleMonthRequest';

const MyScheduleContainer = () => {
  const axiosPrivate = useAxiosPrivate();
  const { id }: any = useContext(DomarserviceContext);
  const { sendMonthScheduleRequest, data, success, error, loaded }: any =
    usePostRefereeScheduleMonth();
  const currentMonth = moment().month();
  const currentYear = moment().year();

  useEffect(() => {
    // Use your own referee id here
    sendMonthScheduleRequest(id, currentYear, currentMonth);
  }, []);

  return (
    <div className="flex flex-col px-4 items-center text-gray-900 dark:text-white">
      {!loaded ? (
        <LoadingSpinner />
      ) : error.length > 0 ? (
        <div>
          <h1>Tusan! något gick fel.</h1>
          <p>{error}</p>
        </div>
      ) : (
        // TODO: check if data is empty
        <div className="flex flex-row px-4 py-4 flex-wrap">
          {data.map((day: RefereeMonthScheduleDto) => (
            <Card key={day.day} className="p-2 h-40 w-full md:w-1/6 lg:w-1/10">
              {day.day} - {day.dayName}
              {day.availableAt !== null && <p>Tillgänglig {moment(day.availableAt).format('hh:mm')}</p>}
              {day.bookingRequestByCompanys !== null && ' Bokningsförfrågan finns'}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyScheduleContainer;
