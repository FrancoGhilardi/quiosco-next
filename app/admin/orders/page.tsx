"use client";
import React, { memo } from "react";
import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import useSWR from "swr";
import { OrderWithProducts } from "@/src/types";

const OrdersPage: React.FC = () => {
  const url = "/admin/orders/api";

  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);

  const { data, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  });

  if (isLoading) return <p>Cargando...</p>;

  if (data)
    return (
      <>
        <Heading>Administrar Ordenes</Heading>

        {data.length ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
            {data.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <p className="text-center">No hay ordenes pendientes</p>
        )}
      </>
    );
};

export default memo(OrdersPage);
