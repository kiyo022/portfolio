import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useCustomerDetail } from "./../../hooks/useCustomerDetail";

export default function CustomerDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { customer, notes, loading } = useCustomerDetail(id);

  if (!id) {
    return <div>顧客IDが不正です。</div>;
  }

  const handleDelete = async () => {
    if (!confirm("本当に削除しますか？")) return;

    await supabase.from("customers").delete().eq("customer_id", id);
    navigate("/customers");
  };

  if (loading) return <p>読み込み中...</p>;
  if (!customer) return <p>顧客が見つかりません。</p>;
  return (
    <div>
      <h1>顧客詳細</h1>

      <p>名前: {customer.customer_name}</p>
      <p>メール: {customer.email}</p>
      <p>電話: {customer.phone}</p>
      <p>住所: {customer.address}</p>

      <Link to={".cutomers/${id}/edit"}>顧客を編集</Link>
      <button onClick={handleDelete}>顧客を削除</button>

      <h2>メモ一覧</h2>
      {notes.length === 0 ? (
        <p>メモがありません。</p>
      ) : (
        <ul>
          {notes.map((n) => (
            <li key={n.note_id}>
              {new Date(n.created_at).toLocaleString()} - {n.note_text}
              <Link to={`./notes/${n.note_id}/edit`}>編集</Link>
            </li>
          ))}
        </ul>
      )}

      <Link to={"/customers/${id}/notes/new"}>メモを追加</Link>
    </div>
  );
}
