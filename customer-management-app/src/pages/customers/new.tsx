import { useNavigate } from "react-router-dom";
import CustomerForm from "../../components/CustomersForm";
import { supabase } from "../../lib/supabase";

export default function NewCustomerPages() {
  const navigate = useNavigate();

  const handleSubmit = async (data: {
    customer_name: string;
    email: string | null;
    phone: string | null;
    address: string | null;
  }) => {
    const { error } = await supabase
      .from("customers")
      .insert([{ ...data, updated_at: new Date().toISOString() }]);
    if (error) {
      console.error(error);
      alert("保存に失敗しました。");
      return;
    }
    navigate("/customers");
  };

  return (
    <div>
      <h1>新規追加</h1>
      <CustomerForm onSubmit={handleSubmit} />
      <button onClick={() => navigate("/customers")}>キャンセル</button>
    </div>
  );
}
