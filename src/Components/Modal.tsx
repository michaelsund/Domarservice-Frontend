import React from 'react';
import { Button } from './Button';

interface IProps {
  open: boolean;
  sendClose: any;
  title: string;
  children?: any;
}

export const Modal = (props: IProps) => {
  return (
    <div
      className={`fixed text-gray-500 flex items-center justify-center overflow-auto z-50 bg-black bg-opacity-40 left-0 right-0 top-0 bottom-0 ${
        props.open ? 'visible' : 'invisible'
      }`}
    >
      <div
        className={`bg-white rounded-xl shadow-2xl p-6 sm:w-10/12 mx-10 ${
          props.open ? 'visible' : 'invisible'
        }`}
      >
        <div className="mb-5">{props.children}</div>
        <div className={`text-right space-x-5 mt-5 ${props.open ? 'visible' : 'invisible'}`}>
          <Button text="Klar" onClick={() => props.sendClose()} />
        </div>
      </div>
    </div>
  );
};
