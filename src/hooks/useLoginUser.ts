import React, { useEffect, useState } from 'react';
import { logInUserProps } from '../components/types';

const useLogInUser = (): logInUserProps => {
  const [userData, setUserData] = useState({ email: '', username: '', id: '' });

  useEffect(() => {
    const storedResponse = localStorage.getItem('response');
    const parsedResponse = storedResponse ? JSON.parse(storedResponse) : null;
    setUserData(parsedResponse.user);
  }, []);
  return userData;
};

export default useLogInUser;
