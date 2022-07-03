import React from 'react';

interface IProps {
  children?: any
}

export const Card = (props: IProps) => {
  return (
    <div className="p-6 max-w-md bg-white rounded-sm border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      {props.children}
    </div>
  );
};
