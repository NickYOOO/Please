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
