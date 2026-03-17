import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../components/Card";
import { supabase } from "../../lib/supabase";
import Button from "../../styleComponent/Button";
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
      <Card title="顧客情報">
        <p>
          <strong>名前：</strong>
          {customer.customer_name}
        </p>
        <p>
          <strong>メール：</strong>
          {customer.email}
        </p>
        <p>
          <strong>電話：</strong>
          {customer.phone}
        </p>
        <p>
          <strong>住所：</strong>
          {customer.address}
        </p>
      </Card>

      <Card
        title="操作"
        footer={
          <>
            <Button
              variant="primary"
              onClick={() => navigate(`/customers/${id}/edit`)}
            >
              編集
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              削除
            </Button>
          </>
        }
      />

      <Card title="メモ一覧">
        {notes.length === 0 ? (
          <p>メモはありません</p>
        ) : (
          notes.map((n) => (
            <Card
              key={n.note_id}
              footer={
                <Button
                  variant="secondary"
                  onClick={() => navigate(`/notes/${n.note_id}/edit`)}
                >
                  編集
                </Button>
              }
            >
              <p>{new Date(n.created_at).toLocaleString()}</p>
              <p>{n.note_text}</p>
            </Card>
          ))
        )}
      </Card>
      <Link to={"/customers/${id}/notes/new"}>メモを追加</Link>
    </div>
  );
}
