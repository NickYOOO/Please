import React, { useState, useEffect } from 'react';
import DropBox from '../DropBox/DropBox';
import PostDatePicker from './PostDatePicker';
import { Input, InputNumber } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useMutation, useQueryClient } from 'react-query';
import { addPost } from '../../api/post';
import { useNavigate } from 'react-router-dom';
import PostMap from '../Map/PostMap';
import uuid from 'react-uuid';

export interface onChangeFormfuncType {
  (type: string, data: string | number | null): void;
}

export interface IFormData {
  title: string;
  content: string;
  category: string;
  date: null | string;
  price: number;
  position: {
    lat: number;
    lng: number;
  };
  img: string | undefined;
  id: string | undefined;
}

const PostForm: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const postsMutation = useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('postsData');
    },
  });

  const categories = ['배달', '청소', '조립', '역할 대행', '동행·돌봄', '반려동물', '벌레 퇴치', '기타'];
  const [formData, setFormData] = useState<IFormData>({
    title: '',
    content: '',
    category: '',
    date: null,
    price: 0,
    position: {
      lat: 0,
      lng: 0,
    },
    img: '',
    id: '',
  });

  const onChangeFormHandler: onChangeFormfuncType = (type, data): void => {
    setFormData({ ...formData, [type]: data });
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
      setFormData({ ...formData, img: url });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (imgFile) updateImg(imgFile);
  }, [imgFile]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

  return (
    <>
      <form onSubmit={onSubmit}>
        <DropBox itemList={categories} selectedState={formData.category} onChangeFormHandler={onChangeFormHandler} />
        <PostDatePicker onChangeFormHandler={onChangeFormHandler} />
        <InputNumber controls={false} maxLength={10} style={{ width: 200 }} min={1} defaultValue={0} onChange={value => onChangeFormHandler('price', value)} />
        <span>{formData.price?.toLocaleString('ko', { style: 'currency', currency: 'KRW' })}원</span>
        <Input value={formData.title} placeholder="어떤 부탁인가요?" allowClear onChange={e => onChangeFormHandler('title', e.target.value)} />
        <TextArea value={formData.content} showCount maxLength={100} style={{ height: 120, resize: 'none' }} onChange={e => onChangeFormHandler('content', e.target.value)} placeholder="자세하게 설명해주세요!" />
        <input type="file" accept="image/jpg, image/jpeg, image/png" name="img" onChange={onChangeAddFile} />
        <button type="submit">작성</button>
      </form>
      <PostMap onChangeFormHandler={onChangeFormHandler} />
    </>
  );
};

export default PostForm;
