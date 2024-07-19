'use client';
import { useContext, useEffect, useState } from 'react';
import SectionHeaders from '../components/layout/header/SectionHeaders';
import { CartContext, cartProductPrice } from '../components/AppContext';
import Image from 'next/image';
import Trash from '../components/icons/Trash';
import AddressInputs from '../components/layout/AddressInputs';
import { useProfile } from './../hooks/GetProfile';

const CartPage = () => {
  const { cartProducts, removeCartProducts } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();

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
  let total = 0;

  for (const p of cartProducts) {
    total += cartProductPrice(p);
  }

  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  return (
    <section className="mt-8 min-h-screen">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, i) => (
              <div
                key={i}
                className="text-light items-center flex gap-4 mb-2 border-b py-2 "
              >
                <div className="w-24">
                  <Image
                    src={product.image}
                    alt={''}
                    width={240}
                    height={240}
                  />
                </div>
                <div className="grow">
                  <h3 className="font-semibold text-primary">{product.name}</h3>
                  {product.size && (
                    <div className="text-sm">
                      Size: <span>{product.size.name}</span>
                    </div>
                  )}
                  {product.extras?.length > 0 && (
                    <div className="text-sm">
                      Extras:
                      {product.extras.map((extra, i) => (
                        <div key={i}>
                          {extra.name} ${extra.price}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-lg font-semibold">
                  ${cartProductPrice(product)}
                </div>
                <div className="ml-2">
                  <button
                    type="button"
                    onClick={() => removeCartProducts(i)}
                    className="p-2"
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))}
          <div className="text-primary  py-4 text-right pr-16">
            Subtotal: <span className="font-bold">${total}</span>
          </div>
        </div>
        <div className="bg-lightGray p-4 rounded-lg">
          <h2>Checkout</h2>
          <form>
            <label>Address</label>
            <AddressInputs
              addressProps={address}
              setAddressProp={handleAddressChange}
            />
            <button type="submit">Pay ${total}</button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default CartPage;
