import React from 'react';

export const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row bg-slate-200 p-8 lg:py-20 lg:px-32">
      <div className="bg-green-500 basis-1/2">
        <p>Domarservice</p>
        <p>Kontakt</p>
        <p>Telefon </p>
      </div>
      <div className="bg-red-600 basis-1/2">
        Mer
      </div>
    </div>
  );
};
