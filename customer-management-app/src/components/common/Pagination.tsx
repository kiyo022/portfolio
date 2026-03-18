import React from "react";
import ReactPaginate from "react-paginate";

export type PaginationProps = {
  totalCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const PAGE_SIZE = 50;

/**
 * ページネーションコンポーネント
 */
const Pagination: React.FC<PaginationProps> = ({
  totalCount,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  if (totalPages <= 1) {
    return null;
  }

  const handlePageChange = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
    >
      <ReactPaginate
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName="pagination"
        activeClassName="active"
        previousLabel="前へ"
        nextLabel="次へ"
        breakLabel="..."
        forcePage={currentPage - 1}
      />
    </div>
  );
};

export default Pagination;
