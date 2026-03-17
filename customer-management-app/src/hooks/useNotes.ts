/**
 * メモ・対応履歴データ管理カスタムフック
 */
import { useEffect, useState } from "react";
import { createNote, deleteNote, fetchNotes, updateNote } from "../lib/api";
import type { Note, NoteFormInput } from "../types";

/**
 * メモの CRUD 操作と状態管理を行うフック
 * @param customerId 顧客ID
 * @returns メモデータと操作関数
 */
export const useNotes = (customerId: string) => {
  // メモリスト
  const [notes, setNotes] = useState<Note[]>([]);

  // ローディング状態
  const [isLoading, setIsLoading] = useState(false);

  // エラーメッセージ
  const [error, setError] = useState<string | null>(null);

  /**
   * メモデータを読み込む
   */
  const loadNotes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchNotes(customerId);
      setNotes(data || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "メモの読み込みエラーが発生しました",
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 新しいメモを追加
   * @param input メモフォーム入力
   * @returns 作成されたメモデータ
   */
  const addNote = async (input: NoteFormInput) => {
    try {
      const newNote = await createNote(customerId, input);
      setNotes([newNote, ...notes]);
      return newNote;
    } catch (err) {
      throw err instanceof Error ? err : new Error("メモの作成に失敗しました");
    }
  };

  /**
   * 既存のメモを編集
   * @param noteId メモID
   * @param input 更新内容
   * @returns 更新されたメモデータ
   */
  const editNote = async (noteId: string, input: NoteFormInput) => {
    try {
      const updated = await updateNote(noteId, input);
      setNotes(notes.map((n) => (n.note_id === noteId ? updated : n)));
      return updated;
    } catch (err) {
      throw err instanceof Error ? err : new Error("メモの更新に失敗しました");
    }
  };

  /**
   * メモを削除
   * @param noteId メモID
   */
  const removeNote = async (noteId: string) => {
    try {
      await deleteNote(noteId);
      setNotes(notes.filter((n) => n.note_id !== noteId));
    } catch (err) {
      throw err instanceof Error ? err : new Error("メモの削除に失敗しました");
    }
  };

  // customerId が変更されたときにメモを再読み込み
  useEffect(() => {
    loadNotes();
  }, [customerId]);

  return { notes, isLoading, error, addNote, editNote, removeNote };
};
