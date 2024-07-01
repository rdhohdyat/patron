import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import useAuthRegister from "@/features/auth/useAuthRegister";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RegisterPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [role, setRole] = useState("");

  const { mutate: register, isLoading: registerLoading } = useAuthRegister({
    onSuccess: () => {
      toast({
        title: "Berhasil mendaftarkan akun",
        variant: "default",
      });
      navigate("/login");
    },
    onError: (error) => {
      toast({
        title: "Gagal mendaftarkan akun",
        variant: "alert",
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      role: "",
      password: "",
    },
    onSubmit: async () => {
      const { name, email, role, password } = formik.values;

      await register({
        name: name,
        email: email,
        role: role,
        password: password,
      });
    },
  });

  const handleFormInput = (event) => {
    console.log(event.target.value);
    formik.setFieldValue(event.target.name, event.target.value);
  };

  // const handleSelectRole = (event) => {
  //   setRole(event.target.value);
  //   console.log(role);
  // };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Register</h1>
            <p className="text-balance text-muted-foreground">
              Masukkan informasi Anda untuk membuat akun
            </p>
          </div>
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  placeholder="Ucup"
                  name="name"
                  onChange={handleFormInput}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  placeholder="ucup@contoh.com"
                  onChange={handleFormInput}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="role">Daftar sebagai</Label>

                <Select
                  className="w-full"
                  name="role"
                  onChange={handleFormInput}
                >
                  <SelectTrigger className="text-slate-500">
                    <SelectValue
                      placeholder="Pilih sebagai"
                      className="text-slate-500"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pembeli">Pembeli</SelectItem>
                    <SelectItem value="penjual">Penjual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  onChange={handleFormInput}
                  placeholder="******"
                />
              </div>
              <Button
                type="submit"
                className={`w-full ${registerLoading ? "opacity-55" : ""}`}
                disabled={registerLoading}
              >
                Buat akun
              </Button>
              <Button variant="outline" type="button" className="w-full">
                Daftar dengan Google
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Sudah punya akun?{" "}
            <Link to="/login" className="underline">
              Masuk
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

export default RegisterPage;
