import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { useInfiniteQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import assemble from '../assets/categoryImg/assemble.avif';
import bug from '../assets/categoryImg/bug.png';
import caring from '../assets/categoryImg/caring.jpeg';
import cleaning from '../assets/categoryImg/cleaning.jpeg';
import delivery from '../assets/categoryImg/delivery.jpeg';
import logo from '../assets/categoryImg/else.png';
import role from '../assets/categoryImg/role.jpeg';

import { IFormData } from '../components/Post/PostForm';

const LIMIT = 12;

const BoardPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const navigation = useNavigate();

  const fetchPosts = ({ pageParam = 1 }) =>
    axios.get<AxiosResponse<{ posts: IFormData[] }>>(`${process.env.REACT_APP_SERVER_URL}/posts`, {
      params: {
        _page: pageParam,
        _limit: LIMIT,
      },
    });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<any>('posts', fetchPosts, {
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage;
    },
  });

  useEffect(() => {
    let fetching = false;
    const handleScroll = async (e: Event) => {
      const target = e.target as Document;
      const { scrollingElement } = target;
      if (!scrollingElement) return;
      const { scrollHeight, scrollTop, clientHeight } = scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  if (data === undefined) {
    return (
      <CustomLoaderWrap>
        <ReactLoading type="spin" color="#3382d9" />
      </CustomLoaderWrap>
    );
  }

  const allPosts = data.pages.flatMap(page => page.data.map((post: IFormData) => post));

  const itemClickHandler = (id: string | undefined) => {
    navigation(`/detail/${id}`);
  };

  type ImageComponentProps = {
    category: string;
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

  return (
    <StyledBox>
      <div style={{ display: 'flex', width: '750px' }}>
        <StyledOptionListBox>
          <StyledListBox>
            {['전체', '배달', '청소', '조립'].map(category => (
              <StyledOptionBox key={category} onClick={() => handleCategoryChange(category)}>
                {category}
              </StyledOptionBox>
            ))}
          </StyledListBox>
          <StyledListBox>
            {['역할 대행', '동행·돌봄', '벌레 퇴치', '기타'].map(category => (
              <StyledOptionBox key={category} onClick={() => handleCategoryChange(category)}>
                {category}
              </StyledOptionBox>
            ))}
          </StyledListBox>
        </StyledOptionListBox>
        <StyledButtonBox>
          <StyledLink to="/post">
            <StyledRequestButton>부탁하기</StyledRequestButton>
          </StyledLink>
        </StyledButtonBox>
      </div>

      <StyledList>
        {allPosts
          .filter(post => selectedCategory === '전체' || post.category === selectedCategory)
          .map((post: IFormData, postIndex) => (
            <StyledListItemBox
              key={postIndex}
              onClick={() => {
                itemClickHandler(post.id);
              }}
            >
              {post && (
                <div>
                  <ImageComponent category={post.category} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <StyledH2tag>{post.category || 'No data'}</StyledH2tag>
                    <StyledH2tag style={{ borderBottom: '1px solid black' }}>{post.price} 원</StyledH2tag>
                  </div>
                  <div style={{ width: '180px', height: '40px', margin: '15px 0 20px' }}>
                    <h1 style={{ fontFamily: 'Pretendard-Regular' }}>{post.title || 'No data'}</h1>
                  </div>
                  <StyledParagraph>{post.date || ''}</StyledParagraph>
                  <StyledParagraph>{post.position.addr || ''}</StyledParagraph>
                </div>
              )}
            </StyledListItemBox>
          ))}
      </StyledList>
      {isFetchingNextPage ? (
        <LoaderWrap>
          <ReactLoading type="spin" color="#3382d9" />
        </LoaderWrap>
      ) : null}
    </StyledBox>
  );
};

export default BoardPage;

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  min-height: calc(100vh - 186px);
`;
const CustomLoaderWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
  min-height: calc(100vh - 186px);
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledOptionListBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  margin: 10px 0 90px;
`;

const StyledButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 600px;
`;

const StyledRequestButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 130px;
  height: 126px;
  padding: 9px 10px 5px 10px;
  margin-top: 10px;

  color: #3382d9;
  background-color: white;
  border: 3px solid #3382d9;
  border-radius: 30px;
  font-size: 17px;
  transition: 0.4s;
  cursor: pointer;

  &:hover {
    color: white;
    background-color: #3382d9;
    border: 3px solid #3382d9;
  }
`;

const StyledListBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 600px;
  margin-bottom: 10px;
  border: 1px solid white;
`;

const StyledOptionBox = styled.button`
  display: flex;
  justify-content: center;
  width: 130px;
  padding: 18px 20px 14px 20px;
  background-color: white;
  border: 3px solid #f9f7f1;
  border-radius: 50px;
  font-size: 17px;
  transition: 0.4s;
  cursor: pointer;

  &:hover {
    background-color: #f9f7f1;
  }
`;

const StyledList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 800px;
  gap: 25px;
  margin-bottom: 30px;
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

const StyledParagraph = styled.p`
  margin-bottom: 5px;
  font-size: 13px;
  font-family: 'Pretendard-Regular';
`;

const StyledH2tag = styled.h2`
  margin-bottom: 5px;
  /* font-size: '13px'; */
  font-family: 'Pretendard-Regular';
`;

const LoaderWrap = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;

  margin: 20px auto;
`;
