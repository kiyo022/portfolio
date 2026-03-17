/**
 * ユーティリティ関数群
 */

/**
 * 日付を読みやすい文字列にフォーマット
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

/**
 * 日付と時刻をフォーマット
 */
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * デバウンス関数 - 型安全版
 * 指定時間内の連続呼び出しをまとめて、最後の呼び出しのみ実行
 * @param func デバウンスする関数
 * @param wait 待機時間（ミリ秒）
 * @returns デバウンスされた関数
 */
export const debounce = <T extends readonly unknown[]>(
  func: (...args: T) => void | Promise<void>,
  wait: number,
): ((...args: T) => void) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: T) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

/**
 * メールアドレスのバリデーション
 * @param email メールアドレス
 * @returns 有効な形式か判定
 */
export const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * 電話番号のバリデーション（シンプル版）
 * 10桁以上の数字を含む形式
 * @param phone 電話番号
 * @returns 有効な形式か判定
 */
export const isValidPhone = (phone: string): boolean => {
  const re = /^[\d\s\-\\+\\(\\)]+$/;
  return re.test(phone) && phone.replace(/\D/g, "").length >= 10;
};
