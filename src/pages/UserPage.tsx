import { styled } from 'styled-components';
import Paging from '../components/pagination/Pagination';
import Modal from '../components/common/modal/Modal';
import { useState } from 'react';
import UserInfoUpdate from '../components/userPage/UserInfoUpdate';
import { useParams } from 'react-router-dom';
import { getUserId } from '../api/users';
import { useQuery } from 'react-query';
import { Button, Space } from 'antd';


const UserPage = () => {
  const params = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const { isLoading, isError, data } = useQuery("users", () => getUserId(params.id));
  if (isLoading) {
    return <p>로딩중입니다....!</p>;
  }

  if (isError) {
    return <p>오류가 발생하였습니다...!</p>;
  }

  return (
    <StyledBox>
      <StyledUpperBox>
        <StyledPhotoBox>
          <img src={data.imgUrl} alt="preview" />
        </StyledPhotoBox>
        <StyledUserInfoBox>
          <h2>{data.username}</h2>
          <p>{data.email}</p>
        </StyledUserInfoBox>
        <Button onClick={openModal}>수정하기</Button>
      </StyledUpperBox>
      <StyledBottomBox>
        <StyledCategoryBox>
          <p>내 부탁 보기</p>
          <p>|</p>
          <p>찜 보기</p>
        </StyledCategoryBox>
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} closeButton={true} size="medium">
          <UserInfoUpdate userInfo={data} closeModal={closeModal} />
        </Modal>
        <StyledListBox>리스트</StyledListBox>
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
  align-items: center;
  width: 450px;

  margin: 100px 0 50px;
`;
export const StyledPhotoBox = styled.div`
  width: 120px;
  height: 120px;

  img {
    width: 120px;
    height: 120px;
    margin: 0 auto;
    border-radius: 50%;
    object-fit: cover;
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
