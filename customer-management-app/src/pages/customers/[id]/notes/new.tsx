import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../../../lib/supabase";

export default function AddNotePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [noteText, setNoteText] = useState("");

  if (!id) {
    return <div>顧客IDが不正です。</div>;
  }

  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!noteText.trim()) {
      alert("メモ内容を入力してください。");
      return;
    }

    const { error } = await supabase.from("customer_notes").insert([
      {
        customer_id: id,
        note_text: noteText.trim(),
        updated_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error(error);
      alert("保存に失敗しました。");
      return;
    }
    navigate(`/customers/${id}`);
  };

  return (
    <div>
      <h1>メモ追加</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>メモ内容</label>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
        </div>

        <button type="submit">保存する</button>
      </form>
      <button type="button" onClick={() => navigate(`/customers/${id}`)}>
        キャンセル
      </button>
    </div>
  );
}
