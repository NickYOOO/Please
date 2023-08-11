import React from 'react';
import DetailContents from '../components/detailContents/DetailContents';
import DetailMap from '../components/detailMap/DetailMap';
import { useQuery } from 'react-query';
import { getPost } from '../api/post';
import { useParams } from 'react-router-dom';
import { IFormData } from '../components/Post/PostForm';

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
    <div>
      <DetailContents data={detailData} />
      {latitude !== 0 && longitude !== 0 ? <DetailMap latitude={latitude} longitude={longitude} /> : null}
    </div>
  );
};

export default DetailPage;
