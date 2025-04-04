import React from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

export interface ModalProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}

export const Modal: React.FC<ModalProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props //
}) => {
  const modalClasses = `shared-modal shared-modal-${variant} ${className}`;

  return (
    <>
      <button className={modalClasses} {...props}>
        {children}
      </button>
      <div className={className}></div>
      <div>{children}</div>
    </>
  );
};
