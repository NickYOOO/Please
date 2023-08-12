export interface Like {
  id: number;
  likes: number;
}

export interface GetLikesResponse {
  likes: Like[];
}


export interface IMsg{
  toUser: string,
  fromUser: string,
  timeStamp: number,
  content: string,
  id: string
}
