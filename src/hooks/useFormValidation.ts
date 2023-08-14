import axios from 'axios';
import { useState } from 'react';

const useFormValidation = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [validationMsg, setValidationMsg] = useState({
    usernameMsg: '',
    emailMsg: '',
    passwordMsg: '',
    confirmPasswordMsg: '',
  });

  const [validationState, setValidationState] = useState({
    usernameState: false,
    emailState: false,
    passwordState: false,
    confirmPasswordState: false,
  });

  const handleJoinInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState(prev => ({ ...prev, [name]: value }));

    const isEmailDuplicated = async (values: any) => {
      const { email } = values;

      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users?email=${email}`);
        return response.data.length > 0;
      } catch (error) {
        console.error('이메일 중복 확인 오류:', error);
        return false;
      }
    };

    switch (name) {
      case 'username':
        {
          let msg = '';
          let currentState = false;
          if (!validateValue(name, value)) {
            msg = '사용 가능한 닉네임이 아닙니다.(특수문자 제외 2~10자)';
            currentState = false;
          } else {
            msg = '사용 가능한 닉네임 형식입니다.';
            currentState = true;
          }
          setValidationMsg(prev => ({
            ...prev,
            usernameMsg: msg,
          }));

          setValidationState(prev => ({
            ...prev,
            usernameState: currentState,
          }));
        }
        break;
      case 'email':
        {
          let msg = '';
          let currentState = false;

          if (!validateValue(name, value)) {
            msg = '이메일 형식이 올바르지 않습니다.';
            currentState = false;
          } else {
            const isDuplicated = await isEmailDuplicated({ email: value });
            if (isDuplicated) {
              msg = '이미 존재하는 이메일입니다.';
              currentState = false;
            } else {
              msg = '사용 가능한 이메일 형식입니다.';
              currentState = true;
            }
          }
          setValidationMsg(prev => ({
            ...prev,
            emailMsg: msg,
          }));
          setValidationState(prev => ({
            ...prev,
            emailState: currentState,
          }));
        }
        break;
      case 'password':
        {
          let msg = '';
          let currentState = false;
          if (!validateValue(name, value)) {
            msg = '영문, 숫자, 특수문자 조합 8~15 자리로 입력해주세요.';
            currentState = false;
          } else {
            msg = '사용 가능한 비밀번호입니다.';
            currentState = true;
          }
          setValidationMsg(prev => ({
            ...prev,
            passwordMsg: msg,
          }));
          setValidationState(prev => ({
            ...prev,
            passwordState: currentState,
          }));
        }
        break;
      case 'confirmPassword':
        {
          let msg = '';
          let currentState = false;
          if (formState.password !== value) {
            msg = '비밀번호가 일치하지 않습니다.';
            currentState = false;
          } else {
            msg = '비밀번호가 일치합니다.';
            currentState = true;
          }
          setValidationMsg(prev => ({
            ...prev,
            confirmPasswordMsg: msg,
          }));
          setValidationState(prev => ({
            ...prev,
            confirmPasswordState: currentState,
          }));

          const isFormValid = validationState.usernameState && validationState.emailState && validationState.passwordState && currentState;

          setValidationState(prev => ({
            ...prev,
            isFormValid: isFormValid,
          }));
        }
        break;
      default:
        return;
    }
    if (value.trim() === '') {
      setValidationMsg(prev => ({
        ...prev,
        [`${name}Msg`]: '',
      }));
      setValidationState(prev => ({
        ...prev,
        [`${name}State`]: false,
      }));
    }
  };

  const validateValue = (name: string, value: string) => {
    switch (name) {
      case 'username':
        return /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,10}$/.test(value);
      case 'email':
        return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(value);
      case 'password':
        return /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[~?!@#$%^&*_-]).{8,15}$/.test(value);
      default:
        return false;
    }
  };

  return {
    formState,
    validationMsg,
    validationState,
    handleJoinInputChange,
  };
};

export default useFormValidation;
