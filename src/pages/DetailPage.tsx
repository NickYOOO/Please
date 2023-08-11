import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { getPost } from '../api/post';
import { IFormData } from '../components/Post/PostForm';
import DetailContents from '../components/detailContents/DetailContents';
import DetailMap from '../components/detailMap/DetailMap';

type DetailParams = {
  id: string;
};

const DetailPage: React.FC = () => {
  const param = useParams<DetailParams>();
  const { isLoading, isError, data } = useQuery<boolean, boolean, any[]>('post', getPost);
  const detailData: IFormData | undefined = data?.find(item => {
    return item.id == param.id;
  });
  console.log(detailData);

  const latitude = detailData?.position.lat ? detailData?.position.lat : 0;
  const longitude = detailData?.position.lng ? detailData?.position.lng : 0;

  return (
    <StyledBox>
      <DetailContents data={detailData} />
      {latitude !== 0 && longitude !== 0 ? <DetailMap latitude={latitude} longitude={longitude} /> : null}
    </StyledBox>
  );
};

export default DetailPage;

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 186px);

  @media (max-width: 1000px) {
    height: 100%;
  }
`;
