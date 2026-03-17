import "./../styles/sortSelect.css";

export type SortSelectProps = {
  onSort: (value: string) => void;
};

export default function SortSelect({ onSort }: SortSelectProps) {
  return (
    <select className="sort-select" onChange={(e) => onSort(e.target.value)}>
      <option value="created_at">登録日順</option>
      <option value="updated_at">更新日順</option>
    </select>
  );
}
