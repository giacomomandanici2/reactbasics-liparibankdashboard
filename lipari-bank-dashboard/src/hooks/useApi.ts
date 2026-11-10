import { useEffect, useState } from "react";

interface ApiError {
  message: string;
  statusCode: number;
}

interface UseApiResult<T> {
  data: T | null;
  isLoading: boolean;
  error: ApiError | null;
  refetch: () => void;
}

export function useApi<T>(url: string): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) {
          throw { message: `HTTP ${res.status}`, statusCode: res.status };
        }
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError(err as ApiError);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [url, refetchTrigger]);

  const refetch = () => setRefetchTrigger((prev) => prev + 1);

  return { data, isLoading, error, refetch };
}
