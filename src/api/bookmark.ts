import axios from 'axios';

import type { Bookmark } from '../components/types';

const URL = process.env.REACT_APP_SERVER_URL;

const getBookmark = async (email: string) => {
  const response = await axios.get<Bookmark[]>(`${URL}/bookmark?email=${email}`);
  return response.data;
};

const delBookmark = async (id: string) => {
  await axios.delete(`${URL}/bookmark/${id}`);
};

const addBookmark = async ({ email, postId }: { email: string; postId: string | undefined }) => {
  const response = await axios.post(`${URL}/bookmark`, {
    email,
    postId,
  });
  return response.data;
};

export { getBookmark, addBookmark, delBookmark };
