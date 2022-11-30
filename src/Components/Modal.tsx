import React from 'react';
import { Button } from './Button';

interface IProps {
  open: boolean;
  toggleOpen: () => void;
  title: string;
  children?: any;
}

export const Modal = (props: IProps) => {
  return props.open ? (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="min-w-26 border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-4 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-2xl font-semibold">{props.title}</h3>
            </div>
            <div className="relative p-6 flex-auto">
              {props.children}
            </div>
            <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
              <Button text="Stäng" onClick={() => props.toggleOpen()} />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  ) : <></>;
};
