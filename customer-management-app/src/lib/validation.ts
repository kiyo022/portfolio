//顧客名
export const valudeateCustomerName = (name: string): string | null => {
  if (!name.trim()) {
    return "顧客名は必須です";
  }
  if (name.length > 100) {
    return "顧客名は100文字以内で入力してください";
  }
  return null;
};

//メールアドレス
export const validateEmail = (email: string): string | null => {
  if (email.trim() === "") {
    return null; // メールアドレスは必須ではないため、空の場合はエラーなしとする
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "有効なメールアドレスを入力してください";
  }
  return null;
};

//電話番号
export const validatePhone = (phone: string): string | null => {
  if (phone.trim() === "") {
    return null; // 電話番号は必須ではないため、空の場合はエラーなしとする
  }
  const phoneRegex = /^[0-9]{10,11}$/;
  if (!phoneRegex.test(phone)) {
    return "有効な電話番号を入力してください";
  }
  return null;
};
