import { useState } from "react";
import styled from "styled-components";
import Input from "../../components/Input";
import Button from "../../components/Buttons";
import { SectionWrapper, Container } from "../../components/wrappers";

interface FormData {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  repeatPassword?: string;
}
const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange =
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: e.target.value });

      setErrors({ ...errors, [field]: "" });
    };
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let formIsValid: boolean = true;

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

    setErrors(newErrors);
    return formIsValid;
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form data:", formData);
    }
  };
  return (
    <SectionWrapper>
      <Container>
        <RegisterFormWrapper as="form" onSubmit={handleSubmit}>
          <h4>Registracijos duomenys</h4>
          <Input
            value={formData.username}
            onChange={handleInputChange("username")}
            type="text"
            label="Vartotojo vardas"
            errorMessage={errors.username}
          />
          <Input
            value={formData.email}
            onChange={handleInputChange("email")}
            type="email"
            label="El. paštas"
            errorMessage={errors.email}
          />
          <Input
            value={formData.password}
            onChange={handleInputChange("password")}
            label="Slaptažodis"
            type="password"
            errorMessage={errors.password}
          />
          <Input
            value={formData.repeatPassword}
            onChange={handleInputChange("repeatPassword")}
            label="Pakartokite slaptažodį"
            type="password"
            errorMessage={errors.repeatPassword}
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
