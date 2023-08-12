import React, { useEffect, useState } from 'react';
import * as Styled from './SendMsg.styles';
import { Input } from 'antd';
import useInput from '../../hooks/useInput';
import { IMsg } from '../types';
import useLogInUser from '../../hooks/useLoginUser';
import { sendMsg } from '../../api/msg';

const { TextArea } = Input;

interface ISendTextProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postInfo: {
    postId: string | undefined;
    postUserName: string | undefined;
    postUserEmail: string | undefined;
  };
}

const SendText = ({ setIsModalOpen, postInfo }: ISendTextProps) => {
  const [msgTextValue, setMsgTextValue] = useInput('');
  const logInUser = useLogInUser();
  const [msgData, setMsgData] = useState<IMsg>({
    postId: '',
    toUser: '',
    fromUser: '',
    fromUsername: '',
    timeStamp: new Date().getTime(),
    content: '',
    id: '',
  });

  useEffect(() => {
    setMsgData(prev => ({ ...prev, postId: postInfo.postId, toUser: postInfo.postUserEmail, fromUser: logInUser.email, fromUsername: logInUser.username, content: msgTextValue }));
  }, [postInfo, logInUser, msgTextValue]);

  const HandleToSend = async () => {
    try {
      await sendMsg(msgData);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <Styled.TextParagraph>쪽지 보내기</Styled.TextParagraph>
      <Styled.StyledBox>
        <Styled.ReceiveUser>
          <p>받는 사람:&nbsp;</p>
          <p>{postInfo.postUserName}</p>
        </Styled.ReceiveUser>
        <TextArea value={msgTextValue} onChange={e => setMsgTextValue(e)} id="contentInput" placeholder="쪽지 내용을 입력해주세요" showCount maxLength={200} style={{ height: 200, resize: 'none' }} />
        <Styled.SendBox>
          <Styled.SendButton onClick={HandleToSend}>보내기</Styled.SendButton>
        </Styled.SendBox>
      </Styled.StyledBox>
    </div>
  );
};

export default SendText;
