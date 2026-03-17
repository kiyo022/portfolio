/**
 * 顧客詳細表示コンポーネント
 * 顧客の基本情報と関連するメモを表示
 */
import React from "react";
import { Link } from "react-router-dom";
import { formatDateTime } from "../../lib/utils";
import type { Customer, Note } from "../../types";
import Button from "../common/Button";
import Card from "../common/Card";
import NoteList from "../notes/NoteList";

interface CustomerDetailProps {
  // 表示する顧客データ
  customer: Customer | null;

  // ローディング状態
  isLoading: boolean;

  // エラーメッセージ
  error?: string | null;

  // 関連するメモ
  notes: Note[];

  // メモのローディング状態
  notesLoading: boolean;

  // メモ追加時のコールバック
  onAddNote: (content: string) => Promise<void>;

  // メモ編集時のコールバック
  onEditNote: (noteId: string, content: string) => Promise<void>;

  // メモ削除時のコールバック
  onDeleteNote: (noteId: string) => Promise<void>;
}

/**
 * 顧客詳細表示コンポーネント
 */
const CustomerDetail: React.FC<CustomerDetailProps> = ({
  customer,
  isLoading,
  error,
  notes,
  notesLoading,
  onAddNote,
  onEditNote,
  onDeleteNote,
}) => {
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "var(--spacing-8)" }}>
        ⏳ 読み込み中...
      </div>
    );
  }

  if (error || !customer) {
    return (
      <div
        style={{
          padding: "var(--spacing-4)",
          backgroundColor: "rgba(239, 68, 68, 0.1)",
          border: "1px solid var(--color-danger-500)",
          borderRadius: "var(--radius-md)",
          color: "var(--color-danger-600)",
        }}
      >
        ❌ {error || "顧客が見つかりません"}
      </div>
    );
  }

  // コンテナのスタイル
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-6)",
  };

  // ヘッダーのスタイル
  const headerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "var(--spacing-4)",
    flexWrap: "wrap",
  };

  // タイトルのスタイル
  const titleStyle: React.CSSProperties = {
    fontSize: "var(--text-3xl)",
    fontWeight: "var(--font-weight-bold)",
    color: "var(--text-primary)",
    margin: 0,
    flex: 1,
  };

  // ボタングループのスタイル
  const buttonGroupStyle: React.CSSProperties = {
    display: "flex",
    gap: "var(--spacing-2)",
    flexWrap: "wrap",
  };

  // Link のスタイル
  const linkStyle: React.CSSProperties = {
    textDecoration: "none",
    display: "inline-block",
  };

  // 基本情報カードのスタイル
  const infoCardStyle: React.CSSProperties = {
    display: "grid",
    gap: "var(--spacing-3)",
  };

  // 情報行のスタイル
  const infoRowStyle: React.CSSProperties = {
    display: "flex",
    gap: "var(--spacing-3)",
    paddingBottom: "var(--spacing-3)",
    borderBottom: "1px solid var(--border-color)",
  };

  // ラベルのスタイル
  const labelStyle: React.CSSProperties = {
    fontWeight: "var(--font-weight-semibold)",
    color: "var(--text-secondary)",
    minWidth: "100px",
  };

  // 値のスタイル
  const valueStyle: React.CSSProperties = {
    color: "var(--text-primary)",
    flex: 1,
    wordBreak: "break-all",
  };

  // セクションタイトルのスタイル
  const sectionTitleStyle: React.CSSProperties = {
    fontSize: "var(--text-2xl)",
    fontWeight: "var(--font-weight-bold)",
    color: "var(--text-primary)",
    margin: 0,
  };

  return (
    <div style={containerStyle}>
      {/* ヘッダー：タイトルと操作ボタン */}
      <div style={headerStyle}>
        <h1 style={titleStyle}>{customer.customer_name}</h1>
        <div style={buttonGroupStyle}>
          {/* 戻るボタン */}
          <Link to="/" style={linkStyle}>
            <Button variant="secondary">← 戻る</Button>
          </Link>

          {/* 編集ボタン */}
          <Link
            to={`/customers/${customer.customer_id}/edit`}
            style={linkStyle}
          >
            <Button>✏️ 編集</Button>
          </Link>
        </div>
      </div>

      {/* 基本情報カード */}
      <Card>
        <div style={infoCardStyle}>
          <h2 style={sectionTitleStyle}>基本情報</h2>

          {/* 顧客ID */}
          <div style={infoRowStyle}>
            <span style={labelStyle}>顧客ID:</span>
            <span style={valueStyle}>{customer.customer_id}</span>
          </div>

          {/* メールアドレス */}
          {customer.email && (
            <div style={infoRowStyle}>
              <span style={labelStyle}>📧 メール:</span>
              <span style={valueStyle}>
                <a href={`mailto:${customer.email}`}>{customer.email}</a>
              </span>
            </div>
          )}

          {/* 電話番号 */}
          {customer.phone && (
            <div style={infoRowStyle}>
              <span style={labelStyle}>📱 電話:</span>
              <span style={valueStyle}>
                <a href={`tel:${customer.phone}`}>{customer.phone}</a>
              </span>
            </div>
          )}

          {/* 住所 */}
          {customer.address && (
            <div style={infoRowStyle}>
              <span style={labelStyle}>📍 住所:</span>
              <span style={valueStyle}>{customer.address}</span>
            </div>
          )}

          {/* 作成日時 */}
          <div style={infoRowStyle}>
            <span style={labelStyle}>作成日:</span>
            <span style={valueStyle}>
              {formatDateTime(customer.created_at)}
            </span>
          </div>

          {/* 更新日時 */}
          {customer.updated_at && (
            <div style={infoRowStyle}>
              <span style={labelStyle}>更新日:</span>
              <span style={valueStyle}>
                {formatDateTime(customer.updated_at)}
              </span>
            </div>
          )}
        </div>
      </Card>

      {/* メモセクション */}
      <div>
        <h2 style={sectionTitleStyle}>対応履歴・メモ</h2>
        <NoteList
          notes={notes}
          isLoading={notesLoading}
          onAdd={onAddNote}
          onEdit={onEditNote}
          onDelete={onDeleteNote}
        />
      </div>
    </div>
  );
};

export default CustomerDetail;
