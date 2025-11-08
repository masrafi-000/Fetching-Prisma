import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useProductData(type: string | null) {
  return useQuery({
    queryKey: ["product", type],
    queryFn: async () => {
      if (!type) return null;
      const res = await axios.get(`/api/${type}`);
      return res.data;
    },
    enabled: !!type,
    staleTime: 1000 * 60, // cache 1 minute
    retry: 2, // automatic retry
  });
}
