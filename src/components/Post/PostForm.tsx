import React, { useState }  from 'react'
import DropBox from '../DropBox/DropBox';
import PostDatePicker from './PostDatePicker';


const PostForm: React.FC = () => {
  const categories = ["배달", "청소", "조립", "역할 대행", "동행·돌봄", "반려동물", "벌레 퇴치", "기타"]
  const [selectedItem, setSelectedItem] = useState('')
  const [dateValue, setDateValue] = useState(null)
  const onChangeCategory = (item:string):void => {
    setSelectedItem(item)
  }
  return (
    <>
      <DropBox itemList={categories} selectedState={selectedItem} onChangeHandler={onChangeCategory} />
      <input type="text" />
      <input type="text" />
      <textarea />
      <PostDatePicker/>
    </>
  )
}

export default PostForm