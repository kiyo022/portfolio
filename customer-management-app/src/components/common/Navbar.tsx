/**
 * ナビゲーションバーコンポーネント
 */
import React from "react";
import { Link } from "react-router-dom";

interface NavbarProps {
  // 現在のテーマ
  theme: "light" | "dark";

  // テーマ切り替え時のコールバック
  onThemeToggle: () => void;
}

/**
 * ナビゲーションバーコンポーネント
 */
const Navbar: React.FC<NavbarProps> = ({ theme, onThemeToggle }) => {
  // ナビバーのスタイル
  const style: React.CSSProperties = {
    backgroundColor: "var(--bg-secondary)",
    borderBottom: "1px solid var(--border-color)",
    padding: "var(--spacing-4)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "var(--spacing-6)",
    borderRadius: "var(--radius-lg)",
    boxShadow: "var(--shadow-sm)",
  };

  // タイトルのスタイル
  const titleStyle: React.CSSProperties = {
    fontSize: "var(--text-2xl)",
    fontWeight: "var(--font-weight-bold)",
    color: "var(--text-primary)",
    margin: 0,
  };

  // 操作ボタン類のコンテナスタイル
  const controlsStyle: React.CSSProperties = {
    display: "flex",
    gap: "var(--spacing-2)",
    alignItems: "center",
  };

  // テーマ切り替えボタンのスタイル
  const themeButtonStyle: React.CSSProperties = {
    fontSize: "var(--text-xl)",
    backgroundColor: "transparent",
    cursor: "pointer",
    border: "none",
    padding: "var(--spacing-2)",
    transition: "all var(--transition-base)",
  };

  return (
    <nav style={style}>
      {/* ロゴ・タイトル */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1 style={titleStyle}>顧客管理アプリ</h1>
      </Link>

      {/* 操作ボタン */}
      <div style={controlsStyle}>
        {/* テーマ切り替えボタン */}
        <button
          onClick={onThemeToggle}
          style={themeButtonStyle}
          title={`テーマ切り替え (現在: ${theme === "light" ? "ライト" : "ダーク"})`}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.transform = "scale(1.2)";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.transform = "scale(1)";
          }}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
