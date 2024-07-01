import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useAuthStore from "./lib/zustand/authStore";
import DetailProduct from "./pages/product/DetailProduct";
import { LoginPage, RegisterPage, ProtectedRoute } from "./pages/auth";
import { SellerHome, InventoryProduct } from "./pages/penjual";
import { BuyerHome, SearchingPage, ProfilePage } from "./pages/pembeli";
import { Cart } from "./Cart";

const queryClient = new QueryClient();

export const App = () => {
  const { user } = useAuthStore();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {user.role === "pembeli" ? (
            <>
              <Route path="/" element={<ProtectedRoute><BuyerHome /></ProtectedRoute>} />
              <Route path="/detail/:id" element={<ProtectedRoute><DetailProduct /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/search" element={<ProtectedRoute><SearchingPage /></ProtectedRoute>} />
              <Route path="/tambah" element={<Cart />} />
            </>
          ) : (
            <>
              <Route path="/" element={<ProtectedRoute><SellerHome /></ProtectedRoute>} />
              {/* <Route path="/product/edit" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} /> */}
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            </>
          )}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
