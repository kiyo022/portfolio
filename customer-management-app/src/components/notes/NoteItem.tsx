/**
 * メモアイテムコンポーネント
 * 個別のメモを表示・編集・削除する
 */
import React, { useState } from "react";
import { formatDateTime } from "../../lib/utils";
import type { Note } from "../../types";
import Button from "../common/Button";

interface NoteItemProps {
  // メモデータ
  note: Note;

  // 編集時のコールバック
  onEdit: (noteId: string, content: string) => Promise<void>;

  // 削除時のコールバック
  onDelete: (noteId: string) => Promise<void>;
}

/**
 * メモアイテムコンポーネント
 */
const NoteItem: React.FC<NoteItemProps> = ({ note, onEdit, onDelete }) => {
  // 編集モード状態
  const [isEditing, setIsEditing] = useState(false);

  // 編集中のテキスト
  const [editText, setEditText] = useState(note.note_text);

  // 送信中状態
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * 編集を保存
   */
  const handleSave = async () => {
    if (!editText.trim()) {
      alert("メモの内容を入力してください");
      return;
    }

    setIsSubmitting(true);
    try {
      await onEdit(note.note_id, editText);
      setIsEditing(false);
    } catch (err) {
      alert(
        "メモの更新に失敗しました: " +
          (err instanceof Error ? err.message : "不明なエラー"),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * 編集をキャンセル
   */
  const handleCancel = () => {
    setEditText(note.note_text);
    setIsEditing(false);
  };

  /**
   * メモを削除
   */
  const handleDelete = async () => {
    if (!confirm("このメモを削除しますか？")) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onDelete(note.note_id);
    } catch (err) {
      alert(
        "メモの削除に失敗しました: " +
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
    transition: "all var(--transition-base)",
  };

  // ヘッダーのスタイル
  const headerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    gap: "var(--spacing-2)",
  };

  // 日時のスタイル
  const dateStyle: React.CSSProperties = {
    fontSize: "var(--text-xs)",
    color: "var(--text-tertiary)",
  };

  // メモテキストのスタイル
  const textStyle: React.CSSProperties = {
    color: "var(--text-primary)",
    fontSize: "var(--text-base)",
    lineHeight: "var(--line-height-relaxed)",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
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
    minHeight: "120px",
    resize: "vertical",
    transition: "all var(--transition-base)",
  };

  // ボタングループのスタイル
  const buttonGroupStyle: React.CSSProperties = {
    display: "flex",
    gap: "var(--spacing-2)",
    justifyContent: "flex-end",
  };

  if (isEditing) {
    return (
      <div style={containerStyle}>
        <div style={headerStyle}>
          <span style={dateStyle}>✏️ 編集中</span>
        </div>

        <textarea
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          style={textareaStyle}
          placeholder="メモを編集..."
          disabled={isSubmitting}
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

        <div style={buttonGroupStyle}>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            キャンセル
          </Button>
          <Button size="sm" onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? "保存中..." : "保存"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div>
          <div style={dateStyle}>
            {formatDateTime(note.created_at)}
            {note.updated_at && note.updated_at !== note.created_at && (
              <>
                <br />
                更新: {formatDateTime(note.updated_at)}
              </>
            )}
          </div>
        </div>
      </div>

      <div style={textStyle}>{note.note_text}</div>

      <div style={buttonGroupStyle}>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsEditing(true)}
          disabled={isSubmitting}
        >
          ✏️ 編集
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={handleDelete}
          disabled={isSubmitting}
        >
          🗑️ 削除
        </Button>
      </div>
    </div>
  );
};

export default NoteItem;
