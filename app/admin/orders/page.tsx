import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import React, { memo } from "react";

async function getPendigOrders() {
  const orders = await prisma.order.findMany({
    where: { status: false },
    include: { orderProduct: { include: { product: true } } },
  });
  return orders;
}

const OrdersPage: React.FC = async () => {
  const orders = await getPendigOrders();
  return (
    <>
      <Heading>Administrar Ordenes</Heading>
      {orders.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {orders.map((order) => (
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
