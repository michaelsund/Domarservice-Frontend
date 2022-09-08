import React from 'react';

interface IProps {
  children?: any,
  className?: string
}

export const Card = (props: IProps) => {
  return (
    <div className={`relative bg-white rounded-md border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ${props.className}`}>
      {props.children}
    </div>
  );
};
