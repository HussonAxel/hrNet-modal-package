import React from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  variant?: 'primary' | 'secondary';
}

export const Modal: React.FC<ModalProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props //
}) => {
  const modalClasses = `data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50`;

  return (
    <>
      <div className={modalClasses} {...props}>
        {children}
      </div>
    </>
  );
};
