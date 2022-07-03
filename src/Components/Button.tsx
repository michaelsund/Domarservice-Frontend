import React from 'react';

interface IProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
  children: any;
}

export const Button = (props: IProps) => {
  return (
    <button disabled={props.disabled} onClick={props.onClick}>
      {/* Icon */}
      <span className='absolute left-0 inset-y-0 flex items-center pl-3'>{props.children}</span>
      {props.text}
    </button>
  );
};
