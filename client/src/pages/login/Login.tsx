import { useState } from "react";
import styled from "styled-components";
import Input from "../../components/Input";
import Button from "../../components/Buttons";
import { SectionWrapper, Container } from "../../components/wrappers";

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
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
  };
  return (
    <SectionWrapper>
      <Container>
        <LoginFormWrapper as="form" onSubmit={handleLogin}>
          <h4>Prisijungimo duomenys</h4>
          <Input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            type="text"
            label="El. paštas"
            required
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Slaptažodis"
            required
            type="password"
          />
          <Button variant="primary" type="submit">
            Prisijungti
          </Button>
        </LoginFormWrapper>
      </Container>
    </SectionWrapper>
  );
};
export default Login;
