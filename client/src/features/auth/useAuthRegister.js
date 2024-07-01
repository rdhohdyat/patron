import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";

const useAuthRegister = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async (body) => {
      const userResponse = await axiosInstance.post("register", body, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return userResponse.data;
    },
    onSuccess,
    onError,
  });
};

export default useAuthRegister;
