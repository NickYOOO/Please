import axios from 'axios';
import { Bookmark } from '../components/types';

const URL = process.env.REACT_APP_SERVER_URL;

const getBookmark = async ({ queryKey }: { queryKey: string[] }) => {
  const [postid, email] = queryKey;
  const response = await axios.get<Bookmark[]>(`${URL}?email=${email}`);
  return response.data;
};

export { getBookmark };
