import React from 'react';
import * as Styled from './Modal.style';
import { createPortal } from 'react-dom';
import { AiOutlineCloseSquare } from 'react-icons/ai';

export const PORTAL_MODAL = 'portal-root';

interface ModalProps {
  children: React.ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({ children, isModalOpen, setIsModalOpen }) => {
  const HandleToClose = () => {
    setIsModalOpen(false);
  };

  return isModalOpen
    ? createPortal(
        <Styled.Outer>
          <Styled.Inner>
            <Styled.InnerBox>
              <div></div>
              <button onClick={HandleToClose}>
                <AiOutlineCloseSquare size={20} color="#ff004c" />
              </button>
            </Styled.InnerBox>
            {children}
          </Styled.Inner>
        </Styled.Outer>,
        document.getElementById(PORTAL_MODAL) as HTMLElement,
      )
    : null;
};

export default Modal;
