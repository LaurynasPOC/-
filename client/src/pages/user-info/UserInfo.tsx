import React, { useState, useEffect } from "react";
import { Container } from "../../components/wrappers";
import Input from "../../components/Input";
import styled from "styled-components";
import Button from "../../components/Buttons";
import AddressAutocomplete from "../../components/AddressAutocomplete";
import GoogleMapsProvider from "../../components/GoogleMapsProvider";
import { getUserProfile, updateUserProfile } from "../../services/userInfo";

interface AddressDetails {
  street?: string;
  postalCode?: string;
}

const UserInfo: React.FC = () => {
  const token = localStorage.getItem("token") ?? "";
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [addressError, setAddressError] = useState("");
  const [addressDetails, setAddressDetails] = useState<AddressDetails>({});

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;
      const result = await getUserProfile(token);
      console.log(result);
      if (result.success && result.user) {
        setUserName(result.user.username || "");
        setEmail(result.user.email || "");
        setPhone(result.user.phone || "");
        setAddress(result.user.address || "");
      } else {
        console.error(result.message || "Failed to load user data");
      }
    };

    fetchUserData();
  }, [token]);

  const submitUserInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !isAddressValid ||
      !addressDetails.street ||
      !addressDetails.postalCode
    ) {
      setAddressError("Adresas turi turėti gatvės pavadinimą ir pašto kodą.");
      return;
    }

    const userData = {
      username: userName,
      email,
      phone,
      address,
    };
    await updateUserProfile(token, userData);
  };

  return (
    <GoogleMapsProvider>
      <Container>
        <UserInfoWrapper onSubmit={submitUserInfo}>
          <h4>Mano Duomenys</h4>
          <Input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            label="Vartotojo vardas"
          />
          <Input
            disabled
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
