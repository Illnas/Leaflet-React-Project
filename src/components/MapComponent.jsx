import React from "react";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  FeatureGroup,
  GeoJSON,
} from "react-leaflet";
import Cluster from "./Cluster";
import countiesData from "../data/counties.json";

const MapComponent = ({ dataCollection }) => {
  const [bounds, setBounds] = React.useState([
    [40.47999136, 12.6569755388],
    [46.5037509222, 20.3904757016],
  ]);

  return (
    <div className="map-container">
      <MapContainer
        center={[44.4737849, 16.4688717]}
        minZoom={7}
        maxZoom={12}
        zoom={8}
        scrollWheelZoom={false}
        className="map"
        /* dragging={false} */
        maxBounds={bounds}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LayersControl position="topleft">
          <LayersControl.Overlay name="Markers" checked>
            <FeatureGroup checked>
              {dataCollection && <Cluster dataCollection={dataCollection} />}
            </FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Counties" checked>
            <FeatureGroup checked>
              <>
                <GeoJSON data={countiesData.features} />
              </>
            </FeatureGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </div>
  );
};

export default MapComponent;
