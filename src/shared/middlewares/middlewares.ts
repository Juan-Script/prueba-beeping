import axios from "axios";

interface ApiResponse {
  data: unknown;
  status: number;
}

export const getData = async (endpoint: string) => {
  const baseUrl = import.meta.env.VITE_URL_BASE_API;
  return await axios.get<ApiResponse>(`${baseUrl}${endpoint}`).then((response) => response);
}