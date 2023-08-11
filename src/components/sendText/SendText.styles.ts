import { styled } from 'styled-components';

export const TextParagraph = styled.p`
  position: absolute;
  z-index: 1;
  top: 50px;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
`;

export const StyledBox = styled.div`
  width: 100%;
  min-height: 0;

  position: absolute;
  top: 90px;
  left: 0;
  right: 0;
  bottom: 25px;

  padding: 25px 25px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }

  & > .contentInput {
    font-size: 20px;
  }
`;

export const ReceiveUser = styled.div`
  display: flex;
  margin: 20px 0 30px 0;
`;

export const SendBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 50px;
`;
