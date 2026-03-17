/**
 * メモ追加フォームコンポーネント
 */
import React, { useState } from "react";
import Button from "../common/Button";

interface NoteFormProps {
  // メモ追加時のコールバック
  onAdd: (content: string) => Promise<void>;

  // ローディング状態
  isLoading?: boolean;
}

/**
 * メモ追加フォームコンポーネント
 */
const NoteForm: React.FC<NoteFormProps> = ({ onAdd, isLoading = false }) => {
  // メモテキストの状態
  const [noteText, setNoteText] = useState("");

  // 送信中状態
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * フォーム送信時のハンドラ
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!noteText.trim()) {
      alert("メモの内容を入力してください");
      return;
    }

    setIsSubmitting(true);
    try {
      await onAdd(noteText);
      setNoteText("");
    } catch (err) {
      alert(
        "メモの追加に失敗しました: " +
          (err instanceof Error ? err.message : "不明なエラー"),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // コンテナのスタイル
  const containerStyle: React.CSSProperties = {
    backgroundColor: "var(--bg-secondary)",
    border: "1px solid var(--border-color)",
    borderRadius: "var(--radius-lg)",
    padding: "var(--spacing-4)",
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-3)",
  };

  // タイトルのスタイル
  const titleStyle: React.CSSProperties = {
    fontSize: "var(--text-lg)",
    fontWeight: "var(--font-weight-semibold)",
    color: "var(--text-primary)",
    margin: 0,
  };

  // テキストエリアのスタイル
  const textareaStyle: React.CSSProperties = {
    padding: "var(--spacing-2) var(--spacing-3)",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--border-color)",
    backgroundColor: "var(--bg-primary)",
    color: "var(--text-primary)",
    fontSize: "var(--text-base)",
    fontFamily: "var(--font-family-sans)",
    minHeight: "100px",
    resize: "vertical",
    transition: "all var(--transition-base)",
  };

  // ボタングループのスタイル
  const buttonGroupStyle: React.CSSProperties = {
    display: "flex",
    gap: "var(--spacing-2)",
    justifyContent: "flex-end",
  };

  return (
    <form onSubmit={handleSubmit} style={containerStyle}>
      <h3 style={titleStyle}>📝 新しいメモを追加</h3>

      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="メモの内容を入力..."
        style={textareaStyle}
        disabled={isSubmitting || isLoading}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--color-primary-600)";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(2, 132, 199, 0.1)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--border-color)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />

      <div style={buttonGroupStyle}>
        <Button type="submit" disabled={isSubmitting || isLoading} size="sm">
          {isSubmitting ? "追加中..." : "➕ メモを追加"}
        </Button>
      </div>
    </form>
  );
};

export default NoteForm;
