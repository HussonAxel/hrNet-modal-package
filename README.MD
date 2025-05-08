# HRNet Modal Package

A simple and flexible modal component for React applications.

## Installation

```bash
npm install hrnet-modal-package
# or
yarn add hrnet-modal-package
```

## Usage

```tsx
import {
  Modal,
  ModalTrigger,
  ModalContent,
  useModal,
} from 'hrnet-modal-package';

// Basic usage
function MyComponent() {
  return (
    <Modal>
      <ModalTrigger>
        <button>Open Modal</button>
      </ModalTrigger>
      <ModalContent>
        <h2>Modal Title</h2>
        <p>Your modal content goes here</p>
      </ModalContent>
    </Modal>
  );
}

// Controlled usage
function ControlledModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <ModalContent>
        <h2>Controlled Modal</h2>
        <p>This modal is controlled by the parent component</p>
      </ModalContent>
    </Modal>
  );
}

// Using the useModal hook
function CustomModal() {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div>
      <button onClick={openModal}>Open</button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalContent>
          <h2>Custom Modal</h2>
          <p>Using the useModal hook for more control</p>
        </ModalContent>
      </Modal>
    </div>
  );
}
```

## Props

### Modal

- `isOpen` (optional): boolean - Controls the modal's visibility
- `onClose` (optional): () => void - Callback when modal is closed
- `variant` (optional): 'primary' | 'secondary' - Modal style variant
- `className` (optional): string - Additional CSS classes

### ModalContent

- `className` (optional): string - Additional CSS classes for the content container

### ModalTrigger

- `children`: ReactNode - The element that triggers the modal
