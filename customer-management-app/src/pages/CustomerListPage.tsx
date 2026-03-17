/**
 * 顧客一覧ページ
 */
import React from "react";
import { useNavigate } from "react-router-dom";
import CustomerList from "../components/customers/CustomerList";
import { useCustomers } from "../hooks/useCustomers";

/**
 * 顧客一覧ページコンポーネント
 */
const CustomerListPage: React.FC = () => {
  // 顧客データ管理フック
  const { customers, isLoading, error, loadCustomers, removeCustomer } =
    useCustomers();

  // ページ遷移用
  const navigate = useNavigate();

  /**
   * 検索キーワードで顧客を検索
   * @param query 検索キーワード
   */
  const handleSearch = async (query: string) => {
    await loadCustomers(query);
  };

  /**
   * 顧客を削除（確認ダイアログ後に削除）
   * @param id 顧客ID
   */
  const handleDelete = async (id: string) => {
    try {
      await removeCustomer(id);
    } catch (err) {
      alert(
        "削除に失敗しました: " +
          (err instanceof Error ? err.message : "不明なエラー"),
      );
    }
  };

  return (
    <CustomerList
      customers={customers}
      isLoading={isLoading}
      error={error}
      onSearch={handleSearch}
      onDelete={handleDelete}
      onAddNew={() => navigate("/customers/new")}
    />
  );
};

export default CustomerListPage;
