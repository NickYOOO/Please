import React, { useState } from 'react';
import Pagination from 'react-js-pagination';
import { styled } from 'styled-components';

const Paging: React.FC = () => {
  const [page, setPage] = useState<number>(1);

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    console.log(page);
  };

  return (
    <StyledPagination>
      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={450}
        pageRangeDisplayed={5}
        prevPageText={'‹'}
        nextPageText={'›'}
        onChange={pageNumber => handlePageChange(pageNumber)} // 이 부분 수정
      />
    </StyledPagination>
  );
};

export default Paging;

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;

  ul {
    display: flex;
    list-style: none;
    padding: 0;
  }

  ul.pagination li {
    display: inline-block;
    width: 27px;
    height: 27px;

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;

    &:first-child {
      border-radius: 5px 0 0 5px;
    }

    &:last-child {
      border-radius: 0 5px 5px 0;
    }

    a {
      text-decoration: none;
      color: #337ab7;
      font-size: 13px;

      &.active {
        color: white;
      }

      &:hover,
      &.active {
        color: blue;
      }
    }

    &.active {
      border-radius: 50%;
      background-color: #b6d2ea;
    }
  }

  .page-selection {
    width: 48px;
    height: 30px;
    color: #337ab7;
  }
`;
