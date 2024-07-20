'use client';
import { useContext, useState } from 'react';
import { CartContext } from '../../AppContext';
import toast from 'react-hot-toast';
import MenuItemCard from './MenuItemCard';
import Image from 'next/image';
import FlyingButton from 'react-flying-item';

const MenuItem = (menuItem) => {
  const { image, name, description, basePrice, sizes, extraIngredientPrices } =
    menuItem;

  const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedExtras, setSelectedExtras] = useState([]);

  const { addToCart } = useContext(CartContext);

  async function handleAddToCartButtonClick() {
    const hasOptions = sizes.length > 0 || extraIngredientPrices.length > 0;
    if (hasOptions && !showPopup) {
      setShowPopup(true);
      return;
    }

    addToCart(menuItem, selectedSize, selectedExtras);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setShowPopup(false);

    toast.success('Added to your cart!', {
      position: 'top-right',
    });
  }

  function handleExtraThingClick(ev, extraThing) {
    const checked = ev.target.checked;

    if (checked) {
      setSelectedExtras((prev) => [...prev, extraThing]);
    } else {
      setSelectedExtras((prev) => {
        prev.filter((e) => e.name !== extraThing.name);
      });
    }
  }

  let selectedPrice = basePrice;

  if (selectedSize) {
    selectedPrice += selectedSize.price;
  }

  if (selectedExtras?.length > 0) {
    for (const extra of selectedExtras) {
      selectedPrice += extra.price;
    }
  }

  return (
    <>
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/40 flex items-center justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="bg-white p-4 rounded-lg max-w-md max-h-screen overflow-scroll my-8"
          >
            <Image
              src={image}
              alt={name}
              width={300}
              height={200}
              className="mx-auto"
            />
            <h2 className="text-lg font-bold text-center mb-4">{name}</h2>
            <p className="text-center text-gray-500 text-sm mb-2">
              {description}
            </p>{' '}
            <p className="text-center text-gray-500 text-sm mb-2">
              {description}
            </p>{' '}
            <p className="text-center text-gray-500 text-sm mb-2">
              {description}
            </p>{' '}
            <p className="text-center text-gray-500 text-sm mb-2">
              {description}
            </p>{' '}
            <p className="text-center text-gray-500 text-sm mb-2">
              {description}
            </p>
            {sizes?.length > 0 && (
              <div className="bg-tan rounded-md p-2">
                <h3 className="text-center text-gray-500">Pick your size</h3>
                {sizes.map((size, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-1 p-4 mb-1"
                  >
                    <input
                      type="radio"
                      name="size"
                      onClick={() => setSelectedSize(size)}
                      checked={selectedSize?.name === size.name}
                    />
                    <b>{size.name}</b> ${basePrice + size.price}
                  </label>
                ))}
              </div>
            )}
            {extraIngredientPrices?.length > 0 && (
              <div className="bg-tan rounded-md p-2">
                <h3 className="text-center text-gray-500">
                  Choose Additional Toppings
                </h3>
                {extraIngredientPrices.map((extraThing, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-1 p-4 mb-1"
                  >
                    <input
                      type="checkbox"
                      name={extraThing.name}
                      onClick={(ev) => handleExtraThingClick(ev, extraThing)}
                    />
                    <b>{extraThing.name}</b> ${extraThing.price}
                  </label>
                ))}
                <FlyingButton targetTop={'5%'} targetLeft={'95%'} src={image}>
                  <div
                    onClick={handleAddToCartButtonClick}
                    className="primary sticky bottom-2"
                  >
                    Add to cart ${selectedPrice}
                  </div>
                </FlyingButton>

                <button className="mt-2" onClick={() => setShowPopup(false)}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      <MenuItemCard onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
};
export default MenuItem;
