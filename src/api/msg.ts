import axios from 'axios';
<<<<<<< HEAD

export const getMsg = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/msg`);
  return response.data;
};
=======
import { IMsg } from '../components/types';
const URL = process.env.REACT_APP_SERVER_URL;


const sendMsg = async (msg:IMsg) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/msg`, msg);
};


export {sendMsg}
>>>>>>> 0d8fcb09341d782f0963cf95566eee8cc7182bd1
