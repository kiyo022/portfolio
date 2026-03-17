/**
 * 顧客フォームページ
 * 新規作成と編集の両方に対応
 */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CustomerForm from "../components/customers/CustomerForm";
import { createCustomer, fetchCustomerById, updateCustomer } from "../lib/api";
import type { Customer, CustomerFormInput } from "../types";

/**
 * 顧客フォームページコンポーネント
 */
const CustomerFormPage: React.FC = () => {
  // URLパラメータから顧客IDを取得（編集の場合のみ）
  const { id } = useParams<{ id: string }>();

  // ページ遷移用
  const navigate = useNavigate();

  // 顧客データの状態
  const [customer, setCustomer] = useState<Customer | null>(null);

  // ローディング状態
  const [isLoading, setIsLoading] = useState(false);

  // エラーメッセージ
  const [error, setError] = useState<string | null>(null);

  /**
   * 顧客データを読み込む（編集の場合）
   */
  useEffect(() => {
    if (!id) {
      // 新規作成の場合
      setCustomer(null);
      return;
    }

    // 編集の場合
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
   * フォーム送信時のハンドラ
   */
  const handleSubmit = async (data: CustomerFormInput) => {
    if (id && customer) {
      // 編集の場合
      await updateCustomer(id, data);
      alert("顧客情報を更新しました");
    } else {
      // 新規作成の場合
      await createCustomer(data);
      alert("顧客を追加しました");
    }

    // 一覧ページに遷移
    navigate("/");
  };

  /**
   * キャンセル時のハンドラ
   */
  const handleCancel = () => {
    if (id) {
      // 編集ページからキャンセルした場合は詳細ページに戻る
      navigate(`/customers/${id}`);
    } else {
      // 新規作成ページからキャンセルした場合は一覧ページに戻る
      navigate("/");
    }
  };

  if (error) {
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
        ❌ {error}
      </div>
    );
  }

  return (
    <CustomerForm
      initialData={customer}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
};

export default CustomerFormPage;
