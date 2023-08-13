import axios from 'axios';
import { UserData } from '../components/types';

const URL = process.env.REACT_APP_SERVER_URL;

export const getUsers = async () => {
  const response = await axios.get(`${URL}/users`);
  return response.data;
};

export const getUserId = async (id: string | undefined | number) => {
  const response = await axios.get(`${URL}/users/${id}`);
  return response.data;
};

export const updateUser = async (newUser: UserData) => {
  await axios.patch(`${process.env.REACT_APP_SERVER_URL}/users/${newUser.id}`, newUser);
};
