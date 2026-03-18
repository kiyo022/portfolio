import React from "react";
import Button from "./Button";

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

  // コンテナのスタイル
  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "var(--spacing-4)",
    margin: "var(--spacing-8) 0",
  };

  // ページ情報のスタイル
  const pageInfoStyle: React.CSSProperties = {
    color: "var(--text-primary)",
    fontSize: "var(--text-base)",
    minWidth: "120px",
    textAlign: "center",
  };

  // ボタンコンテナのスタイル
  const buttonContainerStyle: React.CSSProperties = {
    display: "flex",
    gap: "var(--spacing-2)",
  };

  return (
    <div style={containerStyle}>
      {/* 前へボタン */}
      <div style={buttonContainerStyle}>
        <Button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          variant="secondary"
          disabled={currentPage === 1}
        >
          ◀ 前へ
        </Button>
      </div>

      {/* ページ情報 */}
      <div style={pageInfoStyle}>
        {currentPage} / {totalPages} ページ
      </div>

      {/* 次へボタン */}
      <div style={buttonContainerStyle}>
        <Button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          variant="secondary"
          disabled={currentPage === totalPages}
        >
          次へ ▶
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
