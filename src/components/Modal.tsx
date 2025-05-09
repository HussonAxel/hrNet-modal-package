import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import ReactDOM from 'react-dom';
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
  isOpen?: boolean;
  onClose?: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  className = '',
  isOpen: controlledIsOpen,
  onClose,
  ...props
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = controlledIsOpen ?? internalIsOpen;

  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const node = document.createElement('div');
      node.setAttribute('id', 'modal-portal-root');
      document.body.appendChild(node);
      setPortalNode(node);

      return () => {
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
        setPortalNode(null);
      };
    }
  }, []);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  const modalClasses = `
    data-[state=open]:animate-in data-[state=closed]:animate-out
    data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
    fixed inset-0 z-50 bg-black/50
    flex items-center justify-center
    ${className}
  `
    .trim()
    .replace(/\s+/g, ' ');

  if (!isOpen || !portalNode) {
    return null;
  }

  const contextValue = {
    isOpen,
    openModal: () => setInternalIsOpen(true),
    closeModal: handleClose,
  };

  return ReactDOM.createPortal(
    <ModalContext.Provider value={contextValue}>
      <div className={modalClasses} {...props}>
        {children}
      </div>
    </ModalContext.Provider>,
    portalNode,
  );
};
