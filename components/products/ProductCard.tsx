import { formatCurrency } from "@/src/utils";
import { Product } from "@prisma/client";
import Image from "next/image";
import React from "react";
import AddProductButton from "./AddProductButton";

type ProductCardProps = {
  product: Product;
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border bg-white ">
      <Image
        src={`/products/${product.image}.jpg`}
        alt={`Imagen Platillo ${product.name}`}
        width={800}
        height={500}
      />
      <div className="p-5">
        <h3 className="text-2xl font-bold">{product.name}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatCurrency(product.price)}
        </p>
        <AddProductButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
