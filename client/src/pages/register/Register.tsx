import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterFormWrapper } from "./styled";
import Input from "../../components/Input";
import Button from "../../components/Buttons";
import { useAlert } from "../../components/hooks/useAlert";
import {
  setField,
  setErrors,
  resetForm,
  selectFormData,
  selectFormErrors,
} from "../../state/slices/registerSlice";
import registerService from "../../services/register";
import { FormData } from "../../state/slices/registerSlice";
import { AxiosError } from "axios";

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
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
        if (result) {
          dispatch(resetForm());
          alert("success", "Registracija sėkminga!");
        }
      } catch (error) {
        const axiosError = error as AxiosError;
        if (axiosError.response) {
          console.error("Error data:", axiosError.response.data);
          console.error("Status code:", axiosError.response.status);
          if (axiosError.response.status === 409) {
            alert("error", "El. paštas jau yra registruotas");
          } else {
            alert("error", "An unexpected error occurred");
          }
        }
      }
    }
  };

  return (
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
  );
};

export default Register;
