const GoogleAuth = () => {
  const backendURL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const googleAuth = () => {
    window.open(`${backendURL}/auth/google`, "_self");
  };

  return <button onClick={googleAuth}>Sign in with Google</button>;
};

export default GoogleAuth;
