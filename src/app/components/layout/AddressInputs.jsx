const AddressInputs = ({ addressProps, setAddressProp }) => {
  const { phone, streetAddress, postalCode, city, country } = addressProps;
  return (
    <>
      <label>Phone Number</label>
      <input
        type="tel"
        placeholder="Phone Number"
        value={phone}
        onChange={(ev) => setAddressProp('phone', ev.target.value)}
      />
      <label>Country</label>
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(ev) => setAddressProp('country', ev.target.value)}
      />
      <div className="flex gap-2 grid grid-cols-2">
        <div>
          <label>Postal Code</label>
          <input
            type="text"
            placeholder="Postal Code"
            value={postalCode}
            onChange={(ev) => setAddressProp('postalCode', ev.target.value)}
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(ev) => setAddressProp('city', ev.target.value)}
          />
        </div>
      </div>
      <label>Street Address</label>
      <input
        type="text"
        placeholder="Street Address"
        value={streetAddress}
        onChange={(ev) => setAddressProp('streetAddress', ev.target.value)}
      />
    </>
  );
};
export default AddressInputs;
