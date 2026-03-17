import { useEffect, useState } from "react";
import type { CustomerProps } from "./../hooks/useCustomers";
import { supabase } from "./../lib/supabase";

export type NoteProps = {
  note_id: string;
  customer_id: string;
  note_text: string;
  created_at: string;
  updated_at: string;
};

export const useCustomerDetail = (id: string | undefined) => {
  const [customer, setCustomer] = useState<CustomerProps | null>(null);
  const [notes, setNotes] = useState<NoteProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);

      const { data: customerData } = await supabase
        .from("customers")
        .select("*")
        .eq("customer_id", id)
        .single();
      const { data: notesData } = await supabase
        .from("notes")
        .select("*")
        .eq("customer_id", id)
        .order("created_at", { ascending: false });

      setCustomer(customerData as CustomerProps);
      setNotes(notesData as NoteProps[]);
    };
    load();
  }, [id]);

  return { customer, notes, loading };
};
