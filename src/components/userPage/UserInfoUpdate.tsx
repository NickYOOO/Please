import React, { useEffect, useState } from 'react';
import * as Styled from './UserInfoUpdate.syles';
import { UserData } from '../types/index';
import useInput from '../../hooks/useInput';
import { Button, Input } from 'antd';
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useMutation, useQueryClient } from 'react-query';
import { updateUser } from '../../api/users';

interface UserInfoUpdateProps {
  userInfo: UserData;
  closeModal: () => void;
}

const UserInfoUpdate = ({ userInfo, closeModal }: UserInfoUpdateProps) => {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState(userInfo.imgUrl);
  const [preview, setPreview] = useState<string | undefined>('');
  const [newName, onChangeNewName] = useInput(userInfo.username);
  const queryClient = useQueryClient();
  const [errorMsg, setErrorMsg] = useState('');
  const usersMutation = useMutation(updateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });
  const onChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const theFile = event.target.files[0];
      const _preview = URL.createObjectURL(theFile);
      setPreview(_preview);
      setImgFile(event.target.files[0]);
    }
  };
  const updateImg = async (file: File) => {
    try {
      const imageRef = ref(storage, `Image/userProfile/${userInfo.email}`);
      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);
      setImgUrl(url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (imgFile) updateImg(imgFile);
  }, [imgFile]);

  const onSubmitProfileUpdate = () => {
    if (newName.length < 2) {
      setErrorMsg('닉네임을 2글자 이상으로 정해주세요');
      return;
    }
    usersMutation.mutate({ ...userInfo, username: newName, imgUrl });
    closeModal();
  };

  return (
    <Styled.UpdateLayout>
      <Styled.UpdateImgPreView src={preview ? preview : userInfo.imgUrl} alt="logo" />
      <Styled.UpdateImg>
        <label htmlFor="file">사진 변경</label>
        <input accept="image/jpg, image/jpeg, image/png" id="file" type="file" onChange={onChangeImage} />
      </Styled.UpdateImg>
      <Styled.UpdateBox>
        <label htmlFor="name">닉네임 :&nbsp;</label>
        <Input id="name" type="text" value={newName} onChange={onChangeNewName} defaultValue="26888888" style={{ width: '150px' }} />
      </Styled.UpdateBox>
      <h1>{errorMsg}</h1>
      <Styled.UpdateButton onClick={onSubmitProfileUpdate}>저장</Styled.UpdateButton>
    </Styled.UpdateLayout>
  );
};

export default UserInfoUpdate;
