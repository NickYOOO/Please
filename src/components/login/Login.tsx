import React, { useState, ChangeEvent } from 'react';
import { Form, Input } from 'antd';
import * as Styled from './Login.styles';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useCookies } from 'react-cookie';

type FieldType = {
  email?: string;
  password?: string;
};

const Login = () => {
  const [formState, setFormState] = useState<FieldType>({
    email: '',
    password: '',
  });

  const [cookies, setCookie, removeCookie] = useCookies();
  const navigate = useNavigate();

  const isEmailValid = formState.email && formState.email.trim() !== '';
  const isPasswordValid = formState.password && formState.password.trim() !== '';
  const isFormValid = isEmailValid && isPasswordValid;

  const handleLoginInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const loginMutation = useMutation(async (formData: FieldType) => {
    const response = await axios.post('http://localhost:3002/login', {
      email: formData.email,
      password: formData.password,
    });
    console.log('response', response);
    return response.data.accessToken;
  });

  const onClickLoginHandler = async (formData: FieldType) => {
    try {
      const accessToken = await loginMutation.mutateAsync(formData);
      console.log(accessToken);

      setCookie('accessToken', accessToken, { path: '/' });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Styled.LoginForm name="basic" labelCol={{ flex: '110px' }} labelAlign="left">
        <Styled.LoginH1>로그인</Styled.LoginH1>
        <Form.Item<FieldType> label="이메일" name="email" rules={[{ required: true, message: '' }]}>
          <Input name="email" onChange={handleLoginInputChange} />
        </Form.Item>

        <Form.Item<FieldType> label="비밀번호" name="password" rules={[{ required: true, message: '' }]}>
          <Input.Password name="password" type="password" onChange={handleLoginInputChange} />
        </Form.Item>

        <Styled.LoginButton htmlType="button" onClick={() => onClickLoginHandler(formState)} disabled={!isFormValid}>
          로그인
        </Styled.LoginButton>

        <Styled.LoginBox>
          <p>아직 회원이 아니신가요?</p>
          <Link to="/signup">회원가입</Link>
        </Styled.LoginBox>
      </Styled.LoginForm>
    </div>
  );
};

export default Login;
