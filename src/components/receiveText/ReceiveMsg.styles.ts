import { styled } from 'styled-components';

export const MsgParagraph = styled.p`
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
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 0;
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 25px;
  padding: 25px 25px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MsgBox = styled.div`
  width: 100%;
  height: 200px;
  padding: 20px;
  margin-bottom: 15px;
  border-radius: 20px;
  background-color: #f9f7f1;

  & > div {
    display: flex;
    justify-content: space-between;
  }
`;

export const ReplyBox = styled.div`
  margin-bottom: 30px;
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    color: #3382d9 !important;
  }
`;

export const MsgContent = styled.p`
  width: 410px;
  line-height: 1.5;
  margin-bottom: 15px;
  font-family: 'HakgyoansimWoojuR';
  font-size: 18px;
  font-weight: 900;
`;

export const MsgTimeBox = styled.div`
  float: right;
  font-size: 12px;
`;

export const LoaderWrap = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;
