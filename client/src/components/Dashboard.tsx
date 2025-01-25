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

  const backendURL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    let isMounted = true;
    axios
      .get<User>(`${backendURL}/api/auth/current_user`, {
        withCredentials: true,
      })
      .then((res) => {
        if (isMounted) setUser(res.data);
      })
      .catch((err) => console.error("Error fetching user:", err));
    return () => {
      isMounted = false;
    };
  }, []);

  const logout = () => {
    window.open(`${backendURL}/api/auth/logout`, "_self");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {user ? (
        <div>
          <h3>Welcome, {user.displayName}</h3>
          {user.photos && user.photos.length > 0 ? (
            <img
              src={user.photos[0].value}
              alt="Profile"
              loading="lazy"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          ) : (
            <p>No profile picture available</p>
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
