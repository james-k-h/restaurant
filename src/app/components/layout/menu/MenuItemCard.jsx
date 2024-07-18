const MenuItemCard = ({ onAddToCart, ...item }) => {
  const { image, description, name, basePrice, sizes, extraIngredientPrices } =
    item;

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

      <button
        type="button"
        className="bg-primary text-light rounded-full  px-4 py-2 w-3/5"
        onClick={onAddToCart}
      >
        {sizes?.length > 0 || extraIngredientPrices?.length > 0 ? (
          <span>Add to cart (from ${basePrice}) </span>
        ) : (
          <span>Add to cart ${basePrice}</span>
        )}
      </button>
    </div>
  );
};
export default MenuItemCard;
