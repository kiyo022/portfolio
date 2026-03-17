/**
 * カード表示コンポーネント
 */
import React from "react";

interface CardProps {
  // カードの内容
  children: React.ReactNode;

  // 追加のクラス名
  className?: string;

  // クリック時のコールバック関数
  onClick?: () => void;

  // ホバーエフェクトを有効にするか
  hoverable?: boolean;
}

/**
 * カードコンポーネント
 */
const Card: React.FC<CardProps> = ({
  children,
  className = "",
  onClick,
  hoverable = false,
}) => {
  // カードのスタイル
  const style: React.CSSProperties = {
    backgroundColor: "var(--bg-primary)",
    border: "1px solid var(--border-color)",
    borderRadius: "var(--radius-lg)",
    padding: "var(--spacing-4)",
    boxShadow: "var(--shadow-sm)",
    cursor: hoverable ? "pointer" : "default",
    transition: "all var(--transition-base)",
  };

  return (
    <div
      style={style}
      className={className}
      onClick={onClick}
      // ホバー時のエフェクト
      onMouseEnter={(e) => {
        if (hoverable) {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "var(--shadow-md)";
          (e.currentTarget as HTMLDivElement).style.transform =
            "translateY(-2px)";
        }
      }}
      // ホバー終了時
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "var(--shadow-sm)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      {children}
    </div>
  );
};

export default Card;
