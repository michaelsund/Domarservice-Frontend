import moment, { weekdays } from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from '../Components/Button';
import { Card } from '../Components/Card';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { Modal } from '../Components/Modal';
import { DomarserviceContext } from '../Context/DomarserviceContext';
import { AddLeadingZeroLessThatTenAsString } from '../Helpers/AddLeadingZeroLessThatTenAsString';
import usePostRefereeScheduleCreate from '../Hooks/usePostRefereeScheduleCreate';
import usePostRefereeScheduleDelete from '../Hooks/usePostRefereeScheduleDelete';
import usePostRefereeScheduleMonth from '../Hooks/usePostRefereeScheduleMonth';
import { RefereeMonthScheduleDto } from '../Types/Dto/RefereeMonthScheduleDto';

const MyScheduleContainer = () => {
  const { id }: any = useContext(DomarserviceContext);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedDate, setSelecedDate] = useState<string>();

  const { sendMonthScheduleRequest, data, success, error, loaded }: any =
    usePostRefereeScheduleMonth();
  // Contains more
  const {
    sendRefereeScheduleCreate,
    sendRefereeScheduleCreateError,
  }: any = usePostRefereeScheduleCreate();
  const { sendRefereeScheduleDelete }: any = usePostRefereeScheduleDelete();
  // Moment starts January as 0
  const [currentMonth, setCurrentMonth] = useState<number>(moment().month() + 1);
  const [currentYear, setCurrentYear] = useState<number>(moment().year());

  useEffect(() => {
    // Use your own referee id here
    sendMonthScheduleRequest(id, currentYear, currentMonth);
  }, [currentMonth]);

  const handleCreateNewAvailableDay = () => {
    sendRefereeScheduleCreate(selectedDate);
    // setModalOpen(false);
  };

  return (
    <>
      <Modal
        toggleOpen={() => setModalOpen(!modalOpen)}
        open={modalOpen}
        title="Lägg till dag i schema"
      >
        <>
          <p>Välj tid den {selectedDate}</p>
          <Button text="Lägg till" onClick={() => handleCreateNewAvailableDay()} />
          <p>{sendRefereeScheduleCreateError}</p>
        </>
      </Modal>
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
          <div className="flex flex-col items-center">
            <div className="flex flex-row">
              <Button text="Föregående" onClick={() => setCurrentMonth(currentMonth - 1)} />
              <p className="text-xl capitalize">
                {currentYear}-{currentMonth}
              </p>
              <Button text="Nästa" onClick={() => setCurrentMonth(currentMonth + 1)} />
            </div>
            <div className="flex flex-row px-4 py-4 flex-wrap">
              {data.map((day: RefereeMonthScheduleDto) => (
                <Card key={day.day} className="p-2 h-40 w-full md:w-1/6 lg:w-1/10">
                  <p>ScheduleId: {day.id}</p>
                  <Button
                    text="Lägg till"
                    onClick={() => {
                      // Add leading zeroes to single digit months and days.
                      setSelecedDate(
                        `${currentYear}-${AddLeadingZeroLessThatTenAsString(
                          currentMonth,
                        )}-${AddLeadingZeroLessThatTenAsString(day.day)}`,
                      );
                      setModalOpen(true);
                    }}
                  />
                  <Button text="Ta bort" onClick={() => sendRefereeScheduleDelete(day.id)} />
                  {currentYear}-{AddLeadingZeroLessThatTenAsString(currentMonth)}-
                  {AddLeadingZeroLessThatTenAsString(day.day)} {day.dayName}
                  {day.availableAt !== '0001-01-01T00:00:00' && (
                    <p>Tillgänglig {moment(day.availableAt).format('HH:mm')}</p>
                  )}
                  {day.bookingRequestByCompanys.length > 0 && ' Bokningsförfrågan finns'}
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyScheduleContainer;
