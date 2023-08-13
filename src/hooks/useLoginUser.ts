import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { logInUserProps } from '../components/types';

type LogInUser = {
  email: string;
  username: string;
  id: string;
};

const useLogInUser = (): logInUserProps | null => {
  const [userData, setUserData] = useState<LogInUser | null>(null);
  useEffect(() => {
    const storedResponse = localStorage.getItem('response');
    const parsedResponse = storedResponse ? JSON.parse(storedResponse) : null;
    if (parsedResponse !== null) {
      setUserData(parsedResponse.user);
    } else {
      setUserData(null);
    }
  }, []);
  return userData;
};

export default useLogInUser;
