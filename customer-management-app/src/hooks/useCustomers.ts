/**
 * 顧客データ管理カスタムフック
 */
import { useEffect, useState } from "react";
import {
  createCustomer,
  deleteCustomer,
  fetchCustomers,
  updateCustomer,
} from "../lib/api";
import type { Customer, CustomerFormInput } from "../types";

/**
 * 顧客の CRUD 操作と状態管理を行うフック
 * @returns 顧客データと操作関数
 */
export const useCustomers = () => {
  // 顧客リスト
  const [customers, setCustomers] = useState<Customer[]>([]);

  // ローディング状態
  const [isLoading, setIsLoading] = useState(false);

  // エラーメッセージ
  const [error, setError] = useState<string | null>(null);

  /**
   * 顧客データを読み込む
   * @param search 検索キーワード（オプション）
   */
  const loadCustomers = async (search?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchCustomers(search);
      setCustomers(data || []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "顧客の読み込みエラーが発生しました",
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 新しい顧客を追加
   * @param input 顧客フォーム入力
   * @returns 作成された顧客データ
   */
  const addCustomer = async (input: CustomerFormInput) => {
    try {
      const newCustomer = await createCustomer(input);
      setCustomers([newCustomer, ...customers]);
      return newCustomer;
    } catch (err) {
      throw err instanceof Error ? err : new Error("顧客の作成に失敗しました");
    }
  };

  /**
   * 既存の顧客情報を編集
   * @param id 顧客ID
   * @param input 更新内容
   * @returns 更新された顧客データ
   */
  const editCustomer = async (id: string, input: CustomerFormInput) => {
    try {
      const updated = await updateCustomer(id, input);
      setCustomers(customers.map((c) => (c.customer_id === id ? updated : c)));
      return updated;
    } catch (err) {
      throw err instanceof Error ? err : new Error("顧客の更新に失敗しました");
    }
  };

  /**
   * 顧客を削除
   * @param id 顧客ID
   */
  const removeCustomer = async (id: string) => {
    try {
      await deleteCustomer(id);
      setCustomers(customers.filter((c) => c.customer_id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error("顧客の削除に失敗しました");
    }
  };

  // コンポーネントマウント時に顧客データを読み込む
  useEffect(() => {
    loadCustomers();
  }, []);

  return {
    customers,
    isLoading,
    error,
    loadCustomers,
    addCustomer,
    editCustomer,
    removeCustomer,
  };
};
