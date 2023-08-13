import Pagination from 'react-js-pagination';
import { styled } from 'styled-components';

interface PagingProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalItemsCount: number;
}
const Paging = ({ page, setPage, totalItemsCount }: PagingProps) => {
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    // console.log(pageNumber);
  };

  return (
    <StyledPagination>
      <Pagination activePage={page} itemsCountPerPage={3} totalItemsCount={totalItemsCount} pageRangeDisplayed={5} prevPageText={'‹'} nextPageText={'›'} onChange={handlePageChange} />
    </StyledPagination>
  );
};

export default Paging;

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;

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
