import { styled } from 'styled-components';

interface InnerProps {
  size?: 'medium' | 'small';
}

export const Outer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: #00000029;
  z-index: 999;
`;

export const Inner = styled.div<InnerProps>`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 170px 16px 0 16px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 5px 5px 12px rgba(23, 23, 23, 0.3);

  ${({ size }) => {
    switch (size) {
      case 'medium':
        return `
        width: 500px;
        height: 60%;
        `;
      case 'small':
        return `
          justify-content: center;
          align-items: center;

          gap: 20px;
          margin: 340px 16px 0 16px;
          text-align: center;
          line-height: 30px;
          width: 360px;
          height: 220px;
          padding: 5px 10px;
          
        `;
      default:
        return `
          width: 500px;
          height: 60%;
        `;
    }
  }}
`;

export const InnerBox = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  z-index: 1;
  top: 20px;
  left: -15px;
  width: 100%;

  & > button {
    background: none;
    border: none;
  }
`;
