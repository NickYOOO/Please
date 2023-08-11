import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addBookmark, getBookmark, delBookmark } from '../../api/bookmark';

import type { Bookmark as BookmarkType } from '../types';
import { AxiosError } from 'axios';

const Bookmark: React.FC = () => {
  const queryClient = useQueryClient();
  const email = 'kitae@kitae.kitae';
  // json 서버 어스의 현재 로그인한 사람의 email

  const { data, isLoading, isError } = useQuery(
    ['bookmark', email],
    getBookmark,
  );

  // 추가할 때 사용하는 뮤테이션
  // const addBookmarkMutation = useMutation(addBookmark, {
  //   onSuccess: () => {
  //     queryClient.invalidateQueries('bookmark');
  //   },
  // });

  // const BookmarkRemoveHandler = (id: string) => {
  //   addBookmarkMutation.mutate({ email, postid });
  // };

  const delBookmarkMutation = useMutation(delBookmark, {
    onSuccess: () => {
      queryClient.invalidateQueries('bookmark');
    },
  });

  const BookmarkRemoveHandler = (id: string) => {
    delBookmarkMutation.mutate(id);
  };

  if (isLoading || !data) {
    return <div>로딩중</div>;
  }

  return (
    <div>
      <ul>
        {data.map(bookmark => {
          return (
            <li key={bookmark.id}>
              <span>{bookmark.postTitle}</span>
              <button onClick={() => BookmarkRemoveHandler(bookmark.id)}>
                북마크 제거
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Bookmark;
