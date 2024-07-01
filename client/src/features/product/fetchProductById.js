import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { response } from "@/lib/response";

export const useProduct = (id) => {
  return useQuery({
    queryFn: async () => {
      const productResponse = await axiosInstance.get(`products/${id}`);
      return productResponse.data.data;
    },
    queryKey: ["product", id],
    enabled: !!id,
  });
};
