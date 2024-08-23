"use client";
import { useCustomeContext } from "@/hooks/useCustomeContext";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  //   iconUrl: require("./icons/placeholder.png"),
  iconSize: [32, 32], // size of the icon
});

interface MapProps {
  pos1: number;
  pos2: number;
  title: string;
  height?: number;
}

const Map = ({ pos1, pos2, title, height }: MapProps) => {
  const [lat, setlat] = useState(pos1);
  const [lang, setlang] = useState(pos2);
  const satate = useCustomeContext();
  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng;
    setlat(lat);
    setlang(lng);
    satate.setlang(lang);
    satate.setlat(lat);
    console.log(satate, "this");
  };
  return (
    <MapContainer
      center={[lat, lang]}
      zoom={13}
      className={`${!height ? "" : "!h-[60vh]"} max-md:w-full `}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapEventsHandler handleMapClick={handleMapClick} />

      <Marker position={[lat, lang]} icon={customIcon}>
        <Popup>{title}</Popup>
      </Marker>
    </MapContainer>
  );
};

const MapEventsHandler = ({ handleMapClick }: any) => {
  useMapEvents({
    click: (e) => handleMapClick(e),
  });
  return null;
};

export default Map;
