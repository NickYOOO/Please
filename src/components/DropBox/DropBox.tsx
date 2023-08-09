import React, { useState } from 'react'
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import {AiOutlineCaretDown} from "react-icons/ai";
import { styled } from 'styled-components';
interface DropDownProps {
  itemList: string[];
  selectedState: string;
  onChangeHandler: (item:string)=>void
}

const DropBox = ({ itemList, selectedState, onChangeHandler }: DropDownProps) => {

  const items: MenuProps['items'] = itemList.map((item, i) => {
    return {
      key: i,
      label: (
        <h1 onClick={()=>onChangeHandler(item)}>
          {item}
        </h1>
      ),
    }
  });
  return (
    <Space direction="vertical">
    <Space wrap>
      <Dropdown menu={{ items }}>
        <StyledDropBtn><span>{selectedState || "카테고리"}</span><AiOutlineCaretDown size="20px"></AiOutlineCaretDown></StyledDropBtn>
      </Dropdown>
    </Space>
  </Space>
  )
}



const StyledDropBtn = styled(Button)`
  display: flex;
  align-items: center;
`

export default DropBox