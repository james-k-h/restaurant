'use client';
import { useState } from 'react';
import EditableImage from '../EditableImage';

const UserForm = ({ user, onSave }) => {
  const [userName, setUserName] = useState(user?.userName || '');
  const [image, setImage] = useState(user?.image || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
  const [postalCode, setPostalCode] = useState(user?.postalCode || '');
  const [city, setCity] = useState(user?.city || '');
  const [country, setCountry] = useState(user?.country || '');

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
          })
        }
      >
        <label>Given and Surname</label>
        <input
          type="text"
          placeholder="First and Last name"
          className="text-lightBlack"
          value={userName}
          onChange={(ev) => setUserName(ev.target.value)}
        ></input>
        <label>Email</label>
        <input type="email" value={user.email} disabled={true}></input>
        <label>Phone Number</label>
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(ev) => setPhone(ev.target.value)}
        />
        <label>Country</label>
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(ev) => setCountry(ev.target.value)}
        />
        <div className="flex gap-2">
          <div>
            <label>Postal Code</label>
            <input
              type="text"
              placeholder="Postal Code"
              value={postalCode}
              onChange={(ev) => setPostalCode(ev.target.value)}
            />
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(ev) => setCity(ev.target.value)}
            />
          </div>
        </div>
        <label>Street Address</label>
        <input
          type="text"
          placeholder="Street Address"
          value={streetAddress}
          onChange={(ev) => setStreetAddress(ev.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};
export default UserForm;
