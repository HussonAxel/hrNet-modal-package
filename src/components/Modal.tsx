import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import type { HTMLAttributes, ReactNode, KeyboardEvent } from 'react';

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
  /** The content to be rendered inside the modal */
  children?: ReactNode;
  /** Controls whether the modal is open (controlled mode) */
  isOpen?: boolean;
  /** Callback fired when the modal is closed */
  onClose?: () => void;
  /** Whether to close the modal when clicking outside */
  closeOnOutsideClick?: boolean;
  /** Whether to close the modal when pressing the escape key */
  closeOnEscape?: boolean;
  /** Custom animation duration in milliseconds */
  animationDuration?: number;
  /** Custom animation timing function */
  animationTiming?: string;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  className = '',
  isOpen: controlledIsOpen,
  onClose,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  animationDuration = 200,
  animationTiming = 'ease-in-out',
  ...props
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen ?? internalIsOpen;

  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      setInternalIsOpen(false);
    }
  }, [onClose]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (closeOnEscape && event.key === 'Escape') {
        handleClose();
      }
    },
    [closeOnEscape, handleClose],
  );

  const handleBackdropClick = useCallback(
    (event: React.MouseEvent) => {
      if (closeOnOutsideClick && event.target === event.currentTarget) {
        handleClose();
      }
    },
    [closeOnOutsideClick, handleClose],
  );

  // Focus trap
  useEffect(() => {
    if (isOpen) {
      const previousActiveElement = document.activeElement as HTMLElement;
      const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstFocusableElement = focusableElements[0] as HTMLElement;
      const lastFocusableElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusableElement) {
              lastFocusableElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastFocusableElement) {
              firstFocusableElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      document.addEventListener('keydown', handleTabKey as any);
      firstFocusableElement?.focus();

      return () => {
        document.removeEventListener('keydown', handleTabKey as any);
        previousActiveElement?.focus();
      };
    }
  }, [isOpen]);

  const modalClasses = `
    data-[state=open]:animate-in data-[state=closed]:animate-out
    data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
    fixed inset-0 z-50 bg-black/50
    flex items-center justify-center
    ${className}
  `
    .trim()
    .replace(/\s+/g, ' ');

  if (!isOpen) return null;

  const contextValue = {
    isOpen,
    openModal: () => setInternalIsOpen(true),
    closeModal: handleClose,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      <div
        role="dialog"
        aria-modal="true"
        className={modalClasses}
        onKeyDown={handleKeyDown}
        onClick={handleBackdropClick}
        style={
          {
            '--modal-animation-duration': `${animationDuration}ms`,
            '--modal-animation-timing': animationTiming,
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
      </div>
    </ModalContext.Provider>
  );
};
