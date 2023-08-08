import { useRef } from "react";
import { styled } from "styled-components";

const CategoryLi = styled.li`
  
`

const PostPage = () => {
  const BoxRef = useRef(null);
  const categorys: string[] = ["배달", "청소", "조립", "역할대행", "동행,돌봄", "반려동물", "벌레퇴치", "기타"]
  return (
    <>
      <ul ref={BoxRef}>
        {categorys.map((item, i) => <li key="i">{item}</li> )}
      </ul>
    </>
  );
};

export default PostPage;
