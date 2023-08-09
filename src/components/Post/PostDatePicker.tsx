import React from 'react';

import type { Dayjs } from 'dayjs';

import { DatePicker, Space } from 'antd';


const PostDatePicker: React.FC = () => {
  
  const onChange = (date: Dayjs | null, dateString: string) => {
    if (date) {
      console.log(date.year());
    } else {
      console.log('Clear');
    }
  };
  return (
    <Space direction="vertical" size={12}>
    <DatePicker
      onChange={onChange}
    />
  </Space>
  )
}

export default PostDatePicker