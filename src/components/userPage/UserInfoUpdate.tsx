import React, { useEffect, useState } from 'react'
import { UserData } from '../types/index';
import { StyledPhotoBox } from '../../pages/UserPage';
import useInput from '../../hooks/useInput';
import { Button, Input, Select, Space } from 'antd';
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useMutation, useQueryClient } from 'react-query';
import { updateUser } from '../../api/users';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';

interface UserInfoUpdateProps {
  userInfo: UserData;
  closeModal: () => void
}


const UserInfoUpdate = ({ userInfo, closeModal }: UserInfoUpdateProps) => {
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState(userInfo.imgUrl)
  const [preview, setPreview] = useState<string | undefined>("");
  const [newName, onChangeNewName] = useInput(userInfo.username);
  const queryClient = useQueryClient();
  const [errorMsg, setErrorMsg] = useState("")
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
      setImgUrl(url)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (imgFile) updateImg(imgFile);
  }, [imgFile]);

  const onSubmitProfileUpdate = () => {
    if (newName.length < 2) {
      setErrorMsg("닉네임을 2글자 이상으로 정해주세요")
      return
    }
    usersMutation.mutate({ ...userInfo, username: newName, imgUrl })
    closeModal()
  }

  return (
    <div>
      <StyledPhotoBox>
        <img src={preview ? preview : userInfo.imgUrl} alt="logo" />
      </StyledPhotoBox>

      <Input accept="image/jpg, image/jpeg, image/png" type="file" onChange={onChangeImage} />
      <div style={{ display: "flex", alignItems: "center" }}>
        <label htmlFor="name" >닉네임 : </label>
        <Input id="name" type="text" value={newName} onChange={onChangeNewName} defaultValue="26888888" style={{ width: '200px' }} />
      </div>
      <h1>{errorMsg}</h1>
      <Button onClick={onSubmitProfileUpdate} type="primary">변경하기</Button>
    </div>
  )
}

export default UserInfoUpdate