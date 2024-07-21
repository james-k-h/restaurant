import Image from 'next/image';
import Trash from '../../icons/Trash';
import { cartProductPrice } from '../../AppContext';

const CartProduct = ({ product, onRemove, index }) => {
  return (
    <div className="text-light items-center flex gap-4 mb-2 border-b py-2 ">
      <div className="w-24">
        <Image src={product.image} alt={''} width={240} height={240} />
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

      <div className="text-lg font-semibold">${cartProductPrice(product)}</div>
      {!!onRemove && (
        <div className="ml-2">
          <button type="button" onClick={() => onRemove(index)} className="p-2">
            <Trash />
          </button>
        </div>
      )}
    </div>
  );
};
export default CartProduct;
