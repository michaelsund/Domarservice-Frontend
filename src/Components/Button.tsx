import React from 'react';

interface IProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  children?: any;
}

export const Button = (props: IProps) => {
  const hasValidChildren = React.isValidElement(props.children) ? true : false;
  return (
    <button
      className={`group relative flex justify-center py-2 px-4 border border-transparent shadow-sm shadow-slate-400 hover:shadow-md
      hover:shadow-slate-400 dark:hover:shadow-none dark:shadow-none text-sm font-medium rounded-sm text-white bg-primary-500
      disabled:bg-slate-500 transition-all duration-200 ${ hasValidChildren && 'pl-11' }`}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {/* Icon */}
      <span className="absolute left-0 inset-y-0 flex items-center pl-3">{props.children}</span>
      {/* Button text */}
      {props.text}
    </button>
  );
};
