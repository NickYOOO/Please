import { Form, Input } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import useFormValidation from '../../hooks/useFormValidation';
import * as Styled from './SignUp.styles';

type FieldType = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const SignUp = () => {
  const { formState, validationMsg, validationState, handleJoinInputChange } = useFormValidation();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setSubmitButtonDisabled(!(validationState.usernameState && validationState.emailState && validationState.passwordState && validationState.confirmPasswordState));
  }, [validationState.usernameState, validationState.emailState, validationState.passwordState, validationState.confirmPasswordState]);

  const HandleSubmit = async () => {
    try {
      const { data } = await axios.post('http://localhost:3001/users', {
        username: formState.username,
        email: formState.email,
        password: formState.password,
      });

      // const response = await axios.post('http://localhost:3001/login', {
      //   email: formState.email,
      //   password: formState.password,
      // });
      // console.log(response.data.accessToken);
      // setCookie('accessToken', data['accessToken'], { path: '/' });

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Styled.StyledBox>
      <Styled.SignUpForm name="basic" labelCol={{ flex: '110px' }} labelAlign="left" onFinish={HandleSubmit}>
        <Styled.SignUpH1>회원가입</Styled.SignUpH1>
        <Form.Item<FieldType> label="닉네임" name="username" rules={[{ required: true, message: '' }]}>
          <Input name="username" value={formState.username} onChange={handleJoinInputChange} />
        </Form.Item>
        <Styled.ValidationMessage color={validationState.usernameState ? '#0074dd' : '#ff004c'}>{validationMsg.usernameMsg}</Styled.ValidationMessage>

        <Form.Item<FieldType> label="이메일" name="email" rules={[{ required: true, message: '' }]}>
          <Input name="email" value={formState.email} onChange={handleJoinInputChange} />
        </Form.Item>
        <Styled.ValidationMessage color={validationState.emailState ? '#0074dd' : '#ff004c'}>{validationMsg.emailMsg}</Styled.ValidationMessage>

        <Form.Item<FieldType> label="비밀번호" name="password" rules={[{ required: true, message: '' }]}>
          <Input.Password name="password" type="password" value={formState.password} onChange={handleJoinInputChange} />
        </Form.Item>
        <Styled.ValidationMessage color={validationState.passwordState ? '#0074dd' : '#ff004c'}>{validationMsg.passwordMsg}</Styled.ValidationMessage>

        <Form.Item<FieldType> label="비밀번호 확인" name="confirmPassword" rules={[{ required: true, message: '' }]}>
          <Input.Password name="confirmPassword" value={formState.confirmPassword} onChange={handleJoinInputChange} />
        </Form.Item>
        <Styled.ValidationMessage color={validationState.confirmPasswordState ? '#0074dd' : '#ff004c'}>{validationMsg.confirmPasswordMsg}</Styled.ValidationMessage>

        {submitButtonDisabled ? <Styled.SignUpButton disabled>Submit</Styled.SignUpButton> : <Styled.SignUpButton htmlType="submit">Submit</Styled.SignUpButton>}

        <Styled.SignUpBox>
          <p>이미 회원이시라면?</p>
          <Link to="/login">로그인</Link>
        </Styled.SignUpBox>
      </Styled.SignUpForm>
    </Styled.StyledBox>
  );
};

export default SignUp;
