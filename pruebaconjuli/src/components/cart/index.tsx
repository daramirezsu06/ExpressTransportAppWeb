"use client";
import { getDataProduct, getProductById } from "@/utils/getData";
import { ProductCart } from "../product_cart";
import { json } from "stream/consumers";
import { useEffect, useState } from "react";
import { IProduct, IProductcart } from "@/app/types";
import ItemProductCart from "../itemProductCart";
import { createOrder } from "@/utils/postOrder";
import { useLoginContext } from "../loginContext";
import Cookies from "js-cookie";

const Cart = () => {
  const { token } = useLoginContext();
  const [products, setProducts] = useState<IProductcart[]>([]);
  useEffect(() => {
    const arrayProducts = JSON.parse(localStorage.getItem("car") || "[]");
    const products = arrayProducts.map(
      async (item: { id: number; cantidad: number }) => {
        const product = await getProductById(item.id);
        return { ...product, cantidad: item.cantidad };
      }
    );
    Promise.all(products).then((products) => setProducts(products));
  }, []);

  const handleClick = async () => {
    const arrayProducts = products.map((product) => {
      return product.id;
    });

    const response = await createOrder(arrayProducts, Cookies.get("token"));
    console.log(response);

    localStorage.removeItem("car");
  };

  return (
    <div className="flex flex-col items-center ">
      <div className="md:w-3/4 flex flex-wrap m-auto gap-2 justify-center ">
        {products.map((product) => (
          <ItemProductCart key={product.id} {...product} />
        ))}
      </div>
      <button className="bg-red-500 rounded-md px-8 my-4" onClick={handleClick}>
        BUY
      </button>
    </div>
  );
};

export default Cart;
