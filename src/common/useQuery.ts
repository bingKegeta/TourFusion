import { useState } from "react";
import axios, { AxiosResponse } from "axios";

interface QueryHookResult<T> {
  executeQuery: (query: string, variables?: any) => Promise<QueryResponse<T>>;
  loading: boolean;
  error: Error | null;
}

interface QueryResponse<T> {
  data: T | null;
  response: AxiosResponse<T> | null;
}

const useQuery = <T>(url: string): QueryHookResult<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const executeQuery = async (
    query: string,
    variables?: any
  ): Promise<QueryResponse<T>> => {
    setLoading(true);

    try {
      const response = await axios.post(url, { query: query, variables });
      const responseData: T | null = response.data.data;
      return { data: responseData, response };
    } catch (err: any) {
      console.error("Error executing query:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { executeQuery, loading, error };
};

export default useQuery;
