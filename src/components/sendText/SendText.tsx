import React from 'react';
import * as Styled from './SendText.styles';
import { Input } from 'antd';
import Button from '../common/button/Button';

interface SendTextProps {}

const { TextArea } = Input;

const SendText: React.FC<SendTextProps> = () => {
  const HandleToSend = () => {};

  return (
    <div>
      <Styled.TextParagraph>쪽지 보내기</Styled.TextParagraph>
      <Styled.ReceiveUser>
        <p>받는 사람:&nbsp;</p>
        <p>닉네임</p>
      </Styled.ReceiveUser>
      <TextArea rows={4} placeholder="쪽지 내용을 입력해주세요" />
      <Styled.SendBox>
        <Button onClick={HandleToSend}>보내기</Button>
      </Styled.SendBox>
    </div>
  );
};

export default SendText;
