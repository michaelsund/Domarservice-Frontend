import React from 'react';

interface IProps {
  children?: any;
  className?: string;
}

export const Hero = (props: IProps) => {
  return (
    <div
      className={`bg-hero-pattern bg-no-repeat bg-auto bg-center
      w-full h-96 p-6 bg-white rounded-sm border border-gray-200 shadow-md
      dark:bg-gray-800 dark:border-gray-700 ${props.className}`}
    >
      {props.children}
    </div>
  );
};
