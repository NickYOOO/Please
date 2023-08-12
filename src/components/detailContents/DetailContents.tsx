import { Dropdown, MenuProps, Select, Space, Typography } from 'antd';
import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { FaHandRock, FaPaperPlane, FaRegBookmark } from 'react-icons/fa';
import { deletePost } from '../../api/post';
import { IFormData } from '../Post/PostForm';
import Modal from '../common/modal/Modal';
import SendText from '../sendText/SendText';
import * as Styled from './DetailContents.style';

interface DetailContentsProps {
  data: IFormData | undefined;
}

const DetailContents: React.FC<DetailContentsProps> = ({ data }) => {
  let postStatus = '';

  if (data?.status === 'help') {
    postStatus = '부탁해요';
  } else {
    postStatus = '완료';
  }

  const handleChange = (value: string) => {
    switch (value) {
      case 'help':
        console.log('help');
        // post status help로 patch
        break;
      case 'done':
        console.log('done');
        // post status done으로 patch
        break;
    }
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
    switch (key) {
      case 'delete':
        deletePost(data?.id);
        window.location.href = '/board';
      // 컨펌 모달
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <Styled.ContentsBox>
      <Styled.DetailContentsTopBox>
        <Styled.UserBox>
          <img src="https://cdn-icons-png.flaticon.com/512/95/95641.png" alt="" />
          닉네임
        </Styled.UserBox>
        <Select
          defaultValue={postStatus}
          style={{ width: 100 }}
          onChange={handleChange}
          options={[
            { value: 'help', label: '부탁해요' },
            { value: 'done', label: '완료' },
          ]}
        />
      </Styled.DetailContentsTopBox>
      <Styled.DetailContentsLayout>
        <Styled.DetailBox>
          <p>{data?.position.address}</p>
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
            <Styled.DetailLabelBox>
              <label>{data?.price} 원</label>
              <label>
                {data?.date} {data?.time}
              </label>
            </Styled.DetailLabelBox>
          </div>
          <img src={data?.img} alt="" />
        </Styled.DetailContentsBox>
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
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} closeButton={true} size="medium">
          <SendText />
        </Modal>
        <Styled.DetailButton>
          찜하기 &nbsp;0&nbsp;
          <FaRegBookmark />
        </Styled.DetailButton>
      </Styled.DetailButtons>
    </Styled.ContentsBox>
  );
};

export default DetailContents;
