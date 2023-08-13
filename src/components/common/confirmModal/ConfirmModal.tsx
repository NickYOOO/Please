import React from 'react';
import Modal from '../modal/Modal';
import * as Styled from './ConfirmModal.styles';

export interface ConfirmModalProps {
  children: React.ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  confirmToSend: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ children, isModalOpen, setIsModalOpen, confirmToSend }) => {
  const handleToConfirm = () => {
    confirmToSend();
    setIsModalOpen(false);
  };

  const handleToCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} closeButton={false} size="small">
      <p>{children}</p>
      <Styled.ConfirmModalButtons>
        <Styled.ConfirmButton onClick={handleToConfirm}>확인</Styled.ConfirmButton>
        <Styled.CancelButton onClick={handleToCancel}>취소</Styled.CancelButton>
      </Styled.ConfirmModalButtons>
    </Modal>
  );
};

export default ConfirmModal;
