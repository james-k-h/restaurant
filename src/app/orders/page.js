'use client';
import { useEffect, useState } from 'react';
import SectionHeaders from '../components/layout/header/SectionHeaders';
import Tabs from '../components/layout/header/Tabs';
import { useProfile } from '../hooks/GetProfile';
import { remapDateTime } from '@/libs/dateTimeConversion';
import Link from 'next/link';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { loading, data: profile } = useProfile();

  useEffect(() => {
    fetchOrders();
  }, []);

  function fetchOrders() {
    setLoadingOrders(true);
    fetch('/api/orders').then((res) => {
      res.json().then((orders) => {
        setOrders(orders.reverse());
        setLoadingOrders(false);
      });
    });
  }

  return (
    <section className="mt-8 max-w-4xl mx-auto text-primary ">
      <Tabs isAdmin={profile.admin} />
      <div className="mt-8 mb-8 text-primary text-center">
        <SectionHeaders mainHeader="Processed Orders" />
      </div>
      <div className="mt-8">
        {loadingOrders && <div>Loading all orders</div>}
        {orders?.length > 0 &&
          orders.map((order, i) => (
            <div
              key={i}
              className="gap-4 items-center text-lightBlack font-bold bg-lightGray mb-2 p-4 rounded-lg grid grid-cols-3"
            >
              <div>
                <span
                  className={order.paid ? 'text-green-500' : 'text-red-500'}
                >
                  {order.paid ? 'Paid' : 'Not Paid'}
                </span>
              </div>{' '}
              <div className="text-sm">
                <div className="text-black">{order.userEmail}</div>
                {order.cartProducts?.map((p) => p.name).join(', ')}
              </div>
              <div className="text-right flex gap-2 justify-end text-sm">
                {remapDateTime(order.createdAt)}
                <Link href={'/orders/' + order._id} className="button">
                  Show Order
                </Link>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};
export default OrdersPage;
