import { styled } from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  height: 2000px;
  margin: 0 auto;
  background-color: beige;
`;

export const StTopBtn = styled.button`
  border: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 30px;
  bottom: 30px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  width: 40px;
  height: 40px;
  padding: 10px;
  border-radius: 20px;
  transition: all 0.4s;
`
