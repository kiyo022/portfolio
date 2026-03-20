/**
 * 顧客一覧ページ
 */
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/common/Pagination";
import CustomerList from "../components/customers/CustomerList";
import { deleteCustomer, fetchCustomers } from "../lib/api";
import type { Customer } from "../types";

const PAGE_SIZE = 50; // 1ページあたりのアイテム数

/**
 * 顧客一覧ページコンポーネント
 */
const CustomerListPage: React.FC = () => {
  // ページ遷移用
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // 現在のページ状態
  const [currentPage, setCurrentPage] = useState(1);

  //ソート基準
  const [sortBy, setSortBy] = useState<
    "customer_name" | "created_at" | "updated_at"
  >("customer_name");

  //ソート順
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  /**
   * 全顧客を取得して状態を更新
   * @param query 検索キーワード（省略可）
   */
  useEffect(() => {
    const loadCustomers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchCustomers();
        setCustomers(data);
        setCurrentPage(1); // データ更新時はページをリセット
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "顧客の読み込みに失敗しました",
        );
      } finally {
        setIsLoading(false);
      }
    };
    loadCustomers();
  }, []);
  /**
   * 検索キーワードで顧客を検索
   * @param query 検索キーワード
   */
  const handleSearch = async (query: string) => {
    setError(null);
    if (query.trim() === "") {
      const data = await fetchCustomers();
      setCustomers(data);
    } else {
      const filtered = customers.filter((customer) => {
        const keyword = query.toLocaleLowerCase();

        const customerEmail = customer.email
          ? customer.email.toLocaleLowerCase()
          : "";
        const customerPhone = customer.phone
          ? customer.phone.toLocaleLowerCase()
          : "";
        return (
          customer.customer_name.toLocaleLowerCase().includes(keyword) ||
          customerEmail.includes(keyword) ||
          customerPhone.includes(keyword)
        );
      });
      setCustomers(filtered);
    }
  };

  /**
   * ページ変更ハンドラ
   * @param page 新しいページ番号
   */
  const onPageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /**
   * 顧客を削除（確認ダイアログ後に削除）
   * @param id 顧客ID
   */
  const handleDelete = async (id: string) => {
    try {
      await deleteCustomer(id);
      setCustomers((prev) => prev.filter((c) => c.customer_id !== id));
    } catch (err) {
      alert(
        "削除に失敗しました: " +
          (err instanceof Error ? err.message : "不明なエラー"),
      );
    }
  };
  /**
   * 顧客ソート機能
   */
  const sortsedCustomers = useMemo(() => {
    return [...customers].sort((a, b) => {
      if (sortBy === "customer_name") {
        return sortOrder === "asc"
          ? a.customer_name.localeCompare(b.customer_name)
          : b.customer_name.localeCompare(a.customer_name);
      } else if (sortBy === "created_at") {
        return sortOrder === "asc"
          ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortBy === "updated_at") {
        const aUpdated = a.updated_at ? new Date(a.updated_at).getTime() : 0;
        const bUpdated = b.updated_at ? new Date(b.updated_at).getTime() : 0;
        return sortOrder === "asc" ? aUpdated - bUpdated : bUpdated - aUpdated;
      }
      return 0;
    });
  }, [customers, sortBy, sortOrder]);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const displayedCustomers = sortsedCustomers.slice(startIndex, endIndex);

  return (
    <>
      <CustomerList
        customers={displayedCustomers}
        isLoading={isLoading}
        error={error}
        onSearch={handleSearch}
        onDelete={handleDelete}
        onAddNew={() => navigate("/customers/new")}
        onSortChangeSort={setSortBy}
        onSortChangeOrder={setSortOrder}
      />
      <Pagination
        totalCount={customers.length}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </>
  );
};

export default CustomerListPage;
