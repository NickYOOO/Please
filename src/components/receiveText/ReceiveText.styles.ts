import { styled } from 'styled-components';

export const TextParagraph = styled.p`
  position: absolute;
  z-index: 1; // 추가한 코드
  top: 50px; // 추가한 코드
  left: 0; // 추가한 코드
  width: 100%; // 추가한 코드

  text-align: center;
  font-size: 20px;
  font-weight: 600;
`;
export const StyledBox = styled.div`
  width: 100%;
  min-height: 0;

  position: absolute; // 추가한 코드
  top: 100px; // 수정한 코드 (제목 크기에 맞게 조절하세요)
  left: 0; // 추가한 코드
  right: 0; // 추가한 코드
  bottom: 25px; // 추가한 코드

  padding: 25px 25px;
  /* background-color: lightblue; */
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
export const InnerBox = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
`;
export const MessageBox = styled.div`
  width: 100%;
  height: 200px;
  padding: 20px;
  margin-bottom: 15px;

  border-radius: 20px;
  background-color: #f9f7f1;

  & > p {
    width: 410px;
    line-height: 1.5; /* Adjust line height for paragraph spacing */
    margin-bottom: 15px; /* Add margin between paragraphs */

    font-family: 'HakgyoansimWoojuR';
    font-size: 18px;
    font-weight: 800;
  }
`;

export const Ptag = styled.p`
  margin-bottom: 30px;

  cursor: pointer;

  transition: 0.4s;
  &:hover {
    color: #3382d9 !important;
  }
`;
