import axios from 'axios';
import { IFormData } from '../components/Post/PostForm';

export const getPost = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts`);
  return response.data;
};

export const addPost = async (newPost: IFormData) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/posts`, newPost);
};

export const deletePost = async (id: string | undefined) => {
  await axios.delete(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`);
};

export const updatePost = async (newPost: IFormData) => {
  await axios.patch(`${process.env.REACT_APP_SERVER_URL}/posts/${newPost.id}`, newPost);
};
