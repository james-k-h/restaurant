import FlyingButton from 'react-flying-item';

const AddToCartButton = ({ hasSizesOrExtras, addClick, basePrice, image }) => {
  if (!hasSizesOrExtras) {
    return (
      <div className="flying-button-parent mt-4">
        <FlyingButton src={image} targetTop={'5%'} targetLeft={'95%'}>
          <div onClick={addClick}> Add to cart ${basePrice}</div>
        </FlyingButton>
      </div>
    );
  }
  return (
    <button
      type="button"
      className="bg-primary text-light rounded-full  px-4 py-2 w-3/5"
      onClick={addClick}
    >
      {hasSizesOrExtras ? (
        <span>Add to cart (from ${basePrice}) </span>
      ) : (
        <FlyingButton />
      )}
    </button>
  );
};
export default AddToCartButton;
