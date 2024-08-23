"use client";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

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
  return (
    <MapContainer
      center={[pos1, pos2]}
      zoom={13}
      className={`${!height ? "" : "!h-[60vh]"}`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[pos1, pos2]} icon={customIcon}>
        <Popup>{title}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
