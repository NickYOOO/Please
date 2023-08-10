import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getBookmark } from '../../api/bookmark';

import type { Bookmark } from '../types';

const Bookmark: React.FC = () => {
  const queryClient = useQueryClient();
  const email = 'kitae@kitae.kitae';
  // auth.current.email을 뽑아서 활용하라.

  const { data, isLoading, isError } = useQuery<Bookmark[], Error>('bookmark');

  if (isLoading || !data) {
    return <div>로딩중</div>;
  }

  return (
    <div>
      <ul></ul>
    </div>
  );
};
export default Bookmark;
