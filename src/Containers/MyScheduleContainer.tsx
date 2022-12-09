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
import { Available } from '../Types/Available';
import { BookingRequestByCompanyDto } from '../Types/Dto/BookingRequestByCompanyDto';
import { RefereeMonthScheduleDto } from '../Types/Dto/RefereeMonthScheduleDto';

const MyScheduleContainer = () => {
  const { id }: any = useContext(DomarserviceContext);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedDate, setSelecedDate] = useState<string>();
  const [selectedFromTime, setSelectedFromTime] = useState<string>('10:00');
  const [selectedToTime, setSelectedToTime] = useState<string>('11:00');

  const { sendMonthScheduleRequest, data, success, error, loaded }: any =
    usePostRefereeScheduleMonth();
  // Contains more
  const {
    sendRefereeScheduleCreate,
    sendRefereeScheduleCreateMessage,
    sendRefereeScheduleCreateResetMessage,
  }: any = usePostRefereeScheduleCreate();
  const { sendRefereeScheduleDelete }: any = usePostRefereeScheduleDelete();
  // Moment starts January as 0
  const [currentMonth, setCurrentMonth] = useState<number>(moment().month() + 1);
  const [currentYear, setCurrentYear] = useState<number>(moment().year());

  useEffect(() => {
    // Use your own referee id here
    sendMonthScheduleRequest(id, currentYear, currentMonth);
  }, [currentMonth]);

  // Handle modal open/close triggers
  useEffect(() => {
    // We reset the message
    sendRefereeScheduleCreateResetMessage();
  }, [modalOpen]);

  const handleCreateNewAvailableDay = () => {
    sendRefereeScheduleCreate(
      moment(selectedDate + ' ' + selectedFromTime).utcOffset(+1),
      moment(selectedDate + ' ' + selectedToTime).utcOffset(+1),
    );
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
          <p>{sendRefereeScheduleCreateMessage}</p>
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
              <Button
                text="Föregående"
                onClick={() => currentMonth > 1 && setCurrentMonth(currentMonth - 1)}
              />
              <p className="text-xl capitalize">
                {currentYear}-{currentMonth}
              </p>
              <Button
                text="Nästa"
                onClick={() => currentMonth < 12 && setCurrentMonth(currentMonth + 1)}
              />
            </div>
            <div className="flex flex-row px-4 py-4 flex-wrap overflow-x-auto">
              {data.map((day: RefereeMonthScheduleDto) => (
                <Card key={day.day} className="p-2 h-40 w-full md:w-1/6 lg:w-1/10">
                  <div className="flex">
                    <Button
                      text="Lägg till"
                      small
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
                    <Button
                      text="Ta bort"
                      small
                      onClick={() => sendRefereeScheduleDelete(day.id)}
                    />
                  </div>
                  {currentYear}-{AddLeadingZeroLessThatTenAsString(currentMonth)}-
                  {AddLeadingZeroLessThatTenAsString(day.day)} {day.dayName}
                  {day.availableTimes.length > 0 &&
                    day.availableTimes.map((time: Available) => (
                      <p key={time.id}>
                        Tillgänglig {moment(time.from).format('HH:mm')} -{' '}
                        {moment(time.to).format('HH:mm')}
                        {day.bookingRequestByCompanys.length > 0 && <span>&#129309;</span>}
                      </p>
                    ))}
                  {/* {day.bookingRequestByCompanys.map(
                    (bookingRequest: BookingRequestByCompanyDto) =>
                      bookingRequest.accepted && (
                        <p key={bookingRequest.id}>
                          {bookingRequest.requestingCompany.name} Accepterad
                        </p>
                      ),
                  )} */}
                  {/* {day.bookingRequestByCompanys.map(
                    (bookingRequest: BookingRequestByCompanyDto) =>
                      !bookingRequest.accepted && (
                        <p key={bookingRequest.id}>
                          {bookingRequest.requestingCompany.name} Ej accepterad
                        </p>
                      ),
                  )} */}
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
