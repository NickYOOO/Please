import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import assemble from '../assets/categoryImg/assemble.avif';
import bug from '../assets/categoryImg/bug.png';
import caring from '../assets/categoryImg/caring.jpeg';
import cleaning from '../assets/categoryImg/cleaning.jpeg';
import delivery from '../assets/categoryImg/delivery.jpeg';
import logo from '../assets/categoryImg/else.png';
import role from '../assets/categoryImg/role.jpeg';
import Logo from '../assets/img/logo.svg';
import Paging from '../components/pagination/Pagination';
import useLogInUser from '../hooks/useLoginUser';

const ITEMS_PER_PAGE = 3;

const UserPage = () => {
  const logInUser = useLogInUser();
  const navigation = useNavigate();
  const [page, setPage] = useState(1);

  console.log(page);

  const getMyPosts = async (email: string) => {
    try {
      const response = await axios.get(`http://localhost:3001/posts?email=${email}`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log('Fetch 데이터 오류', error);
      return [];
    }
  };

  const fetchPostsByPage = async (email: string, page: number) => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    // console.log(startIndex);
    try {
      const allPosts = await getMyPosts(email);

      console.log(allPosts);
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const slicedData = allPosts.slice(startIndex, endIndex);
      console.log(slicedData);
      return slicedData;
    } catch (error) {
      console.log('Fetch 데이터 오류', error);
      return [];
    }
  };
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber); // 페이지 상태 업데이트
  };

  const { isLoading, isError, data } = useQuery(['posts', logInUser.email, page], () => fetchPostsByPage(logInUser.email, page), { enabled: !!logInUser.email });

  const itemClickHandler = (id: string | undefined) => {
    navigation(`/detail/${id}`);
  };

  type ImageComponentProps = {
    category: string; // 카테고리의 타입을 여기에 지정
  };
  const ImageComponent: React.FC<ImageComponentProps> = ({ category }) => {
    let imageSrc: string;

    switch (category) {
      case '배달':
        imageSrc = delivery;
        break;
      case '청소':
        imageSrc = cleaning;
        break;
      case '조립':
        imageSrc = assemble;
        break;
      case '동행·돌봄':
        imageSrc = caring;
        break;
      case '역할 대행':
        imageSrc = role;
        break;
      case '벌레 퇴치':
        imageSrc = bug;
        break;
      case '기타':
        imageSrc = logo;
        break;
      default:
        imageSrc = logo;
    }

    return <StyledImg src={imageSrc} alt="이미지" />;
  };

  if (isLoading) {
    return <h1>로딩 중입니다..</h1>;
  }
  if (isError) {
    return <h1>오류가 발생했습니다..</h1>;
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

        <StyledListBox>
          {data?.map(function (post: any, postIndex: number) {
            return (
              <StyledListItemBox
                key={postIndex}
                onClick={() => {
                  itemClickHandler(post.id);
                }}
              >
                <ImageComponent category={post.category} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <StyledH2tag>{post.category || 'No data'}</StyledH2tag>
                  <StyledH2tag style={{ borderBottom: '1px solid black' }}>{post.price} 원</StyledH2tag>
                </div>
                <div style={{ width: '180px', height: '40px', margin: '15px 0 20px' }}>
                  <h1 style={{ fontFamily: 'Pretendard-Regular' }}>{post.title || 'No data'}</h1>
                </div>
                <StyledParagraph>{post.date || 'No data'}</StyledParagraph>
                <StyledParagraph>{post.position.address || 'No data'}</StyledParagraph>
              </StyledListItemBox>
            );
          })}
        </StyledListBox>
        <Paging page={page} setPage={setPage} />
      </StyledBottomBox>
    </StyledBox>
  );
};

export default UserPage;

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* margin-top: 40px; */
  min-height: calc(100vh - 186px);
`;
const StyledUpperBox = styled.div`
  display: flex;
  justify-content: space-around;

  width: 450px;

  margin: 60px 0 50px;
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
  height: 420px;

  padding: 25px;

  border: 5px solid #f9f7f1;
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

  display: flex;
  justify-content: space-between;

  /* background-color: #d5e6eb; */
`;
const StyledListItemBox = styled.div`
  width: 180px;
  height: 300px;

  cursor: pointer;
`;

const StyledImg = styled.img`
  width: 180px;
  height: 130px;
  margin-bottom: 15px;
  border-radius: 10px;
  object-fit: cover;
`;

const StyledH2tag = styled.h2`
  margin-bottom: 5px;
  /* font-size: '13px'; */
  font-family: 'Pretendard-Regular';
`;
const StyledParagraph = styled.p`
  margin-bottom: 5px;
  font-size: 13px;
  font-family: 'Pretendard-Regular';
`;
