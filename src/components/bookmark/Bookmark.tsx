import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addBookmark, getBookmark, delBookmark } from '../../api/bookmark';
import useLogInUser from '../../hooks/useLoginUser';

const Bookmark: React.FC = () => {
  return <></>;
};
//   const queryClient = useQueryClient();
//   const user = useLogInUser();
//   const email = user.email;

//   const { data, isLoading, isError } = useQuery(['bookmark', email], getBookmark);

//   const delBookmarkMutation = useMutation(delBookmark, {
//     onSuccess: () => {
//       queryClient.invalidateQueries('bookmark');
//     },
//   });

//   const BookmarkRemoveHandler = (id: string) => {
//     delBookmarkMutation.mutate(id);
//   };

//   if (isLoading || !data) {
//     return <div>로딩중</div>;
//   }

//   return (
//     <div>
//       <ul>
//         {data.map(bookmark => {
//           return (
//             <li key={bookmark.id}>
//               <span>{bookmark.postTitle}</span>
//               <button onClick={() => BookmarkRemoveHandler(bookmark.id)}>북마크 제거</button>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// };

export default Bookmark;
