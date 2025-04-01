import { useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const userLocation = {
  lat: 54.6872,
  lng: 25.2797,
};

const productPins = [
  {
    id: 1,
    title: "Laptop",
    price: "300€",
    lat: 54.6875,
    lng: 25.2799,
  },
  {
    id: 2,
    title: "Kėdė",
    price: "Atiduodama",
    lat: 54.689,
    lng: 25.2815,
  },
  {
    id: 3,
    title: "Dviračio šalmas",
    price: "15€",
    lat: 54.686,
    lng: 25.2812,
  },
  {
    id: 4,
    title: "Šaldytuvas",
    price: "100€",
    lat: 54.688,
    lng: 25.277,
  },
  {
    id: 5,
    title: "Vaikiška lovytė",
    price: "Atiduodama",
    lat: 54.685,
    lng: 25.276,
  },
  {
    id: 6,
    title: "Išmanus laikrodis",
    price: "75€",
    lat: 54.6845,
    lng: 25.2805,
  },
];

const AvailableGoods = () => {
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={userLocation}
      zoom={14}
    >
      <Marker
        position={userLocation}
        icon={{
          url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        }}
      />

      {productPins.map((product) => (
        <Marker
          key={product.id}
          position={{ lat: product.lat, lng: product.lng }}
          onMouseOver={() => setHoveredPin(product.id)}
          onMouseOut={() => setHoveredPin(null)}
        >
          {hoveredPin === product.id && (
            <InfoWindow position={{ lat: product.lat, lng: product.lng }}>
              <div>
                <strong>{product.title}</strong>
                <br />
                {product.price}
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  );
};

export default AvailableGoods;
