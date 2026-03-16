import { Link } from "react-router-dom";
import type { CustomerProps } from "../hooks/useCustomers";

type customerListProps = {
  customers: CustomerProps[];
};

export default function CustomersList({ customers }: customerListProps) {
  return (
    <table>
      <thead>
        <tr>
          <th>顧客名</th>
          <th>メール</th>
          <th>電話番号</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {customers.map((c) => (
          <tr key={c.customer_id}>
            <td>{c.customer_name}</td>
            <td>{c.email}</td>
            <td>{c.phone}</td>
            <td>
              <Link to={`/customers/${c.customer_id}`}>詳細</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
