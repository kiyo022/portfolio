import { useEffect, useState } from "react";
import {
  createCustomer,
  deleteCustomer,
  fetchCustomers,
  updateCustomer,
} from "../lib/api";
import type { Customer, CustomerFormInput } from "../types";

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadCustomers = async (search?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchCustomers(search);
      setCustomers(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading customers");
    } finally {
      setIsLoading(false);
    }
  };

  const addCustomer = async (input: CustomerFormInput) => {
    try {
      const newCustomer = await createCustomer(input);
      setCustomers([newCustomer, ...customers]);
      return newCustomer;
    } catch (err) {
      throw err instanceof Error ? err : new Error("Error creating customer");
    }
  };

  const editCustomer = async (id: string, input: CustomerFormInput) => {
    try {
      const updated = await updateCustomer(id, input);
      setCustomers(customers.map((c) => (c.customer_id === id ? updated : c)));
      return updated;
    } catch (err) {
      throw err instanceof Error ? err : new Error("Error updating customer");
    }
  };

  const removeCustomer = async (id: string) => {
    try {
      await deleteCustomer(id);
      setCustomers(customers.filter((c) => c.customer_id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error("Error deleting customer");
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  return {
    customers,
    isLoading,
    error,
    loadCustomers,
    addCustomer,
    editCustomer,
    removeCustomer,
  };
};
