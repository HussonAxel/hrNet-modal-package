import React from 'react';
import type { ReactNode } from 'react';
import { useModal } from './Modal.js';
import { Button } from './Button.js';

interface ModalContentProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  closeButtonText?: string;
}

export const ModalContent: React.FC<ModalContentProps> = ({
  title,
  description,
  children,
  closeButtonText = 'Close',
}) => {
  const { closeModal } = useModal();

  return (
    <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
      {title && <h2 className="text-xl font-semibold">{title}</h2>}
      {description && <p className="text-gray-600">{description}</p>}
      {children}
      <Button onClick={closeModal} buttonUtility="close">
        {closeButtonText}
      </Button>
    </div>
  );
};
