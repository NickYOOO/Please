import { Button } from 'antd';
import { styled } from 'styled-components';

export const ContentsBox = styled.div`
  width: 50%;
  min-width: 400px;
`;
export const DetailContentsTopBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 30px;
  /* padding: 0 16px; */

  & > .ant-select .ant-select-arrow {
    color: #f9f7f1;
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
  height: 300px;
  margin-top: 10px;
  padding: 20px;
  background-color: #f9f7f1;
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
    color: #3382d9;
    font-size: 14px;
    font-weight: 300;
  }
`;

export const DetailContentsBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  & > img {
    /* margin-right: 35px; */
    width: 200px;

    @media (max-width: 1111px) {
      display: none;
    }
  }

  & > div {
    width: 55%;
  }
`;

export const DetailTitleParagraph = styled.p`
  font-size: 22px;
  font-weight: 400;
`;

export const DetailContentParagraph = styled.p`
  margin-top: 24px;
  max-width: 340px;
  font-size: 16px;
  font-weight: 200;
  line-height: 27px;
`;

export const DetailLabelBox = styled.div`
  display: flex;

  width: 100%;
  gap: 10px;
  margin-top: 90px;

  & > label {
    width: 100%;
    padding: 5px 7px;
    background-color: #ffffff;
    /* border: 2px solid #0074dd; */
    border-radius: 10px;
    text-align: center;
  }
  @media (max-width: 1111px) {
    margin-top: 80px;
  }
`;

export const DetailButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 400px;
  margin: 0 auto;

  text-align: center;

  padding: 30px 10px;
`;

export const DetailButton = styled(Button)`
  display: flex;
  align-items: center;
  background-color: #3382d9;
  border-radius: 8px;
  color: #ffffff;
  font-size: 18px;

  &:hover {
    color: #ffffff !important;
    border-color: #0074dd !important;
  }
`;
