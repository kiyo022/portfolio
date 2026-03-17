/**
 * 顧客詳細ページ
 */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomerDetail from "../components/customers/CustomerDetail";
import { useNotes } from "../hooks/useNotes";
import { fetchCustomerById } from "../lib/api";
import type { Customer } from "../types";

/**
 * 顧客詳細ページコンポーネント
 */
const CustomerDetailPage: React.FC = () => {
  // URLパラメータから顧客IDを取得
  const { id } = useParams<{ id: string }>();

  // 顧客データの状態
  const [customer, setCustomer] = useState<Customer | null>(null);

  // ローディング状態
  const [isLoading, setIsLoading] = useState(false);

  // エラーメッセージ
  const [error, setError] = useState<string | null>(null);

  // メモ管理フック
  const {
    notes,
    isLoading: notesLoading,
    addNote,
    editNote,
    removeNote,
  } = useNotes(id || "");

  /**
   * 顧客データを読み込む
   */
  useEffect(() => {
    if (!id) {
      setError("顧客IDが指定されていません");
      return;
    }

    const loadCustomer = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchCustomerById(id);
        setCustomer(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "顧客の読み込みに失敗しました",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadCustomer();
  }, [id]);

  /**
   * メモを追加
   */
  const handleAddNote = async (content: string) => {
    try {
      await addNote({ note_text: content });
    } catch (err) {
      alert(
        "メモの追加に失敗しました: " +
          (err instanceof Error ? err.message : "不明なエラー"),
      );
    }
  };

  /**
   * メモを編集
   */
  const handleEditNote = async (noteId: string, content: string) => {
    try {
      await editNote(noteId, { note_text: content });
    } catch (err) {
      alert(
        "メモの更新に失敗しました: " +
          (err instanceof Error ? err.message : "不明なエラー"),
      );
    }
  };

  /**
   * メモを削除
   */
  const handleDeleteNote = async (noteId: string) => {
    try {
      await removeNote(noteId);
    } catch (err) {
      alert(
        "メモの削除に失敗しました: " +
          (err instanceof Error ? err.message : "不明なエラー"),
      );
    }
  };

  return (
    <CustomerDetail
      customer={customer}
      isLoading={isLoading}
      error={error}
      notes={notes}
      notesLoading={notesLoading}
      onAddNote={handleAddNote}
      onEditNote={handleEditNote}
      onDeleteNote={handleDeleteNote}
    />
  );
};

export default CustomerDetailPage;
