'use client';
import { useEffect, useState } from 'react';
import SectionHeaders from '../components/layout/header/SectionHeaders';
import Tabs from '../components/layout/header/Tabs';
import { useProfile } from '../hooks/GetProfile';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const { loading, data: profile } = useProfile();

  useEffect(() => {
    fetch('/api/orders').then((res) => {
      res.json().then((orders) => {
        setOrders(orders);
      });
    });
  }, []);

  return (
    <section className="mt-8 max-w-4xl mx-auto text-primary ">
      <Tabs isAdmin={profile.admin} />
      <div className="mt-8">
        {orders?.length > 0 &&
          orders.map((order, i) => (
            <div
              key={i}
              className="text-lightBlack font-bold bg-lightGray mb-2 p-4 rounded-lg grid grid-cols-3"
            >
              <div className="text-black">{order.userEmail}</div>
              <div className="text-center">
                <span
                  className={order.paid ? 'text-green-500' : 'text-red-500'}
                >
                  {order.paid ? 'Paid' : 'Not Paid'}
                </span>
              </div>
              <div>{order.createdAt}</div>
            </div>
          ))}
      </div>
    </section>
  );
};
export default OrdersPage;
