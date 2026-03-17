/**
 * 顧客情報カードコンポーネント
 * 顧客一覧での個別表示やプレビューに使用
 */
import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../lib/utils";
import type { Customer } from "../../types";
import Button from "../common/Button";
import Card from "../common/Card";

interface CustomerCardProps {
  // 表示する顧客データ
  customer: Customer;

  // 削除時のコールバック
  onDelete?: (id: string) => void;
}

/**
 * 顧客情報カードコンポーネント
 */
const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onDelete }) => {
  // コンテナのスタイル
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-3)",
  };

  // ヘッダー（顧客名など）のスタイル
  const headerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    gap: "var(--spacing-2)",
  };

  // 顧客名のスタイル
  const nameStyle: React.CSSProperties = {
    fontSize: "var(--text-lg)",
    fontWeight: "var(--font-weight-semibold)",
    color: "var(--text-primary)",
    margin: 0,
  };

  // 情報セクションのスタイル
  const infoStyle: React.CSSProperties = {
    display: "grid",
    gap: "var(--spacing-2)",
  };

  // 情報行のスタイル
  const infoRowStyle: React.CSSProperties = {
    display: "flex",
    gap: "var(--spacing-2)",
    fontSize: "var(--text-sm)",
    color: "var(--text-secondary)",
  };

  // ラベルのスタイル
  const labelStyle: React.CSSProperties = {
    fontWeight: "var(--font-weight-medium)",
    color: "var(--text-secondary)",
    minWidth: "60px",
  };

  // 値のスタイル
  const valueStyle: React.CSSProperties = {
    color: "var(--text-primary)",
    wordBreak: "break-all",
  };

  // アクションボタン群のスタイル
  const actionsStyle: React.CSSProperties = {
    display: "flex",
    gap: "var(--spacing-2)",
    marginTop: "var(--spacing-2)",
  };

  // 日付情報のスタイル
  const dateStyle: React.CSSProperties = {
    fontSize: "var(--text-xs)",
    color: "var(--text-tertiary)",
    marginTop: "var(--spacing-2)",
  };

  return (
    <Card hoverable>
      <div style={containerStyle}>
        {/* ヘッダー：顧客名 */}
        <div style={headerStyle}>
          <h3 style={nameStyle}>{customer.customer_name}</h3>
        </div>

        {/* 情報セクション */}
        <div style={infoStyle}>
          {/* メールアドレス */}
          {customer.email && (
            <div style={infoRowStyle}>
              <span style={labelStyle}>📧</span>
              <span style={valueStyle}>{customer.email}</span>
            </div>
          )}

          {/* 電話番号 */}
          {customer.phone && (
            <div style={infoRowStyle}>
              <span style={labelStyle}>📱</span>
              <span style={valueStyle}>{customer.phone}</span>
            </div>
          )}

          {/* 住所 */}
          {customer.address && (
            <div style={infoRowStyle}>
              <span style={labelStyle}>📍</span>
              <span style={valueStyle}>{customer.address}</span>
            </div>
          )}
        </div>

        {/* 作成・更新日時 */}
        <div style={dateStyle}>
          作成日: {formatDate(customer.created_at)}
          {customer.updated_at && (
            <>
              <br />
              更新日: {formatDate(customer.updated_at)}
            </>
          )}
        </div>

        {/* アクションボタン */}
        <div style={actionsStyle}>
          {/* 詳細ボタン */}
          <Link to={`/customers/${customer.customer_id}`} style={{ flex: 1 }}>
            <Button size="sm" style={{ width: "100%" }}>
              詳細
            </Button>
          </Link>

          {/* 編集ボタン */}
          <Link
            to={`/customers/${customer.customer_id}/edit`}
            style={{ flex: 1 }}
          >
            <Button variant="secondary" size="sm" style={{ width: "100%" }}>
              編集
            </Button>
          </Link>

          {/* 削除ボタン */}
          {onDelete && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                if (confirm("本当に削除しますか？")) {
                  onDelete(customer.customer_id);
                }
              }}
              style={{ flex: 1 }}
            >
              削除
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CustomerCard;
