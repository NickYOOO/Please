import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getLikes, patchLikes } from '../../api/likes';

import type { Like } from '../types';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiTwotoneHeart } from 'react-icons/ai';

const Likes: React.FC = () => {
  const queryClient = useQueryClient();
  const email = 'kitae@kitae.kitae';
  // auth.current.email을 뽑아서 활용하라.

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
            Like: {like.likes} <button onClick={() => handleLike(like)}>{like.likes % 2 !== 0 ? <AiOutlineHeart size="20" color="#0074DD" /> : <AiTwotoneHeart size="20" color="#0074DD" />}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Likes;
