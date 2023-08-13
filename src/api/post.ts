import axios from 'axios';
import { IFormData } from '../components/Post/PostForm';

const URL = process.env.REACT_APP_SERVER_URL;

export const getPost = async () => {
  const response = await axios.get(`${URL}/posts`);
  return response.data;
};

export const getPostId = async (id: string | undefined) => {
  const response = await axios.get(`${URL}/posts/${id}`);
  return response.data;
};

export const addPost = async (newPost: IFormData) => {
  await axios.post(`${URL}/posts`, newPost);
};

export const deletePost = async (id: string | undefined) => {
  await axios.delete(`${URL}/posts/${id}`);
};

export const updatePost = async (newPost: IFormData) => {
  if (newPost.id !== undefined) {
    await axios.patch(`${process.env.REACT_APP_SERVER_URL}/posts/${newPost.id}`, newPost);
  }
};
