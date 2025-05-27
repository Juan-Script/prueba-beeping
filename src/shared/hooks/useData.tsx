import { useState, useEffect } from "react"
import { getData } from "../middlewares/middlewares";
import type { EndpointTypes } from "../utils/Types/EndpointTypes"
import type { PaginatedResponseInt, ApiErrorInt, UseDataReturnInt, TableRowInt } from "@/interfaces/TableInt";

interface Props {
  endpoint: EndpointTypes;
  ignoreRequest?: boolean;
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
}

export const useData = ({
  endpoint,
  ignoreRequest = false,
  page = 1,
  limit = 20,
  sort,
  search,
}: Props): UseDataReturnInt => {
  const [data, setData] = useState<PaginatedResponseInt | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ApiErrorInt | null>(null);

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
      const responseData = response.data as unknown as PaginatedResponseInt;

      if (page === 1) {
        setData(responseData);
      } else {
        setData(prev => {
          if (!prev) return responseData;
          return {
            results: [...prev.results, ...responseData.results],
            count: responseData.count,
            next: responseData.next,
            previous: responseData.previous,
          };
        });
      }
      setError(null);
    } catch (err) {
      setError(err as ApiErrorInt);
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