import React from 'react';

interface IProps {
  children?: any,
}

export const Pill = (props: IProps) => {
  return (
    <div className="w-auto inline-block m-1 p-2 bg-error rounded-full shadow-md dark:shadow-none">
      {props.children}
    </div>
  );
};
