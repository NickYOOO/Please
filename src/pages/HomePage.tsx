import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import mainImage from '../assets/img/main.gif';

const HomePage = () => {
  return (
    <StyledBox>
      <StyledTitleBox>
        <StyledPtag>우리 동네 심부름 서비스</StyledPtag>
        <StyledH1>부탁해</StyledH1>
        <StyledH2>도움이 필요할 때,</StyledH2>
        <StyledH2>쉽고 빠르게 대신 해결해 드려요!</StyledH2>
        <StyledLink to="/boardPage">
          <StyledButton>부탁하러 가기</StyledButton>
        </StyledLink>
      </StyledTitleBox>
      <StyledPhotoBox>
        <StyledImg src={mainImage} alt="main 이미지"></StyledImg>
      </StyledPhotoBox>
    </StyledBox>
  );
};

export default HomePage;

const StyledBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #ffce00;

  height: calc(100vh - 148px);
`;
const StyledTitleBox = styled.div`
  width: 25%;
`;
const StyledPhotoBox = styled.div`
  display: flex;
  align-items: center;
`;
const StyledImg = styled.img`
  width: 600px;
`;
const StyledPtag = styled.p`
  font-size: 27px;
  padding-left: 5px;
`;
const StyledH1 = styled.h1`
  font-size: 100px;
  font-family: 'Cafe24Ssurround';

  padding: 15px 0 20px;
`;
const StyledH2 = styled.h2`
  font-size: 24px;
  font-family: 'HakgyoansimWoojuR';

  padding-left: 5px;
  padding-bottom: 7px;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
`;
const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 30px;

  width: 200px;
  height: 50px;

  font-size: 25px;

  cursor: pointer;

  color: white;
  background-color: #0074dd;

  border: none;
  border-radius: 10px;
  transition: 0.4s;
  &:hover {
    color: #ff004c;
    background-color: white;
    border: 1px solid #ff004c;
  }
`;
