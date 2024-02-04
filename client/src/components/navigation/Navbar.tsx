import styled from "styled-components";
import Button from "../Buttons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const NavbarStyles = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--silver);
  padding: 10px 20px;
  border-bottom: 1px solid var(--primary);
`;

const Logo = styled(Link)`
  cursor: pointer;
  &:active {
    transform: scale(0.98);
  }
`;

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <NavbarStyles>
      <Logo to="/">LOGO</Logo>
      <div>
        <Button onClick={handleLogin} variant="primary" margin="0 10px 0 0">
          Prisijungti
        </Button>
        <Button onClick={handleRegister} variant="secondary">
          Registruotis
        </Button>
      </div>
    </NavbarStyles>
  );
};
