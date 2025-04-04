import styled from "styled-components";
import Button from "../Buttons";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { RootState } from "../../state/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../state/slices/authSlice";
import { LogOut, User } from "lucide-react";

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
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };
  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    const backendURL =
      import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
    window.open(`${backendURL}/api/auth/logout`, "_self");
    dispatch(logout());
  };

  return (
    <NavbarStyles>
      <Logo to="/">LOGO</Logo>
      {isAuthenticated ? (
        <div>
          <Button onClick={() => navigate("/give-away")}>
            Atiduodu/Parduodu
          </Button>
          <Button
            margin="0 10px"
            variant="secondary"
            onClick={() => navigate("/user-info")}
          >
            <User size={18} />
          </Button>
          <Button onClick={handleLogout} variant="secondary">
            <LogOut size={18} />
          </Button>
        </div>
      ) : (
        <div>
          <Button onClick={handleLogin} variant="primary" margin="0 10px 0 0">
            Prisijungti
          </Button>
          <Button onClick={handleRegister} variant="secondary">
            Registruotis
          </Button>
        </div>
      )}
    </NavbarStyles>
  );
};
