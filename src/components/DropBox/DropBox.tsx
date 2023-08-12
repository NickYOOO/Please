import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { FaStarOfLife } from 'react-icons/fa';
import { styled } from 'styled-components';
import { onChangeFormfuncType } from '../Post/PostForm';

interface DropDownProps {
  itemList: string[];
  selectedState: string;
  onChangeFormHandler: onChangeFormfuncType;
}

const DropBox = ({ itemList, selectedState, onChangeFormHandler }: DropDownProps) => {
  const items: MenuProps['items'] = itemList.map((item, i) => {
    return {
      key: i,
      label: <option onClick={() => onChangeFormHandler('category', item)}>{item}</option>,
    };
  });
  return (
    <Space wrap direction="vertical">
      <Dropdown menu={{ items }}>
        <StyledDropBtn>
          <span>
            <FaStarOfLife size={6} color="#FF004C" />
            &nbsp;{selectedState || '카테고리 선택'}
          </span>
          <AiOutlineCaretDown size="20px"></AiOutlineCaretDown>
        </StyledDropBtn>
      </Dropdown>
    </Space>
  );
};

const StyledDropBtn = styled(Button)`
  display: flex;
  align-items: center;
`;

export default DropBox;
