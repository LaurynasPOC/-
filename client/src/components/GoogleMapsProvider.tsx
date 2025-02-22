// src/components/GoogleMapsProvider.tsx
import React from "react";
import { LoadScript } from "@react-google-maps/api";

const libraries: "places"[] = ["places"];

interface Props {
  children: React.ReactNode;
}

const GoogleMapsProvider: React.FC<Props> = ({ children }) => {
  console.log(import.meta.env);
  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string}
      libraries={libraries}
    >
      {children}
    </LoadScript>
  );
};

export default GoogleMapsProvider;
