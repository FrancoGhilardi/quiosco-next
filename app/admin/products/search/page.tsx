import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductsTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import React, { memo } from "react";

type SearchPageProps = {
  searchParams: { search: string };
};

async function searchProducts(searchTerm: string) {
  const products = await prisma.product.findMany({
    where: { name: { contains: searchTerm, mode: "insensitive" } },
    include: { category: true },
  });
  return products;
}

const SearchPage: React.FC<SearchPageProps> = async ({ searchParams }) => {
  const products = await searchProducts(searchParams.search);

  return (
    <>
      <Heading>Resultado de búsqueda</Heading>
      <div className="flex flex-col gap-5 lg:flex-row lg:justify-end">
        <ProductSearchForm />
      </div>
      {products.length ? (
        <ProductsTable products={products} />
      ) : (
        <p className="text-center text-lg">No hay resultados</p>
      )}
    </>
  );
};

export default memo(SearchPage);
