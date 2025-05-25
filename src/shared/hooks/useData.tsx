import { useState, useEffect } from "react"
import type { EndpointTypes } from "../utils/Types/EndpointTypeS";
import { getData } from "../middlewares/middlewares";

interface UseDataProps {
  endpoint: EndpointTypes;
  ignoreRequest?: boolean;
}

interface ApiError {
  response?: {
    status: number;
    data: unknown;
  };
}

export const useData = ({
  endpoint,
  ignoreRequest = false,
}: UseDataProps) => {
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getData(endpoint);

      console.log("respones", response)
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err as ApiError);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!ignoreRequest) {
      fetchData();
    }
  }, [endpoint, ignoreRequest]);

  return {
    data,
    loading,
    error,
    refresh: fetchData,
    status: !error ? 200 : error?.response?.status,
  }
}