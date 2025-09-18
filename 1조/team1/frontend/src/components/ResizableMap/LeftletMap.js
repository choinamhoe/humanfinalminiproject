import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet"; // leaflet import 추가
import "leaflet/dist/leaflet.css";

const defaultIcon = new L.Icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  shadowSize: [41, 41],
});

const RecenterMap = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom()); // 현재 zoom 유지하면서 이동
  }, [center, map]);
  return null;
};

const LeftletMap = ({ viewData = [], ref = null }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    if (viewData.length) {
      const temp = viewData
        .map((item) => ({
          ...item,
          latitude: item.LAT,
          longitude: item.LON,
        }))
        .filter((loc) => loc.latitude != null && loc.longitude != null);
      setLocations(temp);
    }
  }, [viewData]);

  const DEFAULT_CENTER = [33.5006, 126.5312];
  const center =
    locations && locations.length > 0
      ? [
          locations.reduce((sum, loc) => sum + loc.latitude, 0) /
            locations.length,
          locations.reduce((sum, loc) => sum + loc.longitude, 0) /
            locations.length,
        ]
      : DEFAULT_CENTER;

  return (
    <>
      <MapContainer
        ref={ref}
        center={center}
        zoom={12}
        style={{ height: "100%", width: "100%", padding: "0px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <RecenterMap center={center} />
        {locations.map((loc, idx) => (
          <Marker
            key={idx}
            position={[loc.latitude, loc.longitude]}
            icon={defaultIcon}
          >
            <Popup>
              <div style={{ minWidth: "200px" }}>
                <h3
                  style={{
                    margin: "0 0 4px 0",
                    fontSize: "16px",
                    color: "#2c3e50",
                  }}
                >
                  {loc.Title}
                </h3>
                {loc.TEL && (
                  <p
                    style={{
                      margin: "0 0 4px 0",
                      fontSize: "14px",
                      color: "#34495e",
                    }}
                  >
                    📞 {loc.TEL}
                  </p>
                )}
                <p style={{ margin: 0, fontSize: "14px", color: "#7f8c8d" }}>
                  📍 {loc.Address}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default LeftletMap;
