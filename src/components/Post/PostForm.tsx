import { Input, InputNumber, TimePicker } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import { addPost } from '../../api/post';
import { storage } from '../../firebase';
import DropBox from '../DropBox/DropBox';
import PostMap from '../Map/PostMap';
import PostDatePicker from './PostDatePicker';

export interface onChangeFormfuncType {
  (type: string, data: string | number | null | { lat: number; lng: number; addr: string }): void;
}

export interface IFormData {
  email: string;
  nickName: string;
  status: string;
  timeStamp: number;
  title: string;
  content: string;
  category: string;
  date: null | string;
  time: string;
  price: string;
  position: {
    lat: number;
    lng: number;
    address: string;
  };
  img: string | undefined;
  id: string | undefined;
}

const PostForm: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [errMsg, setErrMsg] = useState('');
  const [price, setPrice] = useState('￦0');
  const postsMutation = useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('postsData');
    },
  });

  const categories = ['배달', '청소', '조립', '역할 대행', '동행·돌봄', '반려동물', '벌레 퇴치', '기타'];
  const [formData, setFormData] = useState<IFormData>({
    email: '',
    nickName: '',
    status: 'help',
    timeStamp: new Date().getTime(),
    title: '',
    content: '',
    category: '',
    date: null,
    time: '',
    price,
    position: {
      lat: 0,
      lng: 0,
      address: '',
    },
    img: '',
    id: '',
  });

  const onChangeFormHandler: onChangeFormfuncType = (type, data): void => {
    setFormData(prev => ({ ...prev, [type]: data }));
  };

  const [imgFile, setImgFile] = useState<File>();
  const onChangeAddFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setImgFile(event.target.files[0]);
  };

  const updateImg = async (file: File) => {
    try {
      const imageRef = ref(storage, `Image/${uuid()}`);
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      onChangeFormHandler('img', url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (imgFile) updateImg(imgFile);

    const storedData = localStorage.getItem('response');

    if (!storedData) {
      navigate('/login');
    } else {
      console.log('게시글작성하기');
    }
  }, [imgFile, navigate]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.category) {
      setErrMsg('카테고리를 선택해주세요');
      return;
    } else if (!formData.title.trim() || !formData.content.trim()) {
      setErrMsg('제목과 내용을 모두 입력해주세요');
      return;
    }
    postsMutation.mutate(formData);
    navigate('/board');
  };

  // const handleImgUpload = (event: ChangeEventHandler) => {
  //   updateImg(event.target.files[0]);
  // };

  // const onChangeFormHandler: onChangeFormfuncType = (e): void => {
  //   const { name, value } = e.target
  //   setFormData({ ...formData, [name]: value })
  // }
  const onChange = (time: dayjs.Dayjs | null, timeString: string) => {
    onChangeFormHandler('time', timeString);
  };
  const onChangePrice = (value: number | null) => {
    if (value == null) value = 0;
    onChangeFormHandler('price', value.toLocaleString('ko', { style: 'currency', currency: 'KRW' }));
  };

  const format = 'HH:mm';
  return (
    <>
      <form onSubmit={onSubmit}>
        <DropBox itemList={categories} selectedState={formData.category} onChangeFormHandler={onChangeFormHandler} />
        <PostDatePicker onChangeFormHandler={onChangeFormHandler} />
        <TimePicker defaultValue={dayjs('00:00', format)} onChange={onChange} format={format} />
        <InputNumber controls={false} maxLength={10} style={{ width: 200 }} min={0} defaultValue={0} onChange={value => onChangePrice(value)} />
        <span>{formData.price}</span>
        <Input value={formData.title} placeholder="어떤 부탁인가요?" allowClear onChange={e => onChangeFormHandler('title', e.target.value)} />
        <TextArea value={formData.content} showCount maxLength={100} style={{ height: 120, resize: 'none' }} onChange={e => onChangeFormHandler('content', e.target.value)} placeholder="자세하게 설명해주세요!" />
        <input type="file" accept="image/jpg, image/jpeg, image/png" name="img" onChange={onChangeAddFile} />
        <PostMap onChangeFormHandler={onChangeFormHandler} />
        <button type="submit">작성</button>
        <h1 style={{ color: 'red' }}>{errMsg}</h1>
      </form>
    </>
  );
};

export default PostForm;
