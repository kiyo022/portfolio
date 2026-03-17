/**
 * 顧客管理アプリの型定義
 */

/**
 * 顧客情報の型
 */
export interface Customer {
  customer_id: string;
  customer_name: string;
  email?: string;
  phone?: string;
  address?: string;
  created_at: string;
  updated_at?: string;
}

/**
 * 顧客フォーム入力の型
 */
export interface CustomerFormInput {
  customer_name: string;
  email?: string;
  phone?: string;
  address?: string;
}

/**
 * メモ・対応履歴の型
 */
export interface Note {
  note_id: string;
  customer_id: string;
  note_text: string;
  created_at: string;
  updated_at?: string;
}

/**
 * メモフォーム入力の型
 */
export interface NoteFormInput {
  note_text: string;
}

/**
 * API レスポンスの標準ラッパー
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
