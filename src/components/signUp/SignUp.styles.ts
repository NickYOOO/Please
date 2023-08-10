import { Button, Form } from 'antd';
import { styled } from 'styled-components';

export const StyledBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 40px;
  height: calc(100vh - 178px);
`;
export const SignUpForm = styled(Form)`
  max-width: 800px;
  margin: 16px;
  padding: 55px 120px;
  background-color: #ffefab;
  /* border: 5px solid #ffefab; */
  border-radius: 50px;
  text-align: center;

  & > .ant-form-item {
    margin-bottom: 0;
  }
`;

export const SignUpH1 = styled.h1`
  margin-bottom: 50px;
  font-size: 25px;
`;

export const ValidationMessage = styled.p`
  display: flex;
  text-align: left;

  width: 300px;
  padding: 10px 0 10px 110px;

  font-size: 13px;
  color: ${props => props.color};
`;

export const SignUpButton = styled(Button)`
  margin-top: 25px;
  background-color: #0074dd;
  color: #ffffff;

  &:hover {
    color: #ffffff !important;
    border-color: #0074dd !important;
  }
`;

export const SignUpBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 35px;
  gap: 15px;

  & > a {
    color: #0074dd;
    text-decoration: none;
  }
`;
