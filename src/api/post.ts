import axios from 'axios';

export const getPost = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts`);
  return response.data;
};
