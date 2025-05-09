import React from 'react';
import type { ReactNode } from 'react';
import { useModal } from './Modal.js';
import { Button } from './Button.js';

interface ModalContentProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  closeButtonText?: string | ReactNode;
}

export const ModalContent: React.FC<ModalContentProps> = ({
  title,
  description,
  children,
  closeButtonText = 'Close',
}) => {
  const { closeModal } = useModal();

  const contentClasses = `
    relative grid w-[90%] max-w-lg gap-4 border bg-background p-6
    shadow-lg duration-200 sm:rounded-lg
  `
    .trim()
    .replace(/\s+/g, ' ');

  return (
    <div className={contentClasses}>
      {title && <h2 className="text-xl font-semibold">{title}</h2>}
      {description && <p className="text-gray-600">{description}</p>}
      {children}
      <Button onClick={closeModal} buttonUtility="close">
        {closeButtonText}
      </Button>
    </div>
  );
};
