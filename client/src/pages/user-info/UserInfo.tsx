import React, { useState } from "react";
import { Container } from "../../components/wrappers";
import Input from "../../components/Input";
import styled from "styled-components";
import Button from "../../components/Buttons";
import AddressAutocomplete from "../../components/AddressAutocomplete";
import GoogleMapsProvider from "../../components/GoogleMapsProvider";

interface AddressDetails {
  street?: string;
  postalCode?: string;
}

const UserInfo: React.FC = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [addressError, setAddressError] = useState("");
  const [addressDetails, setAddressDetails] = useState<AddressDetails>({});

  const submitUserInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate street and postal code
    if (
      !isAddressValid ||
      !addressDetails.street ||
      !addressDetails.postalCode
    ) {
      setAddressError("Adresas turi turėti gatvės pavadinimą ir pašto kodą.");
      return;
    }

    console.log(name, surname, email, phone, address, addressDetails);
    alert("Forma sėkmingai pateikta su tinkamu adresu!");
  };

  return (
    <GoogleMapsProvider>
      <Container>
        <UserInfoWrapper onSubmit={submitUserInfo}>
          <h4>Mano Duomenys</h4>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            label="Vardas"
          />
          <Input
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            type="text"
            label="Pavardė"
          />
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            label="El. paštas"
          />
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            label="Telefono numeris"
          />
          <AddressAutocomplete
            value={address}
            onChange={(value) => {
              setAddress(value);
              setAddressError("");
            }}
            onPlaceSelected={(isValid, details) => {
              setIsAddressValid(isValid);
              setAddressDetails(details ?? {});
              if (!isValid)
                setAddressError(
                  "Adresas turi turėti gatvės pavadinimą ir pašto kodą."
                );
              else setAddressError("");
            }}
            error={addressError}
          />
          <Button type="submit" variant="primary">
            Išsaugoti
          </Button>
        </UserInfoWrapper>
      </Container>
    </GoogleMapsProvider>
  );
};

export default UserInfo;

const UserInfoWrapper = styled.form`
  margin: 0 auto;
  text-align: center;
`;
