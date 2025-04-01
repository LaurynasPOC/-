import React, { useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import styled from "styled-components";

interface AddressDetails {
  street?: string;
  postalCode?: string;
  lat?: number;
  lng?: number;
}

interface AddressAutocompleteProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  onPlaceSelected: (isValid: boolean, placeDetails?: AddressDetails) => void;
  error?: string;
  setIsAddressValid?: (value: boolean) => void;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  label = "Address",
  value,
  onChange,
  onPlaceSelected,
  error,
  setIsAddressValid,
}) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();

    if (
      place &&
      place.formatted_address &&
      place.address_components &&
      place.geometry
    ) {
      const addressDetails = extractAddressDetails(place.address_components);

      const lat = place.geometry.location?.lat();
      const lng = place.geometry.location?.lng();

      addressDetails.lat = lat;
      addressDetails.lng = lng;

      const hasStreet = !!addressDetails.street;
      const hasPostalCode = !!addressDetails.postalCode;

      if (hasStreet && hasPostalCode && setIsAddressValid) {
        setIsAddressValid(true);
      }

      onChange(place.formatted_address);
      onPlaceSelected(hasStreet && hasPostalCode, addressDetails);
    } else {
      onPlaceSelected(false);
    }
  };

  const extractAddressDetails = (
    components: google.maps.GeocoderAddressComponent[]
  ): AddressDetails => {
    const details: AddressDetails = {};
    components.forEach((component) => {
      const types = component.types;
      if (types.includes("route")) {
        details.street = component.long_name;
      }
      if (types.includes("postal_code")) {
        details.postalCode = component.long_name;
      }
    });
    return details;
  };

  return (
    <AutocompleteStyles>
      <Label htmlFor="address">{label}</Label>
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={handlePlaceChanged}
        options={{
          componentRestrictions: { country: "lt" },
          fields: ["formatted_address", "geometry", "address_components"],
        }}
      >
        <Input
          id="address"
          error={error}
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            onPlaceSelected(false);
          }}
          placeholder="Įveskite adresą"
        />
      </Autocomplete>
      {error && <p style={{ color: "red", marginTop: "5px" }}>{error}</p>}
    </AutocompleteStyles>
  );
};

export default AddressAutocomplete;

interface Props {
  error?: string;
}

const Input = styled.input<Props>`
  padding: 15px;
  max-width: 400px;
  margin-bottom: 25px;
  background: var(--white);
  color: var(--black);
  border: ${({ error }) =>
    error ? "1px solid var(--error)" : "1px solid var(--primary)"};
  border-radius: 4px;
  width: 100%;
  font-size: 16px;
  transition: 0.6s;
  &:focus,
  &:hover {
    border-color: var(--tint3);
    outline: none;
  }
  &::placeholder {
    color: var(--secondary);
    font-size: 14px;
  }
`;

const Label = styled.label`
  position: absolute;
  left: 0;
`;

const AutocompleteStyles = styled.div`
  input {
    position: relative;
  }

  label {
    position: absolute;
    left: 0;
  }
`;
