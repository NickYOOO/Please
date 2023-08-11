import { Button, Form } from 'antd';
import { styled } from 'styled-components';

export const StyledBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding-top: 60px;
  height: calc(100vh - 186px);
`;

export const LoginForm = styled(Form)`
  max-width: 800px;
  margin: 16px;
  padding: 55px 120px;

  border-radius: 50px;
  text-align: center;

  & > .ant-form-item {
    margin-bottom: 0;
  }
`;

export const LoginH1 = styled.h1`
  margin-bottom: 70px;
  font-size: 25px;
`;

export const LoginButton = styled(Button)`
  margin-top: 45px;
  background-color: #0074dd;
  color: #ffffff;

  &:hover {
    color: #ffffff !important;
    border-color: #0074dd !important;
  }
`;

export const LoginBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  gap: 15px;

  & > a {
    color: #0074dd;
    text-decoration: none;
  }
`;
