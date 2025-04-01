import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navigation/Navbar";
import { GlobalStyle } from "./styles/globalStyles";
import Main from "./pages/Main";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import UserInfo from "./pages/user-info/UserInfo";
import GoogleAuth from "./pages/login/GoogleAuthLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import GiveAway from "./pages/give-away-goods/GiveAway";
import GoogleMapsProvider from "./components/GoogleMapsProvider";

const App = () => {
  return (
    <GoogleMapsProvider>
      <GlobalStyle />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/user-info" element={<UserInfo />} />
            <Route path="/give-away" element={<GiveAway />} />
          </Route>
          <Route path="/google-auth" element={<GoogleAuth />} />
        </Routes>
      </BrowserRouter>
    </GoogleMapsProvider>
  );
};

export default App;
