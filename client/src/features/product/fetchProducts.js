import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { response } from "@/lib/response";

export const useProducts = () => {
  return useQuery({
    queryFn: async () => {
      const productResponse = await axiosInstance.get("products");
      return response(productResponse);
    },

    queryKey: ["products"],
  });
};
