import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import * as Styled from './ReceiveMsg.styles';
import { IMsg } from '../types';
import { useQuery } from 'react-query';
import { getMsg } from '../../api/msg';

const ReceiveMsg: React.FC = () => {
  const { data } = useQuery<IMsg[]>('post', getMsg);

  const storedResponse = localStorage.getItem('response');
  const parsedResponse = storedResponse ? JSON.parse(storedResponse) : null;
  const detailData: IMsg[] | undefined = data?.filter(item => {
    return item.toUser === parsedResponse.user.email;
  });

  const sortedDetailData = detailData?.sort((a, b) => {
    const msgEarly = new Date(a.timeStamp).getTime();
    const msgLate = new Date(b.timeStamp).getTime();
    return msgLate - msgEarly;
  });

  return (
    <div>
      <Styled.MsgParagraph>받은 쪽지함</Styled.MsgParagraph>
      <Styled.StyledBox>
        {sortedDetailData &&
          sortedDetailData.map(item => {
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
                  <Styled.ReplyBox>
                    답장하기&nbsp;
                    <FaPaperPlane />
                  </Styled.ReplyBox>
                </div>
                <Styled.MsgContent>{item.content}</Styled.MsgContent>
                <Styled.MsgTimeBox>{formattedTimeStamp}</Styled.MsgTimeBox>
              </Styled.MsgBox>
            );
          })}
      </Styled.StyledBox>
    </div>
  );
};

export default ReceiveMsg;
