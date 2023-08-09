import { Button } from 'antd';
import { styled } from 'styled-components';

export const DetailContentsTopBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;

  & > .ant-select .ant-select-arrow {
    color: #0074dd;
  }
`;

export const UserBox = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  border-radius: 8px;
  gap: 10px;

  & > img {
    width: 30px;
    border-radius: 50%;
  }
`;

export const DetailContentsLayout = styled.div`
  margin-top: 10px;
  padding: 10px;
  background-color: #ffefab;
  border-radius: 10px;
`;

export const DetailBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  p {
    padding-top: 5px;
    color: #0074dd;
    font-size: 14px;
    font-weight: 300;
  }
`;

export const DetailContentsBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  & > img {
    margin-right: 35px;
    width: 200px;
  }
`;

export const DetailTitleParagraph = styled.p`
  font-size: 22px;
  font-weight: 400;
`;

export const DetailContentParagraph = styled.p`
  margin-top: 24px;
  max-width: 450px;
  font-size: 16px;
  font-weight: 200;
`;

export const DetailLabelBox = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 30px;

  & > label {
    width: 200px;
    padding: 5px 10px;
    background-color: #ffffff;
    border: 2px solid #0074dd;
    border-radius: 10px;
    text-align: center;
  }
`;

export const DetailButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 960px;
  margin: 0 auto;
  padding: 20px 10px 0 10px;
  text-align: center;
`;

export const DetailButton = styled(Button)`
  display: flex;
  align-items: center;
  background-color: #0074dd;
  border-radius: 8px;
  color: #ffffff;
  font-size: 18px;

  &:hover {
    color: #ffffff !important;
    border-color: #0074dd !important;
  }
`;
