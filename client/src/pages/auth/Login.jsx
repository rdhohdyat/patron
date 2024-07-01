import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import useAuthLogin from "@/features/auth/useAuthLogin";

const LoginPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useAuthLogin({
    onSuccess: () => {
      navigate("/");
      toast({
        title: "Berhasil login",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Login gagal",
        variant: "alert",
      });
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      await login(credentials);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Masukkan email dan password Anda untuk masuk ke akun Anda
            </p>
          </div>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ucup@contoh.com"
                  name="email"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Lupa password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  name="password"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Memproses..." : "Masuk"}
              </Button>
              <Button variant="outline" className="w-full">
                Masuk dengan Google
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Belum punya akun?{" "}
            <Link to="/register" className="underline">
              Registrasi
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block my-auto">
        <img src="/welcome.png" alt="Image" width="500" height="500" />
        <div className="text-center w-[600px]">
          <h1 className="font-semibold text-lg">
            Temukan Bahan Makanan dan Berbagai Kebutuhan Rumah Tangga di Pasar
            Terdekat
          </h1>
          <p className="mt-3">
            Gabung sekarang untuk berbelanja tanpa keluar rumah
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
