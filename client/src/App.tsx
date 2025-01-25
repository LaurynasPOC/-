import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navigation/Navbar";
import { GlobalStyle } from "./styles/globalStyles";
import Main from "./pages/Main";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashboard from "./components/Dashboard";
import GoogleAuth from "./pages/login/GoogleAuthLogin";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/google-auth" element={<GoogleAuth />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
