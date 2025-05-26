import { useState, useEffect } from "react"
import type { EndpointTypes } from "../utils/Types/EndpointTypeS";
import { getData } from "../middlewares/middlewares";

interface UseDataProps {
  endpoint: EndpointTypes;
  ignoreRequest?: boolean;
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
}

interface ApiError {
  response?: {
    status: number;
    data: unknown;
  };
}

interface PaginatedResponse {
  results: any[];
  count: number;
  next: string | null;
  previous: string | null;
}

export const useData = ({
  endpoint,
  ignoreRequest = false,
  page = 1,
  limit = 20,
  sort,
  search,
}: UseDataProps) => {
  const [data, setData] = useState<PaginatedResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const buildQueryString = () => {
    const params = new URLSearchParams();
    
    params.append('page', page.toString());
    params.append('per-page', limit.toString());
    
    if (sort) {
      params.append('sort', sort);
    }
    
    if (search) {
      params.append('filter', `title.search:${search}`);
    }

    return params.toString();
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const queryString = buildQueryString();
      const response = await getData(`${endpoint}?${queryString}`);

      if (page === 1) {
        setData(response.data as PaginatedResponse);
      } else {
        setData(prev => {
          if (!prev) return response.data as PaginatedResponse;
          return {
            ...response.data,
            results: [...prev.results, ...(response.data as PaginatedResponse).results]
          } as PaginatedResponse;
        });
      }
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
  }, [endpoint, ignoreRequest, page, limit, sort, search]);

  return {
    data,
    loading,
    error,
    refresh: fetchData,
    status: !error ? 200 : error?.response?.status,
    hasMore: data?.next !== null
  }
}