import AddToCartButton from './AddToCartButton';

const MenuItemCard = ({ onAddToCart, ...item }) => {
  const { image, description, name, basePrice, sizes, extraIngredientPrices } =
    item;

  const hasSizesOrExtras =
    sizes?.length > 0 || extraIngredientPrices?.length > 0;
  return (
    <div className="flex flex-col bg-smoke p-4 rounded-lg text-center  group transition-all hover:shadow-md hover:shadow-black/75 hover:bg-white items-center ">
      <div className="text-center  ">
        <img
          src={image}
          alt="pizza"
          className="max-h-auto max-h-24 block mx-auto"
        />
      </div>
      <h4 className="font-semibold my-2">{name}</h4>
      <p className="text-gray-500 text-sm  line-clamp-3 mb-2">{description}</p>
      <AddToCartButton
        hasSizesOrExtras={hasSizesOrExtras}
        addClick={onAddToCart}
        basePrice={basePrice}
        image={image}
      />
    </div>
  );
};
export default MenuItemCard;
