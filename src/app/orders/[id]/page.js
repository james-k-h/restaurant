'use client';
import { CartContext, cartProductPrice } from '@/app/components/AppContext';
import AddressInputs from '@/app/components/layout/AddressInputs';
import SectionHeaders from '@/app/components/layout/header/SectionHeaders';
import CartProduct from '@/app/components/layout/menu/CartProduct';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

const OrderPage = () => {
  const { clearCart } = useContext(CartContext);
  const [order, setOrder] = useState();
  const [loadingOrder, setLoadingOrder] = useState(true)
  const { id } = useParams();
  useEffect(() => {
    if (typeof window.console !== 'undefined') {
      if (window.location.href.includes('clear-cart=1')) {
        clearCart();
      }
    }
    if (id) {
      setLoadingOrder(true)
      fetch('/api/orders?_id=' + id).then((res) => {
        res.json().then((orderData) => {
          setOrder(orderData);
          setLoadingOrder(false)
        });
      });
    }
  }, []);

  let subtotal = 0

  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product)
    }
  }

  return (
    <section className="max-w-4xl text-center mx-auto mt-8 h-screen">
      <div className="text-center mt-8">
        <SectionHeaders mainHeader="Your Order" />
        <div className="my-4 text-primary font-semibold">
          <p>Thank you for your order.</p>
          <p>We will call you when your meal is on route.</p>
        </div>
      </div>
      {loadingOrder && (
        <div>
          Loading your order
        </div>
      )}
      {order && (
        <div className="text-primary  grid md:grid-cols-2 md:gap-16 mt-16">
          <div>
            {order.cartProducts.map((product) => (
              <CartProduct product={product}  />
            ))}
             <div className="text-primary flex py-2 justify-end items-center pr-2">
            <div className="font-semibold">
              Subtotal:
              <br />
              Delivery:
              <br />
              Total:
            </div>
            <div className="font-bold pl-2 text-right">
              ${subtotal}<br />
              $5 <br />${subtotal + 5}
            </div>
          </div>
          </div>
          <div>
            <div className="bg-lightGray p-4 rounded-lg">
              <AddressInputs
            addressProps={...order}
            disabled={true}
            /></div>
          </div>
        </div>
      )}
    </section>
  );
};
export default OrderPage;
