import { DatePicker, Space } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { onChangeFormfuncType } from './PostForm';
dayjs.extend(customParseFormat);

interface PostDatePickerProps {
  onChangeFormHandler: onChangeFormfuncType;
}

const PostDatePicker = ({ onChangeFormHandler }: PostDatePickerProps) => {
  const disabledDate: RangePickerProps['disabledDate'] = current => {
    return current && current < dayjs().endOf('day');
  };

  const onChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      const year = date.year();
      const month = date.month() + 1;
      const day = date.date();
      const SelectedDate = `${year}년 ${month}월 ${day}일`;
      onChangeFormHandler('date', SelectedDate);
    } else {
      onChangeFormHandler('date', null);
    }
  };
  return (
    <Space direction="vertical" size={12}>
      <DatePicker name="date" format="YYYY-MM-DD" disabledDate={disabledDate} onChange={onChange} placeholder="날짜 선택" />
    </Space>
  );
};

export default PostDatePicker;
