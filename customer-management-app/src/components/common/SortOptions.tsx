import type React from "react";

type SortOptionsProps = {
  // ソートオプションの変更コールバック
  onSortChangeSort?: (
    sortBy: "customer_name" | "created_at" | "updated_at",
  ) => void;
  onSortChangeOrder?: (sortOrder: "asc" | "desc") => void;
  // インラインスタイル
  style?: React.CSSProperties;
};

export const SortOption: React.FC<SortOptionsProps> = ({
  onSortChangeSort,
  onSortChangeOrder,
  style = {},
}) => {
  const baseStyles: React.CSSProperties = {
    fontWeight: "var(--font-weight-semibold)",
    borderRadius: "var(--radius-md)",
    transition: "all var(--transition-base)",
    cursor: "pointer",
    border: "1px solid var(--border-color)",
    backgroundColor: "var(--bg-secondary)",
    fontFamily: "var(--font-family-sans)",
    fontSize: "var(--text-base)",
  };

  const variantStyles: React.CSSProperties = {
    backgroundColor: "var(--bg-secondary)",
    color: "var(--text-primary)",
    border: "1px solid var(--border-color)",
  };

  const sizeStyles: React.CSSProperties = {
    padding: "var(--spacing-2) var(--spacing-6)",
    fontSize: "var(--text-base)",
  };

  const mergedStyles = {
    ...baseStyles,
    ...variantStyles,
    ...sizeStyles,
    ...style,
  };
  return (
    <div>
      <select
        onChange={(e) =>
          onSortChangeSort?.(
            e.target.value as "customer_name" | "created_at" | "updated_at",
          )
        }
        style={mergedStyles}
      >
        <option value="customer_name">名前</option>
        <option value="created_at">作成日</option>
        <option value="updated_at">更新日</option>
      </select>
      <select
        onChange={(e) => onSortChangeOrder?.(e.target.value as "asc" | "desc")}
        style={mergedStyles}
      >
        <option value="asc">昇順</option>
        <option value="desc">降順</option>
      </select>
    </div>
  );
};
