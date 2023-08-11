import { Button, Form } from 'antd';
import { styled } from 'styled-components';

export const LoginForm = styled(Form)`
  max-width: 800px;
  margin: 16px auto;
  padding: 30px 150px;
  background-color: #ffefab;
  border-radius: 16px;
  text-align: center;

  & > .ant-form-item {
    margin-bottom: 0;
  }
`;

export const LoginH1 = styled.h1`
  margin-bottom: 50px;
  font-size: 25px;
`;

export const ValidationMessage = styled.p`
  margin: 10px 0;
  font-size: 13px;
  color: ${props => props.color};
`;

export const LoginButton = styled(Button)`
  margin-top: 70px;
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
  margin-top: 40px;
  gap: 15px;

  & > a {
    color: #0074dd;
    text-decoration: none;
  }
`;
