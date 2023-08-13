export interface Like {
  id: number;
  likes: number;
}

export interface GetLikesResponse {
  likes: Like[];
}

export interface Bookmark {
  email: string;
  postid: number;
  id: string;
  postTitle: string;
}

export interface IMsg {
  postId: string | undefined;
  toUser: string | undefined;
  fromUser: string;
  fromUsername: string;
  timeStamp: number;
  content: string;
  id: string;
}

export interface logInUserProps {
  email: string;
  username: string;
  id: number | string;
  imgUrl: string;
}

export interface UserData extends logInUserProps {
  imgUrl: string;
  password: string
}
