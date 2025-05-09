import React from 'react';
import type { ReactNode } from 'react';
import { useModal } from './Modal.js';
import { Button } from './Button.js';

export interface ModalContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  children?: ReactNode;
  closeButtonText?: string | ReactNode;
  showCloseButton?: boolean;
  closeButtonPosition?: 'top-right' | 'bottom-right';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const ModalContent: React.FC<ModalContentProps> = ({
  title,
  description,
  children,
  closeButtonText = 'Close',
  showCloseButton = true,
  closeButtonPosition = 'bottom-right',
  size = 'md',
  className = '',
  ...props
}) => {
  const { closeModal } = useModal();

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-[95vw]',
  };

  const contentClasses = `
    relative grid w-[90%] gap-4 border bg-background p-6
    shadow-lg duration-200 sm:rounded-lg
    ${sizeClasses[size]}
  `
    .trim()
    .replace(/\s+/g, ' ');

  const closeButtonClasses = `
    absolute
    ${closeButtonPosition === 'top-right' ? 'top-4 right-4' : 'bottom-4 right-4'}
  `
    .trim()
    .replace(/\s+/g, ' ');

  return (
    <div
      className={`${contentClasses} ${className}`}
      role="document"
      {...props}
    >
      {showCloseButton && closeButtonPosition === 'top-right' && (
        <Button
          onClick={closeModal}
          buttonUtility="close"
          className={closeButtonClasses}
          aria-label="Close modal"
        >
          {closeButtonText}
        </Button>
      )}

      {title && (
        <h2 className="text-xl font-semibold" id="modal-title">
          {title}
        </h2>
      )}

      {description && (
        <p className="text-gray-600" id="modal-description">
          {description}
        </p>
      )}

      <div className="mt-4">{children}</div>

      {showCloseButton && closeButtonPosition === 'bottom-right' && (
        <Button
          onClick={closeModal}
          buttonUtility="close"
          className={closeButtonClasses}
          aria-label="Close modal"
        >
          {closeButtonText}
        </Button>
      )}
    </div>
  );
};
