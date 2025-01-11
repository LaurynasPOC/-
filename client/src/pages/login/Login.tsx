import { useState } from "react";
import styled from "styled-components";
import Input from "../../components/Input";
import Button from "../../components/Buttons";
import { SectionWrapper, Container } from "../../components/wrappers";
import loginService from "../../services/login";
import { useAlert } from "../../components/hooks/useAlertNotifier";
import GoogleAuth from "./GoogleAuthLogin";

interface FormErrors {
  email?: string;
  password?: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const alert = useAlert();
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: "" });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: "" });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let formIsValid: boolean = true;

    if (!email) {
      newErrors.email = "El. pašto adresas yra privalomas.";
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Neteisingas el. pašto formatas.";
      formIsValid = false;
    }

    if (!password) {
      newErrors.password = "Slaptažodis yra privalomas.";
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(validateForm());
    if (validateForm()) {
      try {
        const result = await loginService({ email, password }, alert);
        console.log(result);
        if (result) {
          setEmail("");
          setPassword("");
          alert("success", "Prisijungimas sekmingas!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <SectionWrapper>
      <Container>
        <LoginFormWrapper as="form" onSubmit={handleLogin}>
          <h4>Prisijungimo duomenys</h4>
          <Input
            value={email}
            onChange={handleEmailChange}
            type="text"
            label="El. paštas"
            errormessage={errors.email}
          />
          <Input
            value={password}
            onChange={handlePasswordChange}
            label="Slaptažodis"
            type="password"
            errormessage={errors.password}
          />
          <Button variant="primary" type="submit">
            Prisijungti
          </Button>
        </LoginFormWrapper>
        <GoogleAuth />
      </Container>
    </SectionWrapper>
  );
};
export default Login;

const LoginFormWrapper = styled(SectionWrapper)`
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
