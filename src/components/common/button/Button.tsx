import React from 'react';
import * as Styled from './Button.style';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return <Styled.StButton>{children}</Styled.StButton>;
};

export default Button;
