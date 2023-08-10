import axios from 'axios';
import type { Like } from '../components/types';

const URL = process.env.REACT_APP_SERVER_URL;

const getLikes = async () => {
  const response = await axios.get(`${URL}/likes`);
  return response.data;
};

const patchLikes = async (like: Like) => {
  const response = await axios({
    method: 'patch',
    url: `${URL}/likes/${like.id}`,
    data: {
      likes: like.likes + 1,
    },
  });
  const data = await response.data;
  return data;
};

export { getLikes, patchLikes };
