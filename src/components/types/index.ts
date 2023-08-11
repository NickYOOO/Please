export interface Like {
  id: number;
  likes: number;
}

export interface GetLikesResponse {
  likes: Like[];
}
