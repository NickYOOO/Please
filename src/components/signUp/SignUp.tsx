import { Form, Input } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import check from '../../assets/img/check.svg';
import useFormValidation from '../../hooks/useFormValidation';
import Modal from '../common/modal/Modal';
import '../../assets/img/defaultProfile.png';
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
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setSubmitButtonDisabled(!(validationState.usernameState && validationState.emailState && validationState.passwordState && validationState.confirmPasswordState));
  }, [validationState.usernameState, validationState.emailState, validationState.passwordState, validationState.confirmPasswordState]);

  const openClearModal = () => {
    setIsClearModalOpen(true);
  };
  const HandleSubmit = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users`, {
        username: formState.username,
        email: formState.email,
        password: formState.password,
        imgUrl: 'https://cdn-icons-png.flaticon.com/512/95/95641.png',
      });

      openClearModal();
      setTimeout(() => {
        setIsClearModalOpen(false);
        navigate('/login');
      }, 1500);
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
        <Styled.ValidationMessage color={validationState.usernameState ? '#3382D9' : '#ff004c'}>{validationMsg.usernameMsg}</Styled.ValidationMessage>

        <Form.Item<FieldType> label="이메일" name="email" rules={[{ required: true, message: '' }]}>
          <Input name="email" value={formState.email} onChange={handleJoinInputChange} />
        </Form.Item>
        <Styled.ValidationMessage color={validationState.emailState ? '#3382D9' : '#ff004c'}>{validationMsg.emailMsg}</Styled.ValidationMessage>

        <Form.Item<FieldType> label="비밀번호" name="password" rules={[{ required: true, message: '' }]}>
          <Input.Password name="password" type="password" value={formState.password} onChange={handleJoinInputChange} />
        </Form.Item>
        <Styled.ValidationMessage color={validationState.passwordState ? '#3382D9' : '#ff004c'}>{validationMsg.passwordMsg}</Styled.ValidationMessage>

        <Form.Item<FieldType> label="비밀번호 확인" name="confirmPassword" rules={[{ required: true, message: '' }]}>
          <Input.Password name="confirmPassword" value={formState.confirmPassword} onChange={handleJoinInputChange} />
        </Form.Item>
        <Styled.ValidationMessage color={validationState.confirmPasswordState ? '#3382D9' : '#ff004c'}>{validationMsg.confirmPasswordMsg}</Styled.ValidationMessage>

        {submitButtonDisabled ? <Styled.SignUpButton disabled>회원가입</Styled.SignUpButton> : <Styled.SignUpButton htmlType="submit">회원가입</Styled.SignUpButton>}
        <Modal isModalOpen={isClearModalOpen} setIsModalOpen={setIsClearModalOpen} closeButton={false} size="small">
          <img src={check} alt="알림창" style={{ width: '40px' }} />
          <div>
            <p>회원가입이 완료되었습니다.</p>
            <p>곧 로그인 페이지로 자동 이동됩니다.</p>
          </div>
        </Modal>

        <Styled.SignUpBox>
          <p>이미 회원이신가요?</p>
          <Link to="/login">로그인</Link>
        </Styled.SignUpBox>
      </Styled.SignUpForm>
    </Styled.StyledBox>
  );
};

export default SignUp;
