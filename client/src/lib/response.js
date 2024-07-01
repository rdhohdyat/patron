export const response = (data) => {
  return data.data.data.data;
};

export const imageUrl = (image) => {
  return `http://localhost:8000/storage/products/${image}`;
};

export const formatRupiah = (number) => {
  const rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits : 0,
  });

  return rupiah.format(number);
};
