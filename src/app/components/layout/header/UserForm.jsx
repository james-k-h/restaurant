'use client';
import { useState } from 'react';
import EditableImage from '../EditableImage';
import { useProfile } from '@/app/hooks/GetProfile';
import AddressInputs from '../AddressInputs';

const UserForm = ({ user, onSave }) => {
  const [userName, setUserName] = useState(user?.name || '');
  const [image, setImage] = useState(user?.image || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
  const [postalCode, setPostalCode] = useState(user?.postalCode || '');
  const [city, setCity] = useState(user?.city || '');
  const [country, setCountry] = useState(user?.country || '');

  const [admin, setAdmin] = useState(user?.admin || false);

  const { data: loggedInUserData } = useProfile();

  function handleAddressChange(propName, value) {
    if (propName === 'phone') setPhone(value);
    if (propName === 'streetAddress') setStreetAddress(value);
    if (propName === 'postalCode') setPostalCode(value);
    if (propName === 'country') setCountry(value);
    if (propName === 'city') setCity(value);
  }
  return (
    <div className="flex gap-4  p-2 ">
      <div>
        <div className="bg-lightBlack rounded-lg p-2 relative max-w-[400px]">
          <EditableImage link={image} setLink={setImage} />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={(ev) =>
          onSave(ev, {
            name: userName,
            image,
            phone,
            streetAddress,
            city,
            country,
            postalCode,
            admin,
          })
        }
      >
        <label>Given and Surname</label>
        <input
          type="text"
          placeholder="First and last name"
          value={userName}
          onChange={(ev) => setUserName(ev.target.value)}
        />
        <label>Email</label>
        <input type="email" value={user.email} disabled={true}></input>
        <AddressInputs
          addressProps={{
            streetAddress,
            phone,
            postalCode,
            city,
            country,
          }}
          setAddressProp={handleAddressChange}
        />
        {loggedInUserData.admin && (
          <div>
            <label
              htmlFor="adminCb"
              className="p-2 gap-2 inline-flex items-center mb-2"
            >
              <input
                id="adminCb"
                type="checkbox"
                value={'1'}
                checked={admin}
                onClick={(ev) => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}

        <button type="submit">Save</button>
      </form>
    </div>
  );
};
export default UserForm;
