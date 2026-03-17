/**
 * 汎用ボタンコンポーネント
 */
import React from "react";
import "./../../styles/globals.css";

interface ButtonProps {
  // ボタンの内容
  children: React.ReactNode;

  // クリック時のコールバック関数
  onClick?: () => void;

  // ボタンのバリアント（スタイル）
  variant?: "primary" | "secondary" | "danger";

  // ボタンのサイズ
  size?: "sm" | "md" | "lg";

  // 無効化状態
  disabled?: boolean;

  // ボタンのタイプ
  type?: "button" | "submit" | "reset";

  // 追加のクラス名
  className?: string;

  // インラインスタイル
  style?: React.CSSProperties;
}

/**
 * ボタンコンポーネント
 */
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
  className = "",
  style = {},
}) => {
  // 基本スタイル
  const baseStyles: React.CSSProperties = {
    fontWeight: "var(--font-weight-semibold)",
    borderRadius: "var(--radius-md)",
    transition: "all var(--transition-base)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.6 : 1,
    border: "none",
    fontFamily: "var(--font-family-sans)",
    fontSize: "var(--text-base)",
  };

  // バリアント別スタイル
  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: "var(--color-primary-600)",
      color: "white",
    },
    secondary: {
      backgroundColor: "var(--bg-secondary)",
      color: "var(--text-primary)",
      border: "1px solid var(--border-color)",
    },
    danger: {
      backgroundColor: "var(--color-danger-500)",
      color: "white",
    },
  };

  // サイズ別スタイル
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      padding: "var(--spacing-2) var(--spacing-4)",
      fontSize: "var(--text-sm)",
    },
    md: {
      padding: "var(--spacing-2) var(--spacing-6)",
      fontSize: "var(--text-base)",
    },
    lg: {
      padding: "var(--spacing-4) var(--spacing-8)",
      fontSize: "var(--text-lg)",
      fontWeight: "var(--font-weight-bold)",
    },
  };

  // スタイルを統合
  const mergedStyle = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...style,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={mergedStyle}
      className={className}
      onMouseEnter={(e) => {
        if (!disabled) {
          (e.target as HTMLButtonElement).style.transform = "translateY(-2px)";
          (e.target as HTMLButtonElement).style.boxShadow = "var(--shadow-md)";
        }
      }}
      onMouseLeave={(e) => {
        (e.target as HTMLButtonElement).style.transform = "translateY(0)";
        (e.target as HTMLButtonElement).style.boxShadow = "none";
      }}
    >
      {children}
    </button>
  );
};

export default Button;
