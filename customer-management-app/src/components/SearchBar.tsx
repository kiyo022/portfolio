type searchBarTypeProps = {
  value: string;
  onChange: (value: string) => void;
};
/**
 * 検索バーコンポーネント
 *
 * @param param0
 * @returns
 */
export default function SearchBar({ value, onChange }: searchBarTypeProps) {
  return (
    <input
      type="text"
      placeholder="名前・メール・電話番号で検索"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
