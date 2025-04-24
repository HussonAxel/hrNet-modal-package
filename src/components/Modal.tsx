import React, { createContext, useContext, useState } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';

interface ModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  variant?: 'primary' | 'secondary';
  isOpen?: boolean;
  onClose?: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  variant = 'primary',
  className = '',
  isOpen: controlledIsOpen,
  onClose,
  ...props
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen ?? internalIsOpen;

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  const modalClasses = `data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 ${className}`;

  if (!isOpen) return null;

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        openModal: () => setInternalIsOpen(true),
        closeModal: handleClose,
      }}
    >
      <div className={modalClasses} {...props}>
        {children}
      </div>
    </ModalContext.Provider>
  );
};
