'use client';
import { useContext, useEffect, useState } from 'react';
import SectionHeaders from '../components/layout/header/SectionHeaders';
import { CartContext, cartProductPrice } from '../components/AppContext';
import Image from 'next/image';
import Trash from '../components/icons/Trash';
import AddressInputs from '../components/layout/AddressInputs';
import { useProfile } from './../hooks/GetProfile';
import toast from 'react-hot-toast';
import CartProduct from '../components/layout/menu/CartProduct';

const CartPage = () => {
  const { cartProducts, removeCartProducts } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.href.includes('canceled=1')) {
        toast.error('Payment cancelled');
      }
    }
  }, []);

  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, city, postalCode, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAddress,
        city,
        postalCode,
        country,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let subtotal = 0;

  for (const p of cartProducts) {
    subtotal += cartProductPrice(p);
  }

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  async function proceedToCheckout(ev) {
    ev.preventDefault();

    const promise = new Promise((resolve, reject) => {
      fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });
    toast.promise(promise, {
      loading: 'Preparing your order...',
      success: 'Please proceed with payment',
      error: 'Something went wrong, please try again later.',
    });
  }

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 min-h-screen text-center">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4">Your cart is empty</p>
      </section>
    );
  }

  return (
    <section className="mt-8 min-h-screen">
      <div className="text-center p-8 mb-12">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <CartProduct
                product={product}
                onRemove={removeCartProducts}
                key={index}
                index={index}
              />
            ))}
          <div className="text-primary flex py-2 justify-end items-center pr-16">
            <div className="font-semibold">
              Subtotal:
              <br />
              Delivery:
              <br />
              Total:
            </div>
            <div className="font-bold pl-2 text-right">
              ${subtotal} <br />
              $5 <br />${subtotal + 5}
            </div>
          </div>
        </div>
        <div className="bg-lightGray p-4 rounded-lg ml-8">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <label>Address</label>
            <AddressInputs
              addressProps={address}
              setAddressProp={handleAddressChange}
            />
            <button type="submit">Pay ${subtotal + 5}</button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default CartPage;
