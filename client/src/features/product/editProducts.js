import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";

export const useEditProduct = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (body) => {
      const productResponse = await axiosInstance.put(
        `products/${body.id}`,
        body
      );
      return productResponse;
    },

    onSuccess,
  });
};
