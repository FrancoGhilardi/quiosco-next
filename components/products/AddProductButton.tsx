"use client";
import { useStore } from "@/src/store";
import { Product } from "@prisma/client";
import React from "react";

type AddProductButtonProps = {
  product: Product;
};

const AddProductButton: React.FC<AddProductButtonProps> = ({ product }) => {
  const addToOrder = useStore((state) => state.addToOrder);
  return (
    <button
      type="button"
      className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
      onClick={() => addToOrder(product)}
    >
      Agregar
    </button>
  );
};

export default AddProductButton;
