import { Button } from 'antd';
import { styled } from 'styled-components';

export const UpdateLayout = styled.div`
  position: absolute;
  top: 120px;
  left: 0;
  right: 0;
  bottom: 25px;
  align-items: center;
  text-align: center;
  margin: 0 30px;
`;

export const UpdateImgPreView = styled.img`
  width: 120px;
  height: 120px;
  margin: 0 auto;
  border-radius: 50%;
  object-fit: cover;
`;

export const UpdateImg = styled.div`
  margin-top: 20px;

  & > label {
    color: #0074dd;
    font-weight: 600;
  }

  & > input {
    display: none;
  }
`;

export const UpdateBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

export const UpdateButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 30px;
  background-color: #3382d9;
  border-radius: 8px;
  color: #ffffff;
  font-size: 18px;

  &:hover {
    color: #ffffff !important;
    border-color: #0074dd !important;
  }
`;
