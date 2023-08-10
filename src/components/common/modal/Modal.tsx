import React from 'react';
import * as Styled from './Modal.style';
import { createPortal } from 'react-dom';

export const PORTAL_MODAL = 'portal-root';

interface ModalProps {
  children: React.ReactNode;
  isModalOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ isModalOpen, children }) => {
  return isModalOpen
    ? createPortal(
        <Styled.Outer>
          <Styled.Inner>{children}</Styled.Inner>
        </Styled.Outer>,
        document.getElementById(PORTAL_MODAL) as HTMLElement,
      )
    : null;
};

export default Modal;
