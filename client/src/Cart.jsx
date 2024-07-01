import { axiosInstance } from "./lib/axios";
import { response, imageUrl } from "./lib/response";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Button } from "./components/ui/button";
import { useToast } from "./components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

export const Cart = () => {
  const { toast } = useToast();

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const {
    data: products,
    isLoading,
    refetch: refetchProduct,
  } = useQuery({
    queryFn: async () => {
      const productResponse = await axiosInstance.get("products");
      return response(productResponse);
    },
    queryKey: ["product"],
  });

  const useCreateProduct = ({ onSuccess }) => {
    return useMutation({
      mutationFn: async (body) => {
        const productResponse = await axiosInstance.post("products", body, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        return productResponse;
      },

      onSuccess,
    });
  };

  const { mutate, isLoading: isLoadingCreate } = useCreateProduct({
    onSuccess: () => {
      refetchProduct();
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      category: "",
      image: null,
    },

    onSubmit: () => {
      const { name, price, category, image } = formik.values;

      mutate({
        product_name: name,
        product_price: price,
        product_category: category,
        image: image,
      });

      toast({
        title: "Succes",
        description: "Success add new product!",
      });
    },
  });

  const useDeleteProduct = ({ onSuccess }) => {
    return useMutation({
      mutationFn: async (id) => {
        const productResponse = await axiosInstance.delete(`products/${id}`);
        return productResponse;
      },

      onSuccess,
    });
  };

  const handleInput = (event) => {
    formik.setFieldValue(event.target.name, event.target.value);
  };

  const confirmationDelete = (id) => {
    const showDelete = confirm("Are you sure?");

    if (showDelete) {
      deleteProduct(id);
      toast({
        title: "Deleted product",
        description: "Success delete product",
        variant: "destructive",
      });
    }
  };

  const { mutate: deleteProduct } = useDeleteProduct({
    onSuccess: () => {
      refetchProduct();
    },
  });

  const handleFile = (event) => {
    formik.setFieldValue(event.target.name, event.currentTarget.files[0]);
  };

  const renderCart = () => {
    return cart.map((product, index) => (
      <li key={index}>
        <div className="flex justify-between w-[300px]">
          <div>
            <p>{product.product_name}</p>
            <p>{product.product_price}</p>
            <p>qty : {product.qty}</p>
          </div>

          <img
            src={imageUrl(product.image)}
            className="w-[80px] h-[80px]"
            alt=""
          />
        </div>
      </li>
    ));
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );

      if (!updatedCart.some((item) => item.id === product.id)) {
        updatedCart.push({ ...product, qty: 1 });
      }

       const newTotal = updatedCart.reduce(
         (acc, item) => acc + item.product_price * item.qty,
         0
       );
       
       setTotal(newTotal);


      return updatedCart;
    });

    toast({
      title: "add to cart",
      description: "Success add product to your cart",
    });
  };

  return (
    <div className="p-10 w-full">
      <div className="w-[1000px] mx-auto">
        <h1 className="font-bold text-3xl mb-2">Hello World!</h1>
        <div className="flex justify-between">
          <div className="w-[400px] border p-5 shadow">
            <form onSubmit={formik.handleSubmit}>
              <table>
                <tbody>
                  <tr>
                    <td>nama</td>
                    <td>
                      <input
                        type="text"
                        className="border"
                        onChange={handleInput}
                        name="name"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Harga</td>
                    <td>
                      <input
                        type="text"
                        className="border"
                        name="price"
                        onChange={handleInput}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Category</td>
                    <td>
                      <input
                        type="text"
                        className="border"
                        name="category"
                        onChange={handleInput}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Gambar</td>
                    <td>
                      <input
                        type="file"
                        className="border w-[250px]"
                        name="image"
                        onChange={handleFile}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              {isLoadingCreate ? (
                "tunggu ..."
              ) : (
                <Button className="">Tambah</Button>
              )}
            </form>
          </div>
          <Card>
            <CardHeader>Shopping Cart</CardHeader>
            <CardContent>
              <ul>
                {cart.length !== 0 ? (
                  renderCart()
                ) : (
                  <h1>Keranjang anda kosong!</h1>
                )}
              </ul>
            </CardContent>
            <CardFooter className="flex justify-between">
              <h1>Total</h1>
              <h1>{total}</h1>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-4">
          {isLoading
            ? "loading ..."
            : products.map((product) => (
                <Card key={product.id}>
                  <CardHeader>
                    <img
                      src={imageUrl(product.image)}
                      className="w-[200px] h-[200px]"
                      alt=""
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{product.product_name}</CardTitle>
                    <h1>{product.product_category}</h1>
                    <h1>{product.product_price}</h1>
                  </CardContent>
                  <CardFooter>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => confirmationDelete(product.id)}
                        variant="destructive"
                      >
                        Hapus
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleAddToCart(product)}
                      >
                        Keranjang
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
        </div>
      </div>
    </div>
  );
};
