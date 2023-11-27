import { useState } from "react";
import axios from "axios";

interface MutationHookResult<T> {
  executeMutation: (mutation: string, variables?: any) => Promise<T>;
  loading: boolean;
  error: Error | null;
}

const useMutation = <T>(url: string): MutationHookResult<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const executeMutation = async (
    mutation: string,
    variables?: any
  ): Promise<T> => {
    setLoading(true);

    try {
      const response = await axios.post(url, { query: mutation, variables });
      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }
      return response.data.data;
    } catch (err: any) {
      console.error("Error executing mutation:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { executeMutation, loading, error };
};

export default useMutation;
