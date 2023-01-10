import moment from 'moment';
import React, { useState } from 'react';
import { Button } from '../Components/Button';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import usePostNewCompanyEvent from '../Hooks/usePostNewCompanyEvent';
import { ISendNewEvent } from '../Types/ISendNewEvent';
import { RefereeType } from '../Types/RefereeType';
import { SportType } from '../Types/SportType';

const NewCompanyEventContainer = () => {
  const [data, setData] = useState<ISendNewEvent>({
    name: 'Testmatch',
    date: String(moment(new Date()).format('2023-01-13 08:00')),
    // TMP
    // date: String(moment(new Date()).format('YYYY-MM-DD 08:00')),
    durationHours: 1,
    durationMinutes: 30,
    location: 'Stora salen',
    sportType: 0,
    refereeTypesForEvent: [{ refereeType: 0 }],
  });
  const { sendNewEvent, success, error, loading }: any = usePostNewCompanyEvent();

  return (
    <div className="flex flex-col px-4 items-center text-gray-900 dark:text-white">
      <h5 className="text-xl">Ny match</h5>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-col mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Namn</label>
            <input
              className="text-gray-900 placeholder:italic placeholder:text-gray-900 block w-full border border-slate-300 rounded-sm py-2 p-3 shadow-sm outline-primaryHover focus:outline-1"
              placeholder="Träningsmatchen"
              value={data?.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              type="text"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Plats</label>
            <input
              className="text-gray-900 placeholder:italic placeholder:text-gray-900 block w-full border border-slate-300 rounded-sm py-2 p-3 shadow-sm outline-primaryHover focus:outline-1"
              placeholder="Stora hallen"
              value={data?.location}
              onChange={(e) => setData({ ...data, location: e.target.value })}
              type="text"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Välj datum</label>
            <input
              className="text-gray-900 placeholder:italic placeholder:text-gray-900 block w-full border border-slate-300 rounded-sm py-2 p-3 shadow-sm outline-primaryHover focus:outline-1"
              value={data?.date}
              onChange={(e) => setData({ ...data, date: e.target.value })}
              type="date"
              min={moment().format('YYYY-MM-DD')}
            />
          </div>
          {/* <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Välj starttid</label>
            <input
              className="text-gray-900 placeholder:italic placeholder:text-gray-900 block w-full border border-slate-300 rounded-sm py-2 p-3 shadow-sm outline-primaryHover focus:outline-1"
              value={data?.durationHours}
              onChange={(e) => setData({ ...data, durationHours: e.target.value })}
              type="time"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Välj sluttid</label>
            <input
              className="text-gray-900 placeholder:italic placeholder:text-gray-900 block w-full border border-slate-300 rounded-sm py-2 p-3 shadow-sm outline-primaryHover focus:outline-1"
              value={data?.endTime}
              onChange={(e) => setData({ ...data, endTime: e.target.value })}
              type="time"
            />
          </div> */}
          <Button text="Klar" onClick={() => sendNewEvent(data)} />
        </div>
      )}
    </div>
  );
};

export default NewCompanyEventContainer;
