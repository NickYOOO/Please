import axios from 'axios';
import { IMsg } from '../components/types';
const URL = process.env.REACT_APP_SERVER_URL;


const sendMsg = async (msg:IMsg) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/msg`, msg);
};


export {sendMsg}
