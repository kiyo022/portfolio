import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomers } from "../../hooks/useCustomers";
import Button from "../../styleComponent/Button";
import CustomerList from "./../../components/CustomerList";

export default function CustomersPage() {
  const { customers, loading } = useCustomers();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<"created_at" | "updated_at">(
    "created_at",
  );

  const toDate = (value: string | null): Date => {
    return value ? new Date(value) : new Date(0);
  };

  // 検索 + ソート済みの顧客一覧
  const filteredCustomers = customers
    .filter((c) =>
      [c.customer_name, c.email, c.phone]
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    )
    .sort(
      (a, b) => toDate(b[sortKey]).getTime() - toDate(a[sortKey]).getTime(),
    );

  // CustomerList に渡すコールバック
  const handleSearch = (value: string) => setSearchQuery(value);
  const handleSort = (value: string) =>
    setSortKey(value as "created_at" | "updated_at");

  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="page-header">
        <h1>顧客一覧</h1>
        <Button variant="primary" onClick={() => navigate("/customers/new")}>
          + 新規追加
        </Button>
      </div>
      {loading ? (
        <p>読み込み中...</p>
      ) : (
        <CustomerList
          customers={filteredCustomers}
          onSearch={handleSearch}
          onSort={handleSort}
        />
      )}
    </div>
  );
}
