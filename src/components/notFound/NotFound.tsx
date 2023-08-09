import React from 'react';
import * as Styled from './NotFound.styles';
import { Button, Space } from 'antd';
import Img404 from '../../assets/img/404.png';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const goBack = () => navigate('/');

  return (
    <Styled.FullPageBox>
      <img src={Img404} alt="404.img" />
      <h1>페이지를 찾을 수 없습니다.</h1>
      <p>페이지가 존재하지 않거나, 사용할 수 없는 페이지 입니다.</p>
      <p>입력하신 주소가 정확한지 다시 한 번 확인해주세요.</p>
      <br />
      <br />
      <Space direction="vertical" style={{ width: '40%' }}>
        <Button type="primary" block onClick={goBack} style={{ height: '55px' }}>
          메인페이지로 이동
        </Button>
      </Space>
    </Styled.FullPageBox>
  );
};

export default NotFound;
