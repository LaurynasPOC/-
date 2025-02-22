import React, { useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";

interface AddressDetails {
  street?: string;
  postalCode?: string;
}

interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  onPlaceSelected: (isValid: boolean, placeDetails?: AddressDetails) => void;
  error?: string;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  value,
  onChange,
  onPlaceSelected,
  error,
}) => {
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place && place.formatted_address && place.address_components) {
      const addressDetails = extractAddressDetails(place.address_components);
      const hasStreet = !!addressDetails.street;
      const hasPostalCode = !!addressDetails.postalCode;

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
    <div style={{ width: "100%" }}>
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={handlePlaceChanged}
        options={{
          componentRestrictions: { country: "lt" },
          fields: ["formatted_address", "geometry", "address_components"],
        }}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            onPlaceSelected(false);
          }}
          placeholder="Įveskite adresą (gatvė ir pašto kodas privalomi)"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: error ? "1px solid red" : "1px solid #ddd",
            borderRadius: "8px",
          }}
        />
      </Autocomplete>
      {error && <p style={{ color: "red", marginTop: "5px" }}>{error}</p>}
    </div>
  );
};

export default AddressAutocomplete;
