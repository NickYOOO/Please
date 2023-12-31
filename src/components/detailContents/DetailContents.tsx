import { Dropdown, MenuProps, Select, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deletePost, updatePost } from '../../api/post';
import { getLikes, patchLikes } from '../../api/likes';
import { IFormData } from '../Post/PostForm';
import type { Like } from '../types';
import Modal from '../common/modal/Modal';
import SendText from '../sendMsg/SendMsg';
import * as Styled from './DetailContents.style';
import useLogInUser from '../../hooks/useLoginUser';
import { sendMsg } from '../../api/msg';
import { IMsg } from '../types';
import ConfirmModal from '../common/confirmModal/ConfirmModal';
import { FaBookmark, FaHandRock, FaPaperPlane } from 'react-icons/fa';
import { FiBookmark } from 'react-icons/fi';
import { BsThreeDots } from 'react-icons/bs';
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';
import { addBookmark, getBookmark } from '../../api/bookmark';

interface DetailContentsProps {
  data: IFormData | undefined;
}

const DetailContents: React.FC<DetailContentsProps> = ({ data }) => {
  const logInUser = useLogInUser();
  const params = useParams();
  const [itemList, setItemList] = useState<any[] | undefined>([]);
  const [bookmark, setBookmark] = useState(false);
  const queryClient = useQueryClient();
  let postStatus = '';
  const time = data?.timeStamp || 0;

  const detailDate = (timestamp: number) => {
    const milliSeconds = new Date().getTime() - timestamp;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };
  const nowDate = detailDate(time);

  const { data: bookmarkData, error: bookmarkError } = useQuery('bookmarks', () => {
    if (logInUser !== null) {
      return getBookmark(logInUser.email);
    }
  });

  useEffect(() => {
    if (logInUser !== null) {
      const isAuthor = logInUser.email === data?.email;
      const items: MenuProps['items'] = isAuthor
        ? [
            {
              key: 'update',
              label: '수정하기',
            },
            {
              key: 'delete',
              label: '삭제하기',
            },
          ]
        : [
            {
              key: 'report',
              label: '신고하기',
            },
          ];
      setItemList(items);

      const fetchBookmarkData = async () => {
        try {
          // const bookmarks = await getBookmark(logInUser.email);
        } catch (error) {
          console.error('Error fetching bookmark data:', error);
        }
      };
      fetchBookmarkData();
    }
  }, [logInUser]);

  const isPostBookmarked = bookmarkData && bookmarkData?.some((bookmark: any) => bookmark.postId === data?.id);

  if (data?.status === 'help') {
    postStatus = '부탁해요';
  } else {
    postStatus = '완료';
  }

  const handleChange = (value: string) => {
    switch (value) {
      case 'help':
        break;
      case 'done':
        break;
    }
  };

  const { id } = params;

  const onClick: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'update':
        updatePost(data!);
        window.location.href = `/update/${id}`;
        break;

      case 'delete':
        deletePost(data?.id);
        window.location.href = '/board';
        break;
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const postsMutation = useMutation(addBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries('postsData');
    },
  });

  const bookmarkUser = useLogInUser();
  const bookmarkEmail = bookmarkUser?.email;
  const bookmarkPostId = data?.id;

  const handleBookmark = async (id: string | undefined) => {
    try {
      if (isPostBookmarked) {
      } else {
        setBookmark(true);
        await postsMutation.mutateAsync({
          email: bookmarkEmail,
          postId: bookmarkPostId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const MsgProps = {
    postId: data?.id,
    postUserName: data?.username,
    postUserEmail: data?.email,
  };

  const HandleToHelp = () => {
    setIsConfirmModalOpen(true);
  };

  const HandleToSend = async (id: string | undefined) => {
    try {
      if (logInUser !== null) {
        const msgData: IMsg = {
          postId: id,
          toUser: data?.email,
          fromUser: logInUser.email,
          fromUsername: logInUser.username,
          timeStamp: new Date().getTime(),
          content: '도움 요청하신 글 제가 해줄게요!✋',
          id: '',
        };
        await sendMsg(msgData);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Styled.ContentsBox>
      <Styled.DetailContentsTopBox>
        <Styled.UserBox>
          <img src={data?.userProfileImg} alt="" />
          {data?.username}
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
          <p>{data?.position.addr}</p>
          <div>
            <p>{nowDate}</p>
            <Dropdown
              placement="bottomLeft"
              menu={{
                items: itemList,
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
        <Styled.DetailButton onClick={HandleToHelp}>
          해줄게요&nbsp;
          <FaHandRock />
        </Styled.DetailButton>
        <ConfirmModal
          isModalOpen={isConfirmModalOpen}
          setIsModalOpen={setIsConfirmModalOpen}
          confirmToSend={() => {
            HandleToSend(data?.id);
          }}
        >
          {data?.username}님을 도와주시겠습니까?
        </ConfirmModal>
        <Styled.DetailButton onClick={openModal}>
          쪽지 보내기&nbsp;
          <FaPaperPlane />
        </Styled.DetailButton>
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} closeButton={true} size="medium">
          <SendText postInfo={MsgProps} setIsModalOpen={setIsModalOpen} />
        </Modal>
        <Styled.DetailButton onClick={() => handleBookmark(id)}>
          {isPostBookmarked ? '찜하기 해제' : '찜하기'}&nbsp;&nbsp;
          {bookmark ? <FaBookmark size="20" color="#black" /> : <FiBookmark size="20" color="white" />}
        </Styled.DetailButton>
      </Styled.DetailButtons>
    </Styled.ContentsBox>
  );
};

export default DetailContents;
