import { useState } from "react";
import type { CustomerProps } from "../hooks/useCustomers";

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
      <div>
        <label>顧客名</label>
        <input
          value={customer_name}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>
      <div>
        <label>メール</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>電話</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div>
        <label>住所</label>
        <input value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>

      <button type="submit">保存する</button>
    </form>
  );
}
