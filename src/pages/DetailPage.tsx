import React from 'react';
import { useQuery } from 'react-query';
import { styled } from 'styled-components';
import { getPost } from '../api/post';
import DetailContents from '../components/detailContents/DetailContents';
import DetailMap from '../components/detailMap/DetailMap';

const DetailPage: React.FC = () => {
  const { isLoading, isError, data } = useQuery('post', getPost);
  console.log(data);

  const latitude = 37.5665;
  const longitude = 126.978;

  return (
    <StyledBox>
      <DetailContents />
      <DetailMap latitude={latitude} longitude={longitude} />
    </StyledBox>
  );
};

export default DetailPage;

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;

  /* padding-top: 100px; */
  height: calc(100vh - 186px);
`;
