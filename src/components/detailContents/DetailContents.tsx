import React, { useState } from 'react';
import * as Styled from './DetailContents.style';
import { BsThreeDots } from 'react-icons/bs';
import { Dropdown, MenuProps, Select, Space, Typography } from 'antd';
import { FaHandRock, FaPaperPlane, FaRegBookmark } from 'react-icons/fa';
import Modal from '../common/modal/Modal';
import SendText from '../sendText/SendText';
import { IFormData } from '../Post/PostForm';
import { useMutation, useQueryClient } from 'react-query';
import { deletePost } from '../../api/post';

interface DetailContentsProps {
  data: IFormData | undefined;
}

const DetailContents: React.FC<DetailContentsProps> = ({ data }) => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const queryClient = useQueryClient();
  const deletePostMutate = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['post']);
    },
  });

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
    switch (key) {
      case 'delete':
        deletePost(data?.id);
        console.log(`삭제`);
        window.location.href = '/board';
      // 컨펌 모달
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
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
            <Styled.DetailTitleParagraph>{data?.title}</Styled.DetailTitleParagraph>
            <Styled.DetailContentParagraph>{data?.content}</Styled.DetailContentParagraph>
          </div>
          <img src={data?.img} alt="" />
        </Styled.DetailContentsBox>

        <Styled.DetailLabelBox>
          <label>{data?.price} 원</label>
          <label>{data?.date}</label>
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
        <Styled.DetailButton>
          찜하기 &nbsp;0&nbsp;
          <FaRegBookmark />
        </Styled.DetailButton>
      </Styled.DetailButtons>
    </div>
  );
};

export default DetailContents;
