import React from 'react';
import XSVG from './x.js';
import { Button } from './Button.js';
import type { HTMLAttributes, ReactNode } from 'react';

export interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  variant?: 'primary' | 'secondary';
  buttonFunction?: () => void;
}

export const Dialog: React.FC<DialogProps> = ({
  children,
  variant = 'primary',
  className = '',
  buttonFunction = () => {},
  ...props //
}) => {
  const dialogClasses = `bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-[425px] ${className}`;

  return (
    <>
      <div className={dialogClasses} {...props}>
        {children}
        <Button onClick={buttonFunction} buttonUtility="Close">
          <XSVG />
        </Button>
      </div>
    </>
  );
};
