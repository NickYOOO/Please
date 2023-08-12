import axios from 'axios';

export const getMsg = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/msg`);
  return response.data;
};
