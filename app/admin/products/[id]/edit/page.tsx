import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import GoBackButton from "@/components/ui/GoBackButton";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";
import React, { memo } from "react";

type EditProductPageTypes = {
  params: { id: string };
};

async function getProductById(id: number) {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return notFound();
  return product;
}

const EditProductPage: React.FC<EditProductPageTypes> = async ({ params }) => {
  const product = await getProductById(+params.id);

  return (
    <>
      <Heading>Editar Producto: {product.name}</Heading>
      <GoBackButton />
      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>
    </>
  );
};

export default memo(EditProductPage);
