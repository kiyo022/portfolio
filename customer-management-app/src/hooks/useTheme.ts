/**
 * テーマ管理カスタムフック
 * ライト/ダークモードの切り替えを管理
 */
import { useEffect, useState } from "react";

/**
 * テーマ管理フック
 * @returns 現在のテーマと切り替え関数
 */
export const useTheme = () => {
  // 現在のテーマ状態
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    // 初期値を計算する関数として使用
    // システムの色スキーム設定を確認
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    // ローカルストレージに保存されたテーマを確認
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

    // 優先順: 保存されたテーマ > システム設定 > デフォルト（ライト）
    return savedTheme || (prefersDark ? "dark" : "light");
  });

  /**
   * DOM に反映する Effect
   * テーマが変更されたときのみ実行
   */
  useEffect(() => {
    // HTML要素に data-theme 属性を設定
    document.documentElement.setAttribute("data-theme", theme);

    // ローカルストレージに保存
    localStorage.setItem("theme", theme);

    // body要素のクラスも更新（将来の拡張用）
    document.body.classList.remove("light-mode", "dark-mode");
    document.body.classList.add(`${theme}-mode`);
  }, [theme]);

  /**
   * システムのテーマ変更を監視
   */
  useEffect(() => {
    // ローカルストレージにテーマが保存されていない場合のみ
    if (!localStorage.getItem("theme")) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      /**
       * システムのテーマが変更されたときのハンドラ
       */
      const handleThemeChange = (e: MediaQueryListEvent) => {
        const newTheme = e.matches ? "dark" : "light";
        setTheme(newTheme);
      };

      // イベントリスナーを登録
      mediaQuery.addEventListener("change", handleThemeChange);

      // クリーンアップ：コンポーネントアンマウント時にリスナーを削除
      return () => {
        mediaQuery.removeEventListener("change", handleThemeChange);
      };
    }
  }, []);

  /**
   * テーマを切り替える
   */
  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";
      return newTheme;
    });
  };

  return { theme, toggleTheme };
};
