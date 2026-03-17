/**
 * 顧客一覧表示コンポーネント
 * 複数の顧客情報をカードで表示、検索・フィルタリング機能を提供
 */
import React, { useState } from "react";
import { debounce } from "../../lib/utils";
import type { Customer } from "../../types";
import Button from "../common/Button";
import CustomerCard from "./CustomerCard";

interface CustomerListProps {
  // 顧客データの配列
  customers: Customer[];

  // ローディング状態
  isLoading: boolean;

  // エラーメッセージ
  error?: string | null;

  // 検索実行時のコールバック
  onSearch: (query: string) => Promise<void>;

  // 顧客削除時のコールバック
  onDelete: (id: string) => Promise<void>;

  // 新規顧客追加画面へ遷移するコールバック
  onAddNew: () => void;
}

/**
 * 顧客一覧コンポーネント
 */
const CustomerList: React.FC<CustomerListProps> = ({
  customers,
  isLoading,
  error,
  onSearch,
  onDelete,
  onAddNew,
}) => {
  // 検索入力値の状態
  const [searchQuery, setSearchQuery] = useState("");

  /**
   * デバウンス処理を施した検索関数
   * 入力から 300ms 後に検索を実行
   */
  const debouncedSearch = debounce(async (query: string) => {
    await onSearch(query);
  }, 300);

  /**
   * 検索入力値の変更ハンドラ
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // コンテナのスタイル
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-4)",
  };

  // ヘッダーのスタイル（修正）
  const headerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "var(--spacing-6)",
    paddingRight: "var(--spacing-2)",
  };

  // タイトルのスタイル
  const titleStyle: React.CSSProperties = {
    fontSize: "var(--text-3xl)",
    fontWeight: "var(--font-weight-bold)",
    color: "var(--text-primary)",
    margin: 0,
  };

  // 検索ボックス関連のスタイル
  const searchContainerStyle: React.CSSProperties = {
    display: "flex",
    gap: "var(--spacing-2)",
    flex: 1,
    maxWidth: "500px",
  };

  const searchInputStyle: React.CSSProperties = {
    flex: 1,
    padding: "var(--spacing-2) var(--spacing-3)",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--border-color)",
    backgroundColor: "var(--bg-primary)",
    color: "var(--text-primary)",
    fontSize: "var(--text-base)",
    fontFamily: "var(--font-family-sans)",
    transition: "all var(--transition-base)",
  };

  // ローディング表示のスタイル
  const loadingStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "var(--spacing-8)",
    fontSize: "var(--text-lg)",
    color: "var(--text-secondary)",
  };

  // エラー表示のスタイル
  const errorStyle: React.CSSProperties = {
    padding: "var(--spacing-4)",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    border: "1px solid var(--color-danger-500)",
    borderRadius: "var(--radius-md)",
    color: "var(--color-danger-600)",
    marginTop: "var(--spacing-4)",
  };

  // 空状態のスタイル
  const emptyStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "var(--spacing-8)",
    fontSize: "var(--text-lg)",
    color: "var(--text-secondary)",
  };

  // グリッドレイアウトのスタイル
  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "var(--spacing-4)",
  };

  return (
    <div style={containerStyle}>
      {/* ヘッダー（タイトルと新規追加ボタン） */}
      <div style={headerStyle}>
        <h2 style={titleStyle}>顧客一覧</h2>
        <Button onClick={onAddNew} size="lg" style={{ whiteSpace: "nowrap" }}>
          ➕ 新規顧客追加
        </Button>
      </div>

      {/* 検索ボックス */}
      <div style={searchContainerStyle}>
        <input
          type="text"
          placeholder="名前、メール、電話番号で検索..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={searchInputStyle}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "var(--color-primary-600)";
            e.currentTarget.style.boxShadow =
              "0 0 0 3px rgba(2, 132, 199, 0.1)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "var(--border-color)";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
      </div>

      {/* エラーメッセージ表示 */}
      {error && <div style={errorStyle}>❌ {error}</div>}

      {/* ローディング状態 */}
      {isLoading ? (
        <div style={loadingStyle}>⏳ 読み込み中...</div>
      ) : customers.length === 0 ? (
        // 空状態
        <div style={emptyStyle}>
          {searchQuery
            ? "該当する顧客が見つかり��せん"
            : "顧客がまだ登録されていません"}
        </div>
      ) : (
        // 顧客一覧（グリッドレイアウト）
        <div style={gridStyle}>
          {customers.map((customer) => (
            <CustomerCard
              key={customer.customer_id}
              customer={customer}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerList;
