import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CustomerProps } from "../hooks/useCustomers";
import Button from "../styleComponent/Button";
import FormField from "./FormField";

type CustomerFromProps = {
  onSubmit: (
    data: Omit<CustomerProps, "customer_id" | "created_at" | "updated_at">,
  ) => void;
  initial?: Partial<CustomerProps>;
};

export default function CustomerForm({
  onSubmit,
  initial = {},
}: CustomerFromProps) {
  const [customer_name, setCustomerName] = useState(
    initial.customer_name ?? "",
  );
  const [email, setEmail] = useState(initial.address ?? "");
  const [phone, setPhone] = useState(initial.phone ?? "");
  const [address, setAddress] = useState(initial.address ?? "");

  const navigate = useNavigate();
  const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!customer_name.trim()) {
      alert("顧客名は必須です。");
      return;
    }

    onSubmit({
      customer_name,
      email,
      phone,
      address,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormField label="顧客名">
        <input
          className="form-input"
          value={customer_name}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </FormField>

      <FormField label="メール">
        <input
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormField>

      <FormField label="電話番号">
        <input
          className="form-input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </FormField>

      <FormField label="住所">
        <textarea
          className="form-textarea"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </FormField>

      <Button type="submit">保存する</Button>
      <Button variant="secondary" onClick={() => navigate("/customers")}>
        キャンセル
      </Button>
    </form>
  );
}
