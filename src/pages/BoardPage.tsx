import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { useInfiniteQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import caring from '../assets/img/caring.jpeg';

type Post = {
  id: number;
  category: string;
  title: string;
  location: string;
  date: string;
};

const LIMIT = 30; //페이지 스크롤

// 1번 페이지는 0~19
// 2번 페이지는 20~39
// 3번 페이지는 40~59

const BoardPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const navigation = useNavigate();

  const fetchPosts = ({ pageParam = 1 }) =>
    axios.get<AxiosResponse<{ posts: Post[] }>>(`http://localhost:3001/posts`, {
      params: {
        _page: pageParam,
        _limit: LIMIT,
      },
    });

  // data는 현재까지 가져온 모든 페이지의 데이터들
  // fetchNextPage 다음 페이지를 가져오는 함수
  // hasNextPage 더 많은 페이지가 있는지 여부 나타냄
  // isFetchingNextPage 다음 페이지를 가져오는 중인지 여부 나타냄
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery<any>('posts', fetchPosts, {
    // getNextPageParam 다음 페이지의 매개 변수 결정
    // getNextPageParam 함수가 내부적으로 useInfiniteQuery에 의해 호출되며,
    // 그 결과에 따라 fetchNextPage 함수가 호출되어 다음 페이지를 가져옴
    getNextPageParam: (lastPage, allPages) => {
      // 마지막 페이지의 데이터에서 data 속성 중 posts 속성 가져옴
      // 만약 data가 존재하지 않으면 undefined를 반환
      // console.log(lastPage, allPages);

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
        fetching = true; //한번만 실행되도록
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
    return <h1>Loading...</h1>;
  }
  // console.log(data);
  // console.log(data.pages[0].data);

  // flatMap 함수를 사용하여 모든 페이지의 데이터를 하나의 배열로 결합
  const allPosts = data.pages.flatMap(page => page.data.map((post: Post) => post));

  // console.log(allPosts);

  const itemClickHandler = (id: number) => {
    navigation(`/detail/${id}`);
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
            {['역할 대행', '동행 · 돌봄', '벌레 퇴치', '기타'].map(category => (
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
          .map((post: Post, postIndex) => (
            <StyledListItemBox
              key={postIndex}
              onClick={() => {
                itemClickHandler(post.id);
              }}
            >
              {post && (
                <div>
                  <StyledImg src={caring} alt="caring" />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <StyledH2tag>{post.category || 'No data'}</StyledH2tag>
                    <StyledH2tag style={{ borderBottom: '1px solid black' }}>시간당 15,000원</StyledH2tag>
                  </div>
                  <div style={{ width: '180px', height: '40px', margin: '15px 0 20px' }}>
                    <h1 style={{ fontFamily: 'Pretendard-Regular' }}>{post.title || 'No data'}</h1>
                  </div>
                  <StyledPtag>{post.location || 'No data'}</StyledPtag>
                  <StyledPtag>{post.date || 'No data'}</StyledPtag>
                </div>
              )}
            </StyledListItemBox>
          ))}
      </StyledList>
      {/* 무한 스크롤을 위한 로딩 표시 */}
      {isFetchingNextPage ? (
        <LoaderWrap>
          <ReactLoading type="spin" color="#A593E0" />
        </LoaderWrap>
      ) : null}
    </StyledBox>
  );
};

export default BoardPage;

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
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
  /* justify-content: center; */
  align-items: center;

  width: 600px;
  /* height: 170px; */

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

  cursor: pointer;

  color: #3382d9;

  background-color: white;
  border: 3px solid #3382d9;
  border-radius: 30px;

  font-size: 17px;

  transition: 0.4s;
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
  /* height: 150px; */

  border: 1px solid white;
`;
const StyledOptionBox = styled.button`
  display: flex;
  justify-content: center;
  width: 130px;
  padding: 18px 20px 14px 20px;

  cursor: pointer;

  background-color: white;
  border: 3px solid #f9f7f1;
  border-radius: 50px;

  font-size: 17px;

  transition: 0.4s;
  &:hover {
    background-color: #f9f7f1;
  }
`;
const StyledList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 800px;
  gap: 25px;
  /* height: 350px; */
  margin-bottom: 50px;
  /* background-color: #f9f9f9; */
`;

const StyledListItemBox = styled.div`
  width: 180px;
  height: 250px;

  cursor: pointer;
`;
const StyledImg = styled.img`
  width: 180px;
  height: 100px;

  margin-bottom: 15px;

  border-radius: 10px;
`;
const StyledPtag = styled.p`
  margin-bottom: 5px;

  font-size: 13px;
  font-family: 'Pretendard-Regular';
`;
const StyledH2tag = styled.h2`
  margin-bottom: 5px;
  /* color: #ff004c; */
  font-size: '13px';
  font-family: 'Pretendard-Regular';
`;
const LoaderWrap = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;
