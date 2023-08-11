import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import * as Styled from './ReceiveText.styles';

const ReceiveText: React.FC = () => {
  return (
    <div>
      <Styled.TextParagraph>받은 쪽지함</Styled.TextParagraph>
      <Styled.StyledBox>
        <Styled.InnerBox>
          <Styled.MessageBox>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h1>From. 수빈님</h1>
              <div style={{ display: 'flex' }}>
                <Styled.Ptag>
                  답장하기&nbsp;
                  <FaPaperPlane />
                </Styled.Ptag>
              </div>
            </div>
            <p>안녕하세요</p>
          </Styled.MessageBox>
          <Styled.MessageBox>쪽지</Styled.MessageBox>
          <Styled.MessageBox>쪽지</Styled.MessageBox>
          <Styled.MessageBox>쪽지</Styled.MessageBox>
          <Styled.MessageBox>쪽지</Styled.MessageBox>
        </Styled.InnerBox>
      </Styled.StyledBox>
    </div>
  );
};

export default ReceiveText;
