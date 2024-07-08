'use client';
import { useState } from 'react';
import ChevronDown from '../../icons/ChevronDown';
import Plus from '../../icons/Plus';
import Trash from '../../icons/Trash';
import ChevronUp from '../../icons/ChevronUp';

const MenuItemPriceProps = ({ name, props, setProps, addLabel }) => {
  const [isOpen, setIsOpen] = useState(false);

  function addProp() {
    setProps((oldProps) => {
      return [...oldProps, { name: '', price: 0 }];
    });
  }

  function editProp(ev, index, prop) {
    const newValue = ev.target.value;
    setProps((prevSizes) => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeProp(indexToRemove) {
    setProps((prev) => prev.filter((v, index) => index !== indexToRemove));
  }

  return (
    <div className="p-2 rounded-md mb-2">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
        className="inline-flex p-1 bg-white justify-start"
      >
        {isOpen && <ChevronUp />}
        {!isOpen && <ChevronDown />}
        <span>{name}</span>
        <span>({props?.length})</span>
      </button>
      <div className={isOpen ? 'block' : 'hidden'}>
        {props?.length > 0 &&
          props.map((size, index) => (
            <div key={index} className="flex gap-2 items-end">
              <div>
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Size Name"
                  value={size.name}
                  onChange={(ev) => editProp(ev, index, 'name')}
                />
              </div>
              <div>
                <label>Extra Price</label>
                <input
                  type="text"
                  placeholder="Extra Price"
                  value={size.price}
                  onChange={(ev) => editProp(ev, index, 'price')}
                />
              </div>
              <div>
                <button
                  className="bg-white mb-2 px-2"
                  onClick={() => removeProp(index)}
                  type="button"
                >
                  <Trash />
                </button>
              </div>
            </div>
          ))}
        <button
          type="button"
          onClick={addProp}
          className="bg-white items-center"
        >
          <Plus className="w-4 h-4" />
          <span>{addLabel}</span>
        </button>
      </div>
    </div>
  );
};
export default MenuItemPriceProps;
