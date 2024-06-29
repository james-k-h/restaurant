const MenuItem = () => {
  return (
    <div className="flex flex-col bg-almond p-4 rounded-lg text-center  group transition-all hover:shadow-md hover:shadow-black/75 hover:bg-white items-center ">
      <div className="text-center  ">
        <img
          src="/pizza_1.jpg"
          alt="pizza"
          className="max-h-auto max-h-24 block mx-auto"
        />
      </div>
      <h4 className="font-semibold my-2">Pepperoni Pizza</h4>
      <p className="text-gray-500 text-sm">Placeholder</p>

      <button className="bg-primary text-white rounded-full  px-4 py-2 w-3/5">
        Add to cart $12.00
      </button>
    </div>
  );
};
export default MenuItem;
