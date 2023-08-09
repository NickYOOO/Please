import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getLikes, patchLikes } from '../../api/likes';

import type { Like } from '../types';
import { FaRegBookmark } from 'react-icons/fa';
import { FaBookmark } from 'react-icons/fa';

const Bookmark: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: likes = [] } = useQuery<Like[], Error>('likes', getLikes);

  const likeMutation = useMutation(patchLikes, {
    onMutate: (like: Like) => {
      // Optimistic Update
      queryClient.setQueryData<Like[]>('likes', prevData => {
        if (!prevData) return [];
        return prevData.map(currentLike => (currentLike.id === like.id ? { ...currentLike, likes: like.likes + 1 } : currentLike));
      });
    },
  });

  const handleLike = (like: Like) => {
    likeMutation.mutate(like);
  };
  return (
    <div>
      <ul>
        {likes?.map(like => (
          <li key={like.id}>
            Like: {like.likes} <button onClick={() => handleLike(like)}>{like.likes % 2 !== 0 ? <FaRegBookmark size="20" color="#0074DD" /> : <FaBookmark size="20" color="#0074DD" />}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Bookmark;
