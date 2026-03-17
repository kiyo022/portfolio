import { useNavigate } from "react-router-dom";
import type { CustomerProps } from "../hooks/useCustomers";
import Button from "../styleComponent/Button";
import "../styles/customerList.css";
import "../styles/grid.css";
import Card from "./Card";
import SearchBar from "./SearchBar";
import SortSelect from "./SortSelect";

type CustomerListProps = {
  customers: CustomerProps[];
  onSearch: (value: string) => void;
  onSort: (value: string) => void;
};

export default function CustomerList({
  customers,
  onSearch,
  onSort,
}: CustomerListProps) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="control-bar">
        <div className="control-left">
          <SearchBar onSearch={onSearch} />
        </div>

        <div className="control-right">
          <SortSelect onSort={onSort} />
        </div>
      </div>

      {customers.length === 0 ? (
        <p>顧客が登録されていません</p>
      ) : (
        <div className="grid">
          {customers.map((c) => (
            <Card
              key={c.customer_id}
              title={c.customer_name}
              footer={
                <Button
                  variant="secondary"
                  onClick={() => navigate(`/customers/${c.customer_id}`)}
                >
                  詳細を見る
                </Button>
              }
            >
              <p>{c.email}</p>
              <p>{c.phone}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
