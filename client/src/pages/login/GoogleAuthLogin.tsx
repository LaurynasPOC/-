import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../state/slices/authSlice";

const GoogleAuth = () => {
  const backendURL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const googleAuth = () => {
    window.open(`${backendURL}/api/auth/google`, "_self");
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const username = urlParams.get("username");

    if (token && username) {
      dispatch(login({ token, username }));
      navigate("/");
    }
  }, [dispatch, navigate]);

  return <button onClick={googleAuth}>Sign in with Google</button>;
};

export default GoogleAuth;
