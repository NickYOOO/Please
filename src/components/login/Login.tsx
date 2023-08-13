import { Form, Input } from 'antd';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import check from '../../assets/img/check.svg';
import Modal from '../common/modal/Modal';
import * as Styled from './Login.styles';

type FieldType = {
  email?: string;
  password?: string;
};

const Login = () => {
  const [formState, setFormState] = useState<FieldType>({
    email: '',
    password: '',
  });

  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [checkUser, setCheckUser] = useState(false); // 이 부분 추가
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
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, {
      email: formData.email,
      password: formData.password,
    });


    localStorage.setItem('response', JSON.stringify(response.data));

    return response.data.accessToken;
  });

  const checkUserRegisted = async (formData: FieldType) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users?email=${formData.email}`);
      console.log(response);
      return response.data.length > 0;
    } catch (error) {
      console.error('사용자 조회 오류:', error);
      return false;
    }
  };

  const openClearModal = () => {
    setIsClearModalOpen(true);
  };

  const onClickLoginHandler = async (formData: FieldType) => {
    try {
      const checkUser = await checkUserRegisted(formData);
      setCheckUser(checkUser);
      console.log(checkUser);

      if (!checkUser) {
        openClearModal();

        return;
      }
      const accessToken = await loginMutation.mutateAsync(formData);

      setCookie('accessToken', accessToken, { path: '/' });

      openClearModal();
      setTimeout(() => {
        setIsClearModalOpen(false);
        navigate('/');
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Styled.StyledBox>
      <Styled.LoginForm name="basic" labelCol={{ flex: '110px' }} labelAlign="left">
        <Styled.LoginH1>로그인</Styled.LoginH1>

        <Form.Item<FieldType> label="이메일" name="email" rules={[{ required: true, message: '' }]} style={{ marginBottom: '20px' }}>
          <Input name="email" onChange={handleLoginInputChange} />
        </Form.Item>

        <Form.Item<FieldType> label="비밀번호" name="password" rules={[{ required: true, message: '' }]}>
          <Input.Password name="password" type="password" onChange={handleLoginInputChange} />
        </Form.Item>

        <Styled.LoginButton
          htmlType="submit"
          onClick={() => {
            onClickLoginHandler(formState);
          }}
          disabled={!isFormValid}
        >
          로그인
        </Styled.LoginButton>
        <Modal isModalOpen={isClearModalOpen} setIsModalOpen={setIsClearModalOpen} closeButton={true} size="small">
          <img src={check} alt="알림창" style={{ width: '40px' }} />
          <div>
            {checkUser ? (
              <>
                <p>로그인 되었습니다.</p>
                <p>곧 메인 페이지로 자동 이동됩니다.</p>
              </>
            ) : (
              <>
                <p>일치하는 회원정보가 없습니다.</p>
                <p>아이디와 비밀번호를 확인해주세요.</p>
              </>
            )}
          </div>
        </Modal>

        <Styled.LoginBox>
          <p>아직 회원이 아니신가요?</p>
          <Link to="/signup">회원가입</Link>
        </Styled.LoginBox>
      </Styled.LoginForm>
    </Styled.StyledBox>
  );
};

export default Login;
