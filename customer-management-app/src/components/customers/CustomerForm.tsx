/**
 * 顧客フォームコンポーネント
 * 新規作成・編集用の統一フォーム
 */
import React, { useEffect, useState } from "react";
import { isValidEmail, isValidPhone } from "../../lib/utils";
import type { Customer, CustomerFormInput } from "../../types";
import Button from "../common/Button";
import Card from "../common/Card";

interface CustomerFormProps {
  // 編集対象の顧客データ（新規作成の場合は null）
  initialData?: Customer | null;

  // ローディング状態
  isLoading: boolean;

  // フォーム送信時のコールバック
  onSubmit: (data: CustomerFormInput) => Promise<void>;

  // キャンセル時のコールバック
  onCancel: () => void;
}

/**
 * 顧客フォームコンポーネント
 */
const CustomerForm: React.FC<CustomerFormProps> = ({
  initialData,
  isLoading,
  onSubmit,
  onCancel,
}) => {
  // フォームデータの状態
  const [formData, setFormData] = useState<CustomerFormInput>({
    customer_name: "",
    email: "",
    phone: "",
    address: "",
  });

  // エラーメッセージの状態
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 送信中状態
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * 初期データが変更されたときにフォームを更新
   */
  useEffect(() => {
    if (initialData) {
      setFormData({
        customer_name: initialData.customer_name,
        email: initialData.email || "",
        phone: initialData.phone || "",
        address: initialData.address || "",
      });
    }
  }, [initialData]);

  /**
   * 入力値変更時のハンドラ
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 入力時にエラーをクリア
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  /**
   * フォームバリデーション
   */
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 顧客名は必須
    if (!formData.customer_name.trim()) {
      newErrors.customer_name = "顧客名は必須です";
    } else if (formData.customer_name.length > 63) {
      newErrors.customer_name = "顧客名は63文字以内です";
    }

    // メールアドレスのバリデーション（空でない場合）
    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = "有効なメールアドレスを入力してください";
    }

    // 電話番号のバリデーション（空でない場合）
    if (formData.phone && !isValidPhone(formData.phone)) {
      newErrors.phone = "有効な電話番号を入力してください（10桁以上）";
    }

    // 住所の長さチェック
    if (formData.address && formData.address.length > 255) {
      newErrors.address = "住所は255文字以内です";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * フォーム送信時のハンドラ
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // バリデーション
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
    } catch (err) {
      alert(
        "保存に失敗しました: " +
          (err instanceof Error ? err.message : "不明なエラー"),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // フォームコンテナのスタイル
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-4)",
    maxWidth: "600px",
  };

  // タイトルのスタイル
  const titleStyle: React.CSSProperties = {
    fontSize: "var(--text-2xl)",
    fontWeight: "var(--font-weight-bold)",
    color: "var(--text-primary)",
    margin: 0,
  };

  // フォームグループのスタイル
  const formGroupStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "var(--spacing-2)",
  };

  // ラベルのスタイル
  const labelStyle: React.CSSProperties = {
    fontWeight: "var(--font-weight-medium)",
    color: "var(--text-primary)",
    fontSize: "var(--text-sm)",
  };

  // 入力フィールドのスタイル
  const inputStyle: React.CSSProperties = {
    padding: "var(--spacing-2) var(--spacing-3)",
    borderRadius: "var(--radius-md)",
    border: "1px solid var(--border-color)",
    backgroundColor: "var(--bg-primary)",
    color: "var(--text-primary)",
    fontSize: "var(--text-base)",
    fontFamily: "var(--font-family-sans)",
    transition: "all var(--transition-base)",
  };

  // エラーメッセージのスタイル
  const errorStyle: React.CSSProperties = {
    color: "var(--color-danger-500)",
    fontSize: "var(--text-sm)",
    marginTop: "var(--spacing-1)",
  };

  // ボタングループのスタイル
  const buttonGroupStyle: React.CSSProperties = {
    display: "flex",
    gap: "var(--spacing-2)",
    marginTop: "var(--spacing-4)",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>
        {initialData ? "顧客情報編集" : "新規顧客追加"}
      </h1>

      <Card>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-4)",
          }}
        >
          {/* 顧客名 */}
          <div style={formGroupStyle}>
            <label style={labelStyle}>
              顧客名 <span style={{ color: "var(--color-danger-500)" }}>*</span>
            </label>
            <input
              type="text"
              name="customer_name"
              value={formData.customer_name}
              onChange={handleChange}
              placeholder="顧客の名前を入力"
              style={{
                ...inputStyle,
                borderColor: errors.customer_name
                  ? "var(--color-danger-500)"
                  : "var(--border-color)",
              }}
              maxLength={63}
              required
            />
            {errors.customer_name && (
              <div style={errorStyle}>⚠️ {errors.customer_name}</div>
            )}
          </div>

          {/* メールアドレス */}
          <div style={formGroupStyle}>
            <label style={labelStyle}>📧 メールアドレス</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              style={{
                ...inputStyle,
                borderColor: errors.email
                  ? "var(--color-danger-500)"
                  : "var(--border-color)",
              }}
            />
            {errors.email && <div style={errorStyle}>⚠️ {errors.email}</div>}
          </div>

          {/* 電話番号 */}
          <div style={formGroupStyle}>
            <label style={labelStyle}>📱 電話番号</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="090-1234-5678"
              style={{
                ...inputStyle,
                borderColor: errors.phone
                  ? "var(--color-danger-500)"
                  : "var(--border-color)",
              }}
            />
            {errors.phone && <div style={errorStyle}>⚠️ {errors.phone}</div>}
          </div>

          {/* 住所 */}
          <div style={formGroupStyle}>
            <label style={labelStyle}>📍 住所</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="住所を入力"
              style={{
                ...inputStyle,
                minHeight: "100px",
                resize: "vertical",
              }}
              maxLength={255}
            />
            {errors.address && (
              <div style={errorStyle}>⚠️ {errors.address}</div>
            )}
          </div>

          {/* ボタングループ */}
          <div style={buttonGroupStyle}>
            <Button
              type="submit"
              disabled={isSubmitting || isLoading}
              style={{ flex: 1 }}
            >
              {isSubmitting
                ? "保存中..."
                : initialData
                  ? "更新する"
                  : "追加する"}
            </Button>
            <Button
              variant="secondary"
              onClick={onCancel}
              disabled={isSubmitting || isLoading}
              style={{ flex: 1 }}
            >
              キャンセル
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CustomerForm;
