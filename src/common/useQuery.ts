import { useEffect, useState } from "react";
import axios from "axios";

interface QueryHookResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

const useQuery = <T>(url: string, query: string): QueryHookResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(url, { query });
        setData(response.data.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, query]);

  return { data, loading, error };
};

export default useQuery;
