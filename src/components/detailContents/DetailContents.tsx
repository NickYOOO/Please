import React, { useState } from 'react';
import * as Styled from './DetailContents.style';
import { BsThreeDots } from 'react-icons/bs';
import { Dropdown, MenuProps, Select, Space, Typography } from 'antd';
import { FaHandRock, FaPaperPlane, FaRegBookmark } from 'react-icons/fa';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getPost } from '../../api/post';
import { getLikes, patchLikes } from '../../api/likes';
import Modal from '../common/modal/Modal';
import SendText from '../sendText/SendText';

import type { Like } from '../types';
import { FaBookmark } from 'react-icons/fa';
import { FiBookmark } from 'react-icons/fi';

const DetailContents = () => {
  const queryClient = useQueryClient();
  const { isLoading, isError, data } = useQuery('post', getPost);
  // console.log(data);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const items: MenuProps['items'] = [
    {
      key: 'update',
      label: '수정하기',
    },
    {
      key: 'delete',
      label: '삭제하기',
    },
    {
      key: 'remote',
      label: '신고하기',
    },
  ];

  const onClick: MenuProps['onClick'] = ({ key }) => {
    console.log(`Click on item ${key}`);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  // 찜하기 기능

  const email = 'kitae@kitae.kitae';
  // auth.current.email을 뽑아서 활용하라.

  const { data: likes = [] } = useQuery<Like[], Error>('likes', getLikes);

  const likeMutation = useMutation(patchLikes, {
    onMutate: (like: Like) => {
      // Optimistic Update
      queryClient.setQueryData<Like[]>('likes', prevData => {
        if (!prevData) return [];
        return prevData.map(currentLike => (currentLike.id === like.id ? { ...currentLike, likes: like.likes + 1 } : currentLike));
      });
    },
  });

  const handleLike = (like: Like) => {
    likeMutation.mutate(like);
  };

  return (
    <div>
      <Styled.DetailContentsTopBox>
        <Styled.UserBox>
          <img src="https://cdn-icons-png.flaticon.com/512/95/95641.png" alt="" />
          닉네임
        </Styled.UserBox>
        <Select
          defaultValue="요청중"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: 'help', label: '요청중' },
            { value: 'ing', label: '해결중' },
            { value: 'done', label: '완료' },
          ]}
        />
      </Styled.DetailContentsTopBox>
      <Styled.DetailContentsLayout>
        <Styled.DetailBox>
          <p>경기도 용인시 기흥구 구갈동</p>
          <div>
            <p>작성: 3분 전</p>

            <Dropdown
              placement="bottomLeft"
              menu={{
                items,
                onClick,
                selectable: true,
              }}
            >
              <Typography.Link>
                <Space>
                  <BsThreeDots size={25} color="#0074dd" />
                </Space>
              </Typography.Link>
            </Dropdown>
          </div>
        </Styled.DetailBox>

        <Styled.DetailContentsBox>
          <div>
            <Styled.DetailTitleParagraph>바퀴벌레 잡아주실분</Styled.DetailTitleParagraph>
            <Styled.DetailContentParagraph>
              제 머리만한데 맨손으로 잡아주실분 계신가요 <br />
              옆에서 햄버거도 먹고 있어요
            </Styled.DetailContentParagraph>
          </div>
          <img src="https://i.pinimg.com/474x/34/81/5e/34815e190497759f259c6c45e69b0c46.jpg" alt="" />
        </Styled.DetailContentsBox>

        <Styled.DetailLabelBox>
          <label>40만원</label>
          <label>21:00 이후</label>
        </Styled.DetailLabelBox>
      </Styled.DetailContentsLayout>

      <Styled.DetailButtons>
        <Styled.DetailButton>
          해줄게요&nbsp;
          <FaHandRock />
        </Styled.DetailButton>
        <Styled.DetailButton onClick={openModal}>
          쪽지 보내기&nbsp;
          <FaPaperPlane />
        </Styled.DetailButton>
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
          <SendText />
        </Modal>
        {likes?.map(like => (
          <div key={like.id}>
            <Styled.DetailButton onClick={() => handleLike(like)}>
              찜하기&nbsp;{like.likes}&nbsp;
              {like.likes % 2 !== 0 ? <FiBookmark size="20" color="white" /> : <FaBookmark size="20" color="#black" />}
            </Styled.DetailButton>
          </div>
        ))}
      </Styled.DetailButtons>
    </div>
  );
};

export default DetailContents;
