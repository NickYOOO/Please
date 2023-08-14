# 🥺 부탁해 - PLEASE

우리 동네 심부름 서비스

2023.08.07-2023.08.13

---

### 🧷 팀구성

| 임선우 | 임수빈 | 박기태 | 유지완 | 최윤서 |

### 🧷 목차

- [프로젝트 소개](#프로젝트-소개)
- [배포 주소](#배포-주소)
- [와이어 프레임](#와이어-프레임)
- [기술스택](#기술스택)
- [Project Structure](#project-structure)
- [API Table](#api-table)
- [페이지](#페이지)

### 프로젝트 소개

**부탁해 PLEASE** (우리 동네 심부름 서비스)

"도움이 필요할 때, 쉽고 빠르게 심부름을 해결해드려요!”

> 카카오맵 api를 활용하고 있습니다. 도움이 필요한 내용을 지도 정보와 함께 제공하고 있습니다.

> 쪽지 보내기 기능을 통해 게시글 작성자와 소통할 수 있습니다.

어려움이 있을 때 부탁해 PLEASE를 통해 쉽고 빠르게 해결해 보세요!

### 배포 주소

추가예정

### 와이어 프레임

![image](https://github.com/NickYOOO/Please/assets/125546973/8aec0d44-6080-4ea9-bd5a-0ab7658773c4)
![image](https://github.com/NickYOOO/Please/assets/125546973/0874383b-8a19-44f1-973c-ac938c0bddf5)

### 기술스택

<img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white"><img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white"><img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"><img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"><img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"><img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"><img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"><img src="https://img.shields.io/badge/kakaomap-FFCD00?style=for-the-badge&logo=kakao&logoColor=white"><img src="https://img.shields.io/badge/typescript-ffffff?style=for-the-badge&logo=typescript">

### Project Structure

```sh
📦db.json                   # json 서버
 ┃ ┗ 📂db.json
📦src
 ┣ 📂api                    # API 요청 함수를 모아놓은 폴더
 ┣ 📂components             # 컴포넌트들을 모아놓은 폴더
 ┣ 📂hooks                  # hooks를 모아놓은 폴더
 ┣ 📂pages                  # 페이지별 컴포넌트를 모아놓은 폴더
 ┃ ┣ 📂HomePage.tsx         # 메인 페이지를 보여주는 컴포넌트
 ┃ ┣ 📂DetailPage.tsx       # 요청 글 상세페이지를 보여주는 컴포넌트
 ┃ ┣ 📂BoardPage.tsx        # 요청 게시판을 보여주는 컴포넌트
 ┃ ┣ 📂UserPage.tsx         # 마이페이지를 보여주는 컴포넌트
 ┃ ┣ 📂SignUpPage.tsx       # 회원가입 페이지를 보여주는 컴포넌트
 ┃ ┣ 📂LoginPage.tsx        # 로그인 페이지를 보여주는 컴포넌트
 ┃ ┣ 📂PostPage.tsx         # 요청 글 작성 페이지를 보여주는 컴포넌트
 ┃ ┗ 📂Update.tsx           # 글 수정 페이지를 보여주는 컴포넌트
 ┣ 📂shared
 ┃ ┗📂Router.js             # Router 설정 파일
 ┣ 📂assets                 # 이미지 파일
 ┃

```

### API Table

| API 이름     | Method   | Request                                                                                                                                 | Response                                                                                                                               |
| ------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| 로그인       | `POST`   | {"email": "string", "password": "string"}                                                                                               |                                                                                                                                        |
| 회원가입     | `POST`   | {"email": "string", "password": "string", ”nickname”:”string”, “userImgUrl”: null}                                                      |                                                                                                                                        |
| 내 정보 수정 | `POST`   | {"email": "string", "password": "string", ”nickname”:”string”, “userImgUrl”: null}                                                      |                                                                                                                                        |
| 게시글 추가  | `POST`   | {uid: string, email: string, category: string, title: string, content:string, postImgUrl: string, location: {lat: number, lng: number}} |                                                                                                                                        |
| 게시글 조회  | `GET`    |                                                                                                                                         | {uid: string, email: string, category: string,title: string, content:string, postImgUrl: string, location: {lat: number, lng: number}} |
| 게시글 수정  | `PATCH`  | {uid: string, email: string, category: string, title: string,content:string, postImgUrl: string, location: {lat: number, lng: number}}  |
| 게시글 삭제  | `DELETE` | {id: string}                                                                                                                            |
| 찜하기       | `POST`   | {postId : string, uid : string}                                                                                                         |
| 찜 취소하기  | `DELETE` | {postId : string}                                                                                                                       |
| 쪽지 작성    | `POST`   | {uId : string, fromUserId : string, toUserId : string, content : string, time : timestamp}                                              |
| 쪽지 조회    | `GET`    |                                                                                                                                         | {uId : string, fromUserId : string, toUserId : string, content : string, time : timestamp}                                             |

### 페이지

#### 메인 페이지

<img width="1440" alt="image" src="https://github.com/setItUpLater/comeit/assets/125546973/97ed100b-f315-4d13-801b-9b19ae3e2f07">

#### 로그인/회원가입 페이지

![image](https://github.com/NickYOOO/Please/assets/125546973/7e626b3e-0c58-49e0-803f-3d12ac7e4123)
![image](https://github.com/NickYOOO/Please/assets/125546973/4da42f9c-4ce8-4a45-8123-76405cc839f5)
![image](https://github.com/NickYOOO/Please/assets/125546973/68101d29-68d8-4454-9341-427f7e9385cc)

유효성 검증 있음, 로그인 또는 회원가입 성공 시 자동 페이지 이동.

#### 요청 게시판 페이지

![image](https://github.com/NickYOOO/Please/assets/125546973/6b8d7162-b135-4dbf-93c4-7427473ad5f1)
<img width="1440" alt="스크린샷 2023-08-14 오전 11 11 24" src="https://github.com/NickYOOO/Please/assets/125546973/23a47870-c636-4d17-a6cb-a66055509135">

카테고리별 요청 게시물 분류, 리액트쿼리 useInfiniteQuery를 적용한 무한스크롤 구현

#### 게시물 상세 페이지

<img width="1440" alt="스크린샷 2023-08-14 오전 11 07 51" src="https://github.com/NickYOOO/Please/assets/125546973/3a4fa6d1-51f6-41d6-a0d0-5464debefc59">

게시글 작성 시 마커로 지정한 위치 기준 반경 300m 위치가 표시됨.
정확한 위치는 개인 정보 보호차 표시하지 않음.

#### 마이페이지

![image](https://github.com/NickYOOO/Please/assets/125546973/551765d7-b12c-4352-95cc-36203e038360)

닉네임과 유저 사진 수정 가능, 내가 쓴 게시물과 찜한 게시물 확인할 수 있음.

#### 쪽지 기능 (받은 쪽지/보낸 쪽지)

![image](https://github.com/NickYOOO/Please/assets/125546973/7872b43e-9c0d-45ca-9a32-d6ddf1b85bb0)

![image](https://github.com/NickYOOO/Please/assets/125546973/b3708026-de1b-4f70-beb8-45aeb5942f37)
