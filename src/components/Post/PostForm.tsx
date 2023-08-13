import { Input, InputNumber, TimePicker } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { FaStarOfLife } from 'react-icons/fa';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import { addPost } from '../../api/post';
import defaultImg from '../../assets/img/defaultImg.png';
import { storage } from '../../firebase';
import useLogInUser from '../../hooks/useLoginUser';
import DropBox from '../DropBox/DropBox';
import PostMap from '../Map/PostMap';
import PostDatePicker from './PostDatePicker';
import * as Styled from './PostForm.styles';

export interface onChangeFormfuncType {
  (type: string, data: string | number | null | { lat: number; lng: number; addr: string }): void;
}

export interface IFormData {
  userProfileImg: string,
  email: string;
  username: string;
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
    addr: string;
  };
  img: string | undefined;
  id: string | undefined;
}

const PostForm: React.FC = () => {
  const navigate = useNavigate();
  const logInUserData = useLogInUser();
  const queryClient = useQueryClient();
  const [errMsg, setErrMsg] = useState('');

  const postsMutation = useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('postsData');
    },
  });

  const categories = ['배달', '청소', '조립', '역할 대행', '동행·돌봄', '벌레 퇴치', '기타'];
  const [formData, setFormData] = useState<IFormData>({
    userProfileImg: '',
    email: '',
    username: '',
    status: 'help',
    timeStamp: new Date().getTime(),
    title: '',
    content: '',
    category: '',
    date: null,
    time: '',
    price: '0',
    position: {
      lat: 0,
      lng: 0,
      addr: '',
    },
    img: '',
    id: '',
  });

  useEffect(() => {
    setFormData(prev => ({ ...prev, email: logInUserData.email, username: logInUserData.username, userProfileImg: logInUserData.imgUrl }));
  }, [logInUserData]);

  // const getUser = async (id: string | number) => {
  //   try {

  //     return response.data;
  //   } catch (error) {
  //     console.log('Fetch 데이터 오류', error);
  //     return [];
  //   }
  // };
  const onChangeFormHandler: onChangeFormfuncType = (type, data): void => {
    setFormData(prev => ({ ...prev, [type]: data }));
    console.log(formData)
  };

  const [imgFile, setImgFile] = useState<File | null>(null)

  const [preview, setPreview] = useState<string | null>(null)

  const onChangeAddFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const theFile = event.target.files[0];
      const _preview = URL.createObjectURL(theFile);

      setPreview(_preview);
      setImgFile(event.target.files[0]);
    }
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
  }, [imgFile]);

  const moveToBoard = () => {
    window.location.href = '/board';
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.category) {
      setErrMsg('카테고리를 선택해주세요');
      return;
    } else if (!formData.title.trim() || !formData.content.trim()) {
      setErrMsg('제목과 내용을 모두 입력해주세요');
      return;
    }

    try {
      await postsMutation.mutateAsync(formData);
      window.location.href = '/board';
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (time: dayjs.Dayjs | null, timeString: string) => {
    onChangeFormHandler('time', timeString);
  };
  const onChangePrice = (value: number | null) => {
    if (value == null) value = 0;

    const price = value.toLocaleString('ko', { style: 'currency', currency: 'KRW' }).replace(/₩/g, '');
    onChangeFormHandler('price', price);
  };

  const format = 'HH:mm';

  return (
    <Styled.StyledBox>
      <Styled.StyledContentsBox>
        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <DropBox itemList={categories} selectedState={formData.category} onChangeFormHandler={onChangeFormHandler} />
          </div>
          <Styled.StyledChooseBox>
            <label>
              <FaStarOfLife size={6} color="#FF004C" />
              &nbsp;날짜{' '}
            </label>
            <PostDatePicker onChangeFormHandler={onChangeFormHandler} />
            <label>시간 </label>
            <TimePicker defaultValue={dayjs('00:00', format)} onChange={onChange} format={format} style={{ lineHeight: 'none' }} />
            <label>금액 </label>
            <InputNumber controls={false} maxLength={10} style={{ width: 135 }} min={1} defaultValue={0} onChange={value => onChangePrice(value)} />
          </Styled.StyledChooseBox>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '30px' }}>
            <Styled.StyledRequestBox>
              <div style={{ marginBottom: '10px' }}>
                <FaStarOfLife size={6} color="#FF004C" />
                &nbsp;<label>부탁내용</label>
              </div>
              <Input value={formData.title} maxLength={13} placeholder="어떤 부탁인가요?" allowClear onChange={e => onChangeFormHandler('title', e.target.value)} />
              <TextArea value={formData.content} showCount maxLength={100} style={{ height: 150, resize: 'none' }} onChange={e => onChangeFormHandler('content', e.target.value)} placeholder="자세하게 설명해주세요!" />
            </Styled.StyledRequestBox>
            <div>
              <Styled.Label htmlFor="file">
                <Styled.StyledPhotoBox>
                  <img src={preview ?? defaultImg} alt="사진 선택" />
                </Styled.StyledPhotoBox>
              </Styled.Label>
              <Styled.ImageInput id="file" type="file" accept="image/jpg, image/jpeg, image/png" name="img" onChange={onChangeAddFile} />
            </div>
          </div>

          <PostMap onChangeFormHandler={onChangeFormHandler} />
          <h1 style={{ color: 'red', marginTop: '15px', fontSize: '12px', display: 'flex', justifyContent: 'center' }}>{errMsg}</h1>
          <Styled.StyledButtonBox>
            <button type="submit" style={{ backgroundColor: '#3382D9', color: 'white' }}>
              작성
            </button>
            <button onClick={moveToBoard}>취소</button>
          </Styled.StyledButtonBox>
        </form>
      </Styled.StyledContentsBox>
    </Styled.StyledBox>
  );
};

export default PostForm;
