import React from 'react';
import * as Styled from './Footer.styles';
import { FaGithub, FaFigma } from 'react-icons/fa';
import { SiNotion } from 'react-icons/si';

const Footer = () => {
  if (!['/signup', '/login', '/', '/post', '/board', '/detail/:id', '/user/:id', '/report'].includes(window.location.pathname)) return null;

  return (
    <Styled.FooterLayout>
      <p>SpartaCodingClub</p>
      <p>유지완, 임선우, 최윤서, 임수빈, 박기태</p>
      <p> &copy; 2023 이야~ All rights reserved</p>

      <Styled.FooterBox>
        <a href="https://github.com/NickYOOO/Please">
          <FaGithub size="35" color="#ff6f2c" />
        </a>
        <a href="https://www.figma.com/file/rTVLj1VOeiFSdYN4N9Qpct/%EB%B6%80%ED%83%81%ED%95%B4?type=design&node-id=0-1&mode=design&t=4CFhikaX2p6gtRzv-0https://www.figma.com/file/rsgKzR7L6PkEChGLXin56x/5%EC%A1%B0%3A-%EB%8B%B9%EC%8B%A0%EC%9D%98-%EB%AC%B8%ED%99%94%EC%9C%A0%EC%82%B0-%EB%8B%B5%EC%82%AC%EA%B8%B0---Design?type=design&node-id=126%3A153&mode=design&t=ESyyUcq3jTfhx52s-1">
          <FaFigma size="35" color="#ff6f2c" />
        </a>
        <a href="https://teamsparta.notion.site/2-fd5ba9c720454186bda02ce887e68461">
          <SiNotion size="35" color="#ff6f2c" />
        </a>
      </Styled.FooterBox>
    </Styled.FooterLayout>
  );
};

export default Footer;
