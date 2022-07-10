import React from 'react';

interface IProps {
  text: string;
  secondary?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  shadow?: boolean;
  children?: any;
}

export const Button = (props: IProps) => {
  const hasValidChildren = React.isValidElement(props.children) ? true : false;
  return (
    <button
      className={`group relative flex justify-center py-2 px-4 border border-transparent shadow-sm
      ${props.shadow && 'shadow-slate-400 hover:shadow-slate-400 hover:shadow-md'}
      dark:hover:shadow-none dark:shadow-none text-sm font-medium rounded-full
      ${props.secondary ? 'hover:bg-secondaryHover text-black bg-secondary' : 'hover:bg-primaryHover text-white bg-primary'}
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
