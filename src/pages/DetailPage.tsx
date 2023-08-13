import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { getPost } from '../api/post';
import { IFormData } from '../components/Post/PostForm';
import DetailContents from '../components/detailContents/DetailContents';
import DetailMap from '../components/detailMap/DetailMap';
import ReactLoading from 'react-loading';

type DetailParams = {
  id: string;
};

const DetailPage: React.FC = () => {
  const param = useParams<DetailParams>();
  const { isLoading, isError, data } = useQuery<boolean, boolean, any[]>('post', getPost);

  if (isLoading) {
    return (
      <LoaderWrap>
        <ReactLoading type="spin" color="#3382d9" />
      </LoaderWrap>
    );
  }

  const detailData: IFormData | undefined = data?.find(item => {
    return item.id == param.id;
  });

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
  min-height: calc(100vh - 186px);

  @media (max-width: 1000px) {
    height: 100%;
  }
`;

const LoaderWrap = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;
