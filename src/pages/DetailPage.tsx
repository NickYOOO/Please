import React from 'react';
import DetailContents from '../components/detailContents/DetailContents';
import DetailMap from '../components/detailMap/DetailMap';
import { useQuery } from 'react-query';
import { getPost } from '../api/post';

const DetailPage: React.FC = () => {
  const { isLoading, isError, data } = useQuery('post', getPost);
  console.log(data);

  const latitude = 37.5665;
  const longitude = 126.978;

  return (
    <div>
      <DetailContents />
      <DetailMap latitude={latitude} longitude={longitude} />
    </div>
  );
};

export default DetailPage;
