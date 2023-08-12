import { styled } from 'styled-components';

export const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding-top: 60px;

  min-height: calc(100vh - 186px);
`;
export const StyledContentsBox = styled.div`
  width: 50%;
  min-width: 600px;
`;

export const StyledChooseBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 30px;

  & > label {
    color: dark;
  }
`;

export const StyledRequestBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 49%;
  margin-bottom: 15px;

  & > .ant-input-affix-wrapper {
    margin-bottom: 25px;
  }
`;
export const StyledPhotoBox = styled.div`
  width: 49%;

  & > img {
    width: 235px;
    height: 235px;
    object-fit: cover;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    transition: 0.2s;
    &:hover {
      border-color: #4096ff !important;
    }
  }
`;
export const StyledButtonBox = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 30px;

  gap: 10px;

  & > button {
    width: 70px;
    height: 25px;

    cursor: pointer;

    border: none;
    border-radius: 10px;

    transition: 0.4s;
    &:hover {
      background-color: #a6d1ff !important;
    }
  }
`;

export const Label = styled.label`
  cursor: pointer;
`;

export const ImageInput = styled.input`
  display: none;
`;
