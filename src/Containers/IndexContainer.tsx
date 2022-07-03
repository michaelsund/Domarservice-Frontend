import React from 'react';
import { Button } from '../Components/Button';
import { Card } from '../Components/Card';

const IndexContainer = () => {
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Card>
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
      </Card>
    </div>
  );
};

export default IndexContainer;
