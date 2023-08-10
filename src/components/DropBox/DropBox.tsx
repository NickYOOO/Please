import React, { useState } from 'react'
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import { AiOutlineCaretDown } from "react-icons/ai";
import { styled } from 'styled-components';
import { onChangeFormfuncType } from '../Post/PostForm';
interface DropDownProps {
  itemList: string[];
  selectedState: string;
  onChangeFormHandler: onChangeFormfuncType
}

const DropBox = ({ itemList, selectedState, onChangeFormHandler }: DropDownProps) => {

  const items: MenuProps['items'] = itemList.map((item, i) => {
    return {
      key: i,
      label: (
        <option onClick={() => onChangeFormHandler('category', item)}>
          {item}
        </option>
      ),
    }
  });
  return (
    <Space wrap direction="vertical">
      <Dropdown menu={{ items }}>
        <StyledDropBtn><span>{selectedState || "카테고리"}</span><AiOutlineCaretDown size="20px"></AiOutlineCaretDown></StyledDropBtn>
      </Dropdown>
    </Space>
  )
}



const StyledDropBtn = styled(Button)`
  display: flex;
  align-items: center;
`

export default DropBox