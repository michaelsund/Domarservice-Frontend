import React from 'react';

interface IProps {
  text: string;
  secondary?: boolean;
  rounded?: boolean;
  filled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  shadow?: boolean;
  children?: any;
}

export const Button = ({
  text = 'Button',
  secondary = false,
  rounded = false,
  filled = true,
  fullWidth = false,
  disabled = false,
  shadow = false,
  onClick = undefined,
  children = null,
}: IProps) => {
  const hasValidChildren = React.isValidElement(children) ? true : false;
  return (
    <button
      className={`group relative flex justify-center py-2 px-4 border border-transparent shadow-sm
      ${shadow && 'shadow-slate-400 hover:shadow-slate-400 hover:shadow-md'}
      dark:hover:shadow-none dark:shadow-none uppercase text-sm font-medium ${
        rounded ? 'rounded-full' : 'rounded'
      }
      ${
        filled
          ? 'text-white bg-primary'
          : 'bg-transparent text-primary border-2 py-2 px-4 border border-primary hover:text-white'
      }
      ${secondary ? 'hover:bg-secondaryHover text-black bg-secondary' : 'hover:bg-primaryHover'}
      disabled:bg-slate-500 transition-all duration-200 ${hasValidChildren && 'pl-11'}
      ${fullWidth && 'w-full'}
      `}
      disabled={disabled}
      onClick={onClick}
    >
      {/* Icon */}
      <span className="absolute left-0 inset-y-0 flex items-center pl-3">{children}</span>
      {/* Button text */}
      {text}
    </button>
  );
};
