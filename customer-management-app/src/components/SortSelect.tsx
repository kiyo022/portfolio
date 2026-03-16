type SortKey = "created_at" | "updated_at";

type sortSelectProps = {
  value: SortKey;
  onChange: (value: SortKey) => void;
};

export default function SortSelect({ value, onChange }: sortSelectProps) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value as SortKey)}>
      <option value="created_at">作成日（新しい順）</option>
      <option value="updated_at">更新日（新しい順）</option>
    </select>
  );
}
