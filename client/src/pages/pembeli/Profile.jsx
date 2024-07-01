import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MainLayout } from "@/components/MainLayout";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SecondNavbar } from "@/components/SecondNavbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useAuthStore from "@/lib/zustand/authStore";

const ProfilePage = () => {
  const { user } = useAuthStore();

  return (
    <div>
      <SecondNavbar title="Profil"></SecondNavbar>
      <MainLayout>
        <div className="sm:grid grid-cols-2 gap-3">
          <div>
            <div className="flex items-center gap-3">
              <Avatar className="w-[80px]  h-[80px]">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div>
                <h1 className="font-semibold text-lg">{user.name}</h1>
                <h3>{user.email}</h3>
              </div>
            </div>
            <Button className="mt-2 w-full">Edit profil</Button>
          </div>
          <div className="mt-3">
            <Tabs defaultValue="pesanan" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="pesanan" className="w-full">
                  Pesanan
                </TabsTrigger>
                <TabsTrigger value="transaksi" className="w-full">
                  Transaksi
                </TabsTrigger>
              </TabsList>
              <TabsContent value="pesanan">
                <div className="shadow mt-3 p-2">
                  <div className="flex py-3 justify-between">
                    <div>
                      <h1>Menunggu</h1>
                    </div>
                    <div>
                      <h1>Proses</h1>
                    </div>
                    <div>
                      <h1>Selesai</h1>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="transaksi">
                <div className="shadow mt-3 p-2">
                  <div className="flex py-3 justify-between">
                    <div>
                      <h1>Jumlah Order</h1>
                    </div>
                    <div>
                      <h1>Dalam Proses</h1>
                    </div>
                    <div>
                      <h1>Selesai</h1>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </MainLayout>
      {/* <Footer /> */}
    </div>
  );
};


export default ProfilePage;
