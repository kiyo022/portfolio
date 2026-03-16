import { useState } from "react";
import CustomersList from "../../components/CutomerList";
import SearchBar from "../../components/SearchBar";
import SortSelect from "../../components/SortSelect";
import { useCustomers } from "../../hooks/useCustomers";

export default function CustmoersPage() {
  const { customers, loading } = useCustomers();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<"created_at" | "updated_at">(
    "created_at",
  );

  const toDate = (value: string | null): Date => {
    return value ? new Date(value) : new Date(0);
  };

  const filterd = customers
    .filter((c) =>
      [c.customer_name, c.email, c.phone]
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLocaleLowerCase()),
    )
    .sort(
      (a, b) => toDate(b[sortKey]).getTime() - toDate(a[sortKey]).getTime(),
    );
  return (
    <div>
      <h1>顧客一覧</h1>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <SortSelect value={sortKey} onChange={setSortKey} />

      {loading ? <p>読み込み中...</p> : <CustomersList customers={filterd} />}
    </div>
  );
}
