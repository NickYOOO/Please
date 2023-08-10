import React, { useState } from 'react'
import DropBox from '../DropBox/DropBox';
import PostDatePicker from './PostDatePicker';
import { Input, InputNumber, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import PostMap from '../Map/PostMap';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export interface onChangeFormfuncType {
  (type: string, data: string | number | null): void
}



const PostForm: React.FC = () => {
  const categories = ["배달", "청소", "조립", "역할 대행", "동행·돌봄", "반려동물", "벌레 퇴치", "기타"]
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    date: null,
    price: 0,
    position: {
      lat: 0,
      lng: 0
    }
  })

  const onChangeFormHandler: onChangeFormfuncType = (type, data): void => {

    setFormData({ ...formData, [type]: data });

  };

  // const onChangeFormHandler: onChangeFormfuncType = (e): void => {
  //   const { name, value } = e.target
  //   setFormData({ ...formData, [name]: value })
  // }
  return (
    <>
      <DropBox itemList={categories} selectedState={formData.category} onChangeFormHandler={onChangeFormHandler} />
      <PostDatePicker onChangeFormHandler={onChangeFormHandler} />
      <InputNumber controls={false} maxLength={10} style={{ width: 200 }} min={1} defaultValue={0} onChange={(value) => onChangeFormHandler("price", value)} />
      <span>{formData.price?.toLocaleString("ko", { style: "currency", currency: "KRW" })}원</span>
      <Input value={formData.title} placeholder="어떤 부탁인가요?" allowClear onChange={(e) => onChangeFormHandler("title", e.target.value)} />
      <TextArea
        value={formData.content}
        showCount
        maxLength={100}
        style={{ height: 120, resize: 'none' }}
        onChange={(e) => onChangeFormHandler("content", e.target.value)}
        placeholder="부탁을 더 자세하게 설명해주세요!"
      />
      <input
        type="file"
        accept="image/jpg, image/jpeg, image/png"
        name="img"
        style={{ display: 'none' }}
        onChange={handleImgUpload}
      />
      <PostMap />
    </>
  )
}

export default PostForm