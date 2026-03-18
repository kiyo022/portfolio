/**
 * API呼び出し関数
 * Supabaseを使用した顧客・メモの CRUD 操作
 */
import type { CustomerFormInput, NoteFormInput } from "../types";
import { supabase } from "./supabase";

/**
 * ===================== 顧客関連 API =====================
 */

/**
 * すべての顧客を取得（オプションで検索キー付き）
 * @param search 検索キーワード（名前、メール、電話番号で検索）
 * @returns 顧客データの配列
 */
export const fetchCustomers = async (search?: string) => {
  let query = supabase.from("customers_info").select("*");

  // 検索キーワードがある場合、複数フィールドで検索
  if (search) {
    query = query.or(
      `customer_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`,
    );
  }

  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) throw error;
  return data;
};

/**
 * IDで指定した顧客情報を取得
 * @param id 顧客ID
 * @returns 顧客データ
 */
export const fetchCustomerById = async (id: string) => {
  const { data, error } = await supabase
    .from("customers_info")
    .select("*")
    .eq("customer_id", id)
    .single();

  if (error) throw error;
  return data;
};

/**
 * 新しい顧客を作成
 * @param input 顧客フォーム入力
 * @returns 作成された顧客データ
 */
export const createCustomer = async (input: CustomerFormInput) => {
  const { data, error } = await supabase
    .from("customers_info")
    .insert([
      {
        customer_name: input.customer_name,
        email: input.email,
        phone: input.phone,
        address: input.address,
      },
    ])
    .select();

  if (error) throw error;
  return data?.[0];
};

/**
 * 既存の顧客情報を更新
 * @param id 顧客ID
 * @param input 更新内容
 * @returns 更新された顧客データ
 */
export const updateCustomer = async (id: string, input: CustomerFormInput) => {
  const { data, error } = await supabase
    .from("customers_info")
    .update({
      customer_name: input.customer_name,
      email: input.email,
      phone: input.phone,
      address: input.address,
      updated_at: new Date().toISOString(),
    })
    .eq("customer_id", id)
    .select();

  if (error) throw error;
  return data?.[0];
};

/**
 * 顧客を削除（関連するメモもカスケード削除される）
 * @param id 顧客ID
 */
export const deleteCustomer = async (id: string) => {
  const { error } = await supabase
    .from("customers_info")
    .delete()
    .eq("customer_id", id);

  if (error) throw error;
};

/**
 * ===================== メモ関連 API =====================
 */

/**
 * 指定した顧客のメモをすべて取得
 * @param customerId 顧客ID
 * @returns メモデータの配列
 */
export const fetchNotes = async (customerId: string) => {
  const { data, error } = await supabase
    .from("customer_notes")
    .select("*")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
};

/**
 * 新しいメモを作成
 * @param customerId 顧客ID
 * @param input メモフォーム入力
 * @returns 作成されたメモデータ
 */
export const createNote = async (customerId: string, input: NoteFormInput) => {
  const { data, error } = await supabase
    .from("customer_notes")
    .insert([
      {
        customer_id: customerId,
        note_text: input.note_text,
      },
    ])
    .select();

  if (error) throw error;
  return data?.[0];
};

/**
 * 既存のメモを更新
 * @param noteId メモID
 * @param input 更新内容
 * @returns 更新されたメモデータ
 */
export const updateNote = async (noteId: string, input: NoteFormInput) => {
  const { data, error } = await supabase
    .from("customer_notes")
    .update({
      note_text: input.note_text,
      updated_at: new Date().toISOString(),
    })
    .eq("note_id", noteId)
    .select();

  if (error) throw error;
  return data?.[0];
};

/**
 * メモを削除
 * @param noteId メモID
 */
export const deleteNote = async (noteId: string) => {
  const { error } = await supabase
    .from("customer_notes")
    .delete()
    .eq("note_id", noteId);

  if (error) throw error;
};

/**
 * 顧客情報を削除
 *
 * @param customerId 顧客ID
 */
export const deleteCustomersDetail = async (customerId: string) => {
  const { error } = await supabase
    .from("customers_info")
    .delete()
    .eq("customer_id", customerId);

  const { error: noteError } = await supabase
    .from("customer_notes")
    .delete()
    .eq("customer_id", customerId);

  if (error) throw error;
  if (noteError) throw noteError;
};

/**
 * 顧客情報から関連するメモも削除
 *
 * @param customerId 顧客ID
 */
export const deleteCustomersDetailMemo = async (customerId: string) => {
  const { error: noteError } = await supabase
    .from("customer_notes")
    .delete()
    .eq("customer_id", customerId);

  if (noteError) throw noteError;
};
