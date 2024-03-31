import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Input from "../../components/Input";
import Button from "../../components/Buttons";
import Notification from "../../components/Notification";
import { SectionWrapper, Container } from "../../components/wrappers";
import {
  setField,
  setErrors,
  resetForm,
  selectFormData,
  selectFormErrors,
} from "../../state/slices/registerSlice";
import registerService from "../../services/register";

interface FormData {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const errors = useSelector(selectFormErrors);

  const handleInputChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setField({ field, value: e.target.value }));
    };

  const validateForm = (): boolean => {
    const newErrors: Record<keyof FormData, string | undefined> = {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    };
    let formIsValid = true;

    if (!formData.username) {
      newErrors.username = "Vartotojo vardas yra privalomas.";
      formIsValid = false;
    }
    if (!formData.email) {
      newErrors.email = "El. pašto adresas yra privalomas.";
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Neteisingas el. pašto formatas.";
      formIsValid = false;
    }
    if (!formData.password) {
      newErrors.password = "Slaptažodis yra privalomas.";
      formIsValid = false;
    }
    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = "Slaptažodžiai nesutampa.";
      formIsValid = false;
    }

    dispatch(setErrors(newErrors));
    return formIsValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const result = await registerService({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          password2: formData.repeatPassword,
        });
        console.log(result);
        dispatch(resetForm());
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <SectionWrapper>
      <Notification type="success" />
      <Container>
        <RegisterFormWrapper as="form" onSubmit={handleSubmit}>
          <h4>Registracijos duomenys</h4>
          <Input
            value={formData.username}
            onChange={handleInputChange("username")}
            type="text"
            label="Vartotojo vardas"
            errormessage={errors.username}
          />
          <Input
            value={formData.email}
            onChange={handleInputChange("email")}
            type="email"
            label="El. paštas"
            errormessage={errors.email}
          />
          <Input
            value={formData.password}
            onChange={handleInputChange("password")}
            label="Slaptažodis"
            type="password"
            errormessage={errors.password}
          />
          <Input
            value={formData.repeatPassword}
            onChange={handleInputChange("repeatPassword")}
            label="Pakartokite slaptažodį"
            type="password"
            errormessage={errors.repeatPassword}
          />
          <Button variant="primary" type="submit">
            Registruotis
          </Button>
        </RegisterFormWrapper>
      </Container>
    </SectionWrapper>
  );
};

export default Register;

const RegisterFormWrapper = styled(SectionWrapper)`
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h4 {
    color: var(--primary);
    margin-bottom: 20px;
  }
`;
