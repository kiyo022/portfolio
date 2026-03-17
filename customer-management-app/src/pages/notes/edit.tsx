import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function EditNotePage() {
  const { noteId } = useParams();
  const navigate = useNavigate();

  const [noteText, setNoteText] = useState("");
  const [customerId, setCustomerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from("customer_notes")
        .select("*")
        .eq("note_id", noteId)
        .single();

      if (error || !data) {
        console.error(error);
        return;
      }

      setNoteText(data.note_text);
      setCustomerId(data.customer_id);
      setLoading(false);
    };

    load();
  }, [noteId]);

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("customer_notes")
      .update({ note_text: noteText, updated_at: new Date().toISOString() })
      .eq("note_id", noteId);

    if (error) {
      console.error(error);
      alert("更新に失敗しました。");
      return;
    }

    if (customerId) navigate(`/customers/${customerId}`);
  };

  const handleDelete = async () => {
    if (!confirm("本当に削除しますか？")) return;

    const { error } = await supabase
      .from("customer_notes")
      .delete()
      .eq("note_id", noteId);

    if (error) {
      console.error(error);
      alert("削除に失敗しました");
      return;
    }

    if (customerId) navigate(`/customers/${customerId}`);
  };

  if (!noteId) {
    return <p>メモIDが不正です。</p>;
  }

  if (loading) {
    return <p>読み込み中...</p>;
  }

  return (
    <div>
      <h1>メモ編集</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>メモ内容</label>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
        </div>
        <button type="submit">更新</button>
      </form>

      <button onClick={handleDelete}>削除</button>

      {customerId && (
        <button onClick={() => navigate(`/customers/${customerId}`)}>
          キャンセル
        </button>
      )}
    </div>
  );
}
