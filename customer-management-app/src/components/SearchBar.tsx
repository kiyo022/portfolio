import "./../styles/searchBar.css";

export type SearchBarProps = {
  onSearch: (value: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="searchbar-wrapper">
      <span className="search-icon">🔍</span>
      <input
        className="search-input"
        placeholder="検索..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
