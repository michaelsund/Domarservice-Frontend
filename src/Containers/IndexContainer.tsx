import React from 'react';
import { Button } from '../Components/Button';
import { Card } from '../Components/Card';
import { Hero } from '../Components/Hero';

const IndexContainer = () => {
  return (
    <div className="flex flex-col text-gray-900 dark:text-white">
      <Hero className="flex content-center items-center">
        <div className="grid w-full grid-cols-1 gap-4 place-items-center h-56">
          <a href="#" className="">
            <h5 className="uppercase mb-2 text-5xl font-bold tracking-tight text-slate-50 dark:text-white">
              Hitta domare till nästa match!
            </h5>
            <h5 className="mb-2 text-lg font-bold tracking-tight text-slate-50 dark:text-white">
              Domarservice underlättar för föreningar och deras process vid matcher.
            </h5>
          </a>
          <div className="flex flex-row space-x-2">
            <Button text="Registrera" secondary />
            <Button text="Alla matcher" secondary />
          </div>
        </div>
      </Hero>
    </div>
  );
};

export default IndexContainer;
