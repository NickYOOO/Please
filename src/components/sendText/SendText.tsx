import React from 'react';
import * as Styled from './SendText.styles';
import { Input } from 'antd';
import Button from '../common/button/Button';

interface SendTextProps { }

const { TextArea } = Input;

const SendText: React.FC<SendTextProps> = () => {
  const HandleToSend = () => { };

  return (
    <div>
      <Styled.TextParagraph>쪽지 보내기</Styled.TextParagraph>
      <Styled.StyledBox>
        <Styled.ReceiveUser>
          <p>받는 사람:&nbsp;</p>
          <p>닉네임</p>
        </Styled.ReceiveUser>
        <TextArea id="contentInput" placeholder="쪽지 내용을 입력해주세요" showCount maxLength={200} style={{ height: 200, resize: 'none' }} />
        <Styled.SendBox>
          <Button onClick={HandleToSend}>보내기</Button>
        </Styled.SendBox>
      </Styled.StyledBox>
    </div>
  );
};

export default SendText;
