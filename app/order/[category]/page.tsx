import React, { Fragment } from "react";
import { prisma } from "@/src/lib/prisma";
import ProductCard from "@/components/products/ProductCard";

type OrderPageProps = {
  params: {
    category: string;
  };
};

async function getProducts(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category,
      },
    },
  });
  return products;
}

const OrderPage = async ({ params }: OrderPageProps) => {
  const products = await getProducts(params.category);
  return (
    <Fragment>
      <h1 className="text-2xl my-10">
        Elige y personaliza tu pedido a continuación
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Fragment>
  );
};

export default OrderPage;
