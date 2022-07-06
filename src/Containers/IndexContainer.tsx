import React from 'react';
import { Button } from '../Components/Button';
import { Card } from '../Components/Card';
import { Hero } from '../Components/Hero';

const IndexContainer = () => {
  return (
    <div className="flex flex-col text-gray-900 dark:text-white">
      <Hero>
        <div className="pl-12">
          <a href="#" className="p-48">
            <h5 className="uppercase mb-2 text-5xl font-bold tracking-tight text-slate-50 dark:text-white">
              Hitta domare till nästa match!
            </h5>
            <h5 className="mb-2 text-lg font-bold tracking-tight text-slate-50 dark:text-white">
              Domarservice underlättar för föreningar och deras process vid matcher.
            </h5>
          </a>
          <div className="flex flex-row">
            <Button text="Registrera">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </Button>
            <Button text="Alla matcher">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </Button>
          </div>
        </div>
      </Hero>

      {/* <h1 className="text-3xl font-bold underline">Hello world!</h1> */}
      {/* <Card>
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
          chronological order.
        </p>
        <Button text="Read more">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </Button>
      </Card> */}
    </div>
  );
};

export default IndexContainer;
