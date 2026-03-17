import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export type CustomerProps = {
  /** 顧客ID */
  customer_id: string;
  /** 顧客名 */
  customer_name: string;
  /** メールアドレス */
  email: string | null;
  /** 電話番号 */
  phone: string | null;
  /** 住所 */
  address: string | null;
  /** 登録日 */
  created_at: string;
  /** 更新日 */
  updated_at: string | null;
};

export const useCustomers = () => {
  const [customers, setCustomers] = useState<CustomerProps[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    const { data, error } = await supabase
      .from("customers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setCustomers([]); // ← エラーでも空配列をセット
      return;
    }

    setCustomers(data ?? []); // ← null でも空配列
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchCustomers();
      setLoading(false);
    };

    load();
  }, []);

  return { customers, loading, fetchCustomers };
};
