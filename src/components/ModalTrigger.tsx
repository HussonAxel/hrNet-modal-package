import React, { type MouseEvent } from 'react';
import type { ReactNode } from 'react';
import { useModal } from './Modal.js';

interface ModalTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}

export const ModalTrigger: React.FC<ModalTriggerProps> = ({
  children,
  asChild = false,
}) => {
  const { openModal } = useModal();

  if (
    asChild &&
    React.isValidElement<{ onClick?: (e: MouseEvent) => void }>(children)
  ) {
    return React.cloneElement(children, {
      onClick: (e: MouseEvent) => {
        children.props.onClick?.(e);
        openModal();
      },
    });
  }

  return (
    <button type="button" onClick={openModal}>
      {children}
    </button>
  );
};
