import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  displayName: string;
  photos: {
    value: string;
  }[];
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  // ✅ Correct way to access the environment variable in Vite
  const backendURL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    axios
      .get<User>(`${backendURL}/current_user`, {
        withCredentials: true,
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  const logout = () => {
    window.open(`${backendURL}/logout`, "_self");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <div>
          <h3>Welcome, {user.displayName}</h3>
          {user.photos && user.photos.length > 0 && (
            <img src={user.photos[0].value} alt="Profile" />
          )}
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};

export default Dashboard;
