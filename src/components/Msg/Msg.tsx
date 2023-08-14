import React, { useState } from 'react';
import { FaPaperPlane, FaTrash } from 'react-icons/fa';
import * as Styled from './Msg.styles';
import { IMsg } from '../types';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteMsg, getMsg } from '../../api/msg';

const Msg: React.FC = () => {
  const { data } = useQuery<IMsg[]>('post', getMsg);
  const [selectedTab, setSelectedTab] = useState('received');

  const storedResponse = localStorage.getItem('response');
  const parsedResponse = storedResponse ? JSON.parse(storedResponse) : null;
  console.log(parsedResponse);
  const receivedData: IMsg[] | undefined = data?.filter(item => {
    return item.toUser === parsedResponse.user.email;
  });

  const sortedReceivedData = receivedData?.sort((a, b) => {
    const msgEarly = new Date(a.timeStamp).getTime();
    const msgLate = new Date(b.timeStamp).getTime();
    return msgLate - msgEarly;
  });

  const sentData: IMsg[] | undefined = data?.filter(item => {
    return item.fromUser === parsedResponse.user.email;
  });

  const sortedSentData = sentData?.sort((a, b) => {
    const msgEarly = new Date(a.timeStamp).getTime();
    const msgLate = new Date(b.timeStamp).getTime();
    return msgLate - msgEarly;
  });

  const receiveMsg = () => {
    setSelectedTab('received');
  };

  const sentMsg = () => {
    setSelectedTab('sent');
  };

  const handleToReply = (id: string) => {
    console.log(id);
  };

  const queryClient = useQueryClient();
  const deleteMsgMutation = useMutation(deleteMsg, {
    onSuccess: () => {
      queryClient.invalidateQueries('post');
    },
  });

  const handleToDelete = async (id: string) => {
    try {
      await deleteMsgMutation.mutateAsync(id);
    } catch (error) {
      console.error('쪽지 삭제 오류:', error);
    }
  };

  return (
    <div>
      <Styled.MsgParagraph>쪽지함</Styled.MsgParagraph>
      <Styled.StyledBox>
        <Styled.MsgButtons>
          <Styled.MsgButton onClick={receiveMsg} className={selectedTab === 'received' ? 'active' : ''}>
            받은 쪽지함
          </Styled.MsgButton>
          <Styled.MsgButton onClick={sentMsg} className={selectedTab === 'sent' ? 'active' : ''}>
            보낸 쪽지함
          </Styled.MsgButton>
        </Styled.MsgButtons>
        {selectedTab === 'received' &&
          sortedReceivedData &&
          sortedReceivedData.map(item => {
            const timeStampDate = new Date(item.timeStamp);

            const year = timeStampDate.getFullYear();
            const month = String(timeStampDate.getMonth() + 1).padStart(2, '0');
            const day = String(timeStampDate.getDate()).padStart(2, '0');
            const hours = String(timeStampDate.getHours()).padStart(2, '0');
            const minutes = String(timeStampDate.getMinutes()).padStart(2, '0');

            const formattedTimeStamp = `${year}-${month}-${day} ${hours}:${minutes}`;

            return (
              <Styled.MsgBox key={item.id}>
                <div>
                  <h1>From. {item.fromUser}님</h1>
                  <Styled.MsgOption>
                    <FaPaperPlane onClick={() => handleToReply(item.fromUser)} />
                    <FaTrash onClick={() => handleToDelete(item.id)} />
                  </Styled.MsgOption>
                </div>
                <Styled.MsgContent>{item.content}</Styled.MsgContent>
                <Styled.MsgTimeBox>{formattedTimeStamp}</Styled.MsgTimeBox>
              </Styled.MsgBox>
            );
          })}
        {selectedTab === 'received' && sortedReceivedData?.length === 0 && <Styled.MsgBox>받은 쪽지가 없습니다</Styled.MsgBox>}
        {selectedTab === 'sent' &&
          sortedSentData &&
          sortedSentData.map(item => {
            const timeStampDate = new Date(item.timeStamp);

            const year = timeStampDate.getFullYear();
            const month = String(timeStampDate.getMonth() + 1).padStart(2, '0');
            const day = String(timeStampDate.getDate()).padStart(2, '0');
            const hours = String(timeStampDate.getHours()).padStart(2, '0');
            const minutes = String(timeStampDate.getMinutes()).padStart(2, '0');

            const formattedTimeStamp = `${year}-${month}-${day} ${hours}:${minutes}`;

            return (
              <Styled.MsgBox key={item.id}>
                <div>
                  <h1>To. {item.toUser}님</h1>
                  <Styled.MsgOption>
                    <FaTrash onClick={() => handleToDelete(item.id)} />
                  </Styled.MsgOption>
                </div>
                <Styled.MsgContent>{item.content}</Styled.MsgContent>
                <Styled.MsgTimeBox>{formattedTimeStamp}</Styled.MsgTimeBox>
              </Styled.MsgBox>
            );
          })}
        {selectedTab === 'sent' && sortedSentData?.length === 0 && <Styled.MsgBox>보낸 쪽지가 없습니다</Styled.MsgBox>}
      </Styled.StyledBox>
    </div>
  );
};

export default Msg;
