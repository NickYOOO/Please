import { useEffect, useState } from 'react';
import { logInUserProps } from '../components/types';

const useLogInUser = (): logInUserProps | null => {
  const [userData, setUserData] = useState<logInUserProps | null>(null);
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
