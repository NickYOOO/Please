import axios from 'axios';
import { IMsg } from '../components/types';

const URL = process.env.REACT_APP_SERVER_URL;

export const getMsg = async () => {
  const response = await axios.get(`${URL}/msg`);
  return response.data;
};

export const sendMsg = async (msg: IMsg) => {
  await axios.post(`${URL}/msg`, msg);
};

export const deleteMsg = async (id: string) => {
  await axios.delete(`${URL}/msg/${id}`);
};
