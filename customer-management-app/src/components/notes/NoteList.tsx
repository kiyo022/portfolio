/**
 * メモ一覧コンポーネント
 * メモの追加フォームと一覧を表示
 */
import React from "react";
import type { Note } from "../../types";
import NoteForm from "./NoteForm";
import NoteItem from "./NoteItem";

interface NoteListProps {
  // メモデータの配列
  notes: Note[];

  // ローディング状態
  isLoading: boolean;

  // メモ追加時のコールバック
  onAdd: (content: string) => Promise<void>;

  // メモ編集時のコールバック
  onEdit: (noteId: string, content: string) => Promise<void>;

  // メモ削除時のコールバック
  onDelete: (noteId: string) => Promise<void>;
}

/**
 * メモ一覧コンポーネント
 */
const NoteList: React.FC<NoteListProps> = ({
  notes,
  isLoading,
  onAdd,
  onEdit,
  onDelete,
}) => {
  // コンテナのスタイル
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-4)",
  };

  // メモ一覧のスタイル
  const notesContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-3)",
  };

  // 空状態のスタイル
  const emptyStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "var(--spacing-6)",
    color: "var(--text-secondary)",
    fontSize: "var(--text-base)",
  };

  // ローディング状態のスタイル
  const loadingStyle: React.CSSProperties = {
    textAlign: "center",
    padding: "var(--spacing-4)",
    color: "var(--text-secondary)",
    fontSize: "var(--text-base)",
  };

  return (
    <div style={containerStyle}>
      {/* メモ追加フォーム */}
      <NoteForm onAdd={onAdd} isLoading={isLoading} />

      {/* メモ一覧 */}
      {isLoading ? (
        <div style={loadingStyle}>⏳ メモを読み込み中...</div>
      ) : notes.length === 0 ? (
        <div style={emptyStyle}>メモがまだ追加されていません</div>
      ) : (
        <div style={notesContainerStyle}>
          {notes.map((note) => (
            <NoteItem
              key={note.note_id}
              note={note}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NoteList;
