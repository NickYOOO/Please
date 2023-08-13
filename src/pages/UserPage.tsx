import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getBookmark, delBookmark } from '../api/bookmark';

import { styled } from 'styled-components';
import Logo from '../assets/img/logo.svg';
import Paging from '../components/pagination/Pagination';
import { FaBookmark } from 'react-icons/fa';

const UserPage: React.FC = () => {
  const queryClient = useQueryClient();
  const email = 'kitae@kitae.kitae';
  // json 서버 어스의 현재 로그인한 사람의 email

  const { data, isLoading, isError } = useQuery(['bookmark', email], getBookmark);

  // 추가할 때 사용하는 뮤테이션
  // const addBookmarkMutation = useMutation(addBookmark, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries('bookmark');
  //   },
  // });

  // const BookmarkRemoveHandler = (id: string) => {
  //   addBookmarkMutation.mutate({ email, postid });
  // };

  const delBookmarkMutation = useMutation(delBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries('bookmark');
    },
  });

  const BookmarkRemoveHandler = (id: string) => {
    delBookmarkMutation.mutate(id);
  };

  if (isLoading || !data) {
    return <div>로딩중</div>;
  }

  return (
    <StyledBox>
      <StyledUpperBox>
        <StyledPhotoBox>
          <img src={Logo} alt="logo" />
        </StyledPhotoBox>
        <StyledUserInfoBox>
          <h2>유저님</h2>
          <p>fnqhdtm@gamil.com</p>
        </StyledUserInfoBox>
      </StyledUpperBox>
      <StyledBottomBox>
        <StyledCategoryBox>
          <p>내 부탁 보기</p>
          <p>|</p>
          <p>찜 보기</p>
        </StyledCategoryBox>
        <StyledListBox>리스트</StyledListBox>
        {data.map(bookmark => {
          return (
            <div key={bookmark.id}>
              <span>{bookmark.postTitle}</span>
              <FaBookmark onClick={() => BookmarkRemoveHandler(bookmark.id)} />
            </div>
          );
        })}
        <Paging />
      </StyledBottomBox>
    </StyledBox>
  );
};

export default UserPage;

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;

  /* margin-top: 40px; */
  min-height: calc(100vh - 178px);
`;
const StyledUpperBox = styled.div`
  display: flex;
  justify-content: space-around;

  width: 450px;

  margin: 100px 0 50px;
`;
const StyledPhotoBox = styled.div`
  width: 120px;
  height: 120px;

  img {
    width: 120px;
    height: 120px;
    margin: 0 auto;
    border-radius: 50%;
    cursor: pointer;
  }
`;
const StyledUserInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 50%;

  padding: 20px;
  /* background-color: #d5e6eb; */

  & > h2 {
    margin-bottom: 15px;
  }
  & > p {
    color: #444444;

    font-size: 13px;
  }
`;
const StyledBottomBox = styled.div`
  width: 700px;
  height: 370px;

  padding: 25px;

  border: 5px solid #ffefab;
  border-radius: 30px;
  /* background-color: #d5e6eb; */
`;
const StyledCategoryBox = styled.div`
  display: flex;

  padding-bottom: 30px;

  & > p {
    color: #444444;

    margin-right: 20px;
    font-size: 13px;
  }
`;
const StyledListBox = styled.div`
  width: 100%;
  height: 250px;

  /* background-color: #d5e6eb; */
`;
