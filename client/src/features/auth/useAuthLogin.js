import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import useAuthStore from "@/lib/zustand/authStore";

const useAuthLogin = ({ onSuccess, onError }) => {
  const { setUserAndToken } = useAuthStore();
  return useMutation({
    mutationFn: async (credentials) => {
      const response = await axiosInstance.post("login", credentials);
      const data = response.data;
      setUserAndToken(data.user, data.token);
      return data;
    },
    onSuccess,
    onError,
  });
};

export default useAuthLogin;
