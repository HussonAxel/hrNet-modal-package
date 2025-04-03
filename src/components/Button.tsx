import React from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css'; // Example: Import CSS Modules or use styled-components

// Define the props interface
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary'; // Example custom prop
}

// Create the component
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  ...props //
}) => {
  const buttonClasses = `shared-button shared-button-${variant} ${className}`;

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

// Optional: Default export if preferred, but named exports are often clearer for libraries
// export default Button;
