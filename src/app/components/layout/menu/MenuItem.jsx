const MenuItem = ({
  image,
  name,
  description,
  basePrice,
  sizes,
  extraIngredientPrices,
}) => {
  return (
    <div className="flex flex-col bg-almond p-4 rounded-lg text-center  group transition-all hover:shadow-md hover:shadow-black/75 hover:bg-white items-center ">
      <div className="text-center  ">
        <img
          src={image}
          alt="pizza"
          className="max-h-auto max-h-24 block mx-auto"
        />
      </div>
      <h4 className="font-semibold my-2">{name}</h4>
      <p className="text-gray-500 text-sm  line-clamp-3">{description}</p>

      <button className="bg-primary text-white rounded-full  px-4 py-2 w-3/5">
        Add to cart ${basePrice}
      </button>
    </div>
  );
};
export default MenuItem;
