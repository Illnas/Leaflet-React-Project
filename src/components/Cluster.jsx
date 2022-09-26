import React, { useCallback, useEffect, useState } from "react";
import useSupercluster from "use-supercluster";
import {
  Marker,
  useMap,
  Popup
} from "react-leaflet";
import { Icon } from "leaflet";
import location from '../icons/location.svg'
import { v4 as uuidv4 } from "uuid";
import L from "leaflet";

//Getting Icons objects
export const icon = new Icon({
  iconUrl: location,
  iconSize: [25, 25],
});

const icons = {};
const fetchIcon = (count, size) => {
  if (!icons[count]) {
    icons[count] = L.divIcon({
      html: `<div class="cluster-marker" style="width: ${size}px; height: ${size}px;">
        ${count}
      </div>`,
    });
  }
  return icons[count];
};


//React Component
const Cluster = ({ dataCollection }) => {
  const maxZoom = 22;
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(12);
  const map = useMap();
  
  // get map bounds
  function updateMap() {
    const b = map.getBounds();
    setBounds([
      b.getSouthWest().lng,
      b.getSouthWest().lat,
      b.getNorthEast().lng,
      b.getNorthEast().lat,
    ]);
    setZoom(map.getZoom());
  }

  const onMove = useCallback(() => {
    updateMap();
  }, [map]);

  React.useEffect(() => {
    updateMap();
  }, [map]);

  useEffect(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);


  const points = dataCollection.features.map((crime) => ({
    type: "Feature",
    properties: { cluster: false },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(crime.geometry.coordinates[0]),
        parseFloat(crime.geometry.coordinates[1]),
      ],
      properties: crime.properties,
    },
  }));

  const { clusters, supercluster } = useSupercluster({
    points: points,
    bounds: bounds,
    zoom: zoom,
    options: { radius: 75, maxZoom: 12 },
  });

  return (
    <>
      {clusters.map((cluster) => {
        // every cluster point has coordinates
        const [longitude, latitude] = cluster.geometry.coordinates;
        // the point may be either a cluster or a single point
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties;
        // we have a cluster to render
        if (isCluster) {
          return (
            <Marker
              key={uuidv4()}
              position={[latitude, longitude]}
              icon={fetchIcon(
                pointCount,
                10 + (pointCount / points.length) * 40
              )}
              onClick={() => {             
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    maxZoom
                  );
                  map.setView([latitude, longitude], expansionZoom, {
                    animate: true,
                  });
              }}
            />
          );
        }

        // we have a single pointto render
        return (
            <Marker key={uuidv4()} position={[latitude, longitude]} icon={icon}>
              <Popup>
                Ime: {cluster.geometry.properties.naziv_objekta} <br />
                PS broj: {cluster.geometry.properties.ps_br} <br />
                E broj: {cluster.geometry.properties.e_br} <br />
                Tip: {cluster.geometry.properties.tip_objekta} <br />
                Lučka kapetanija: {cluster.geometry.properties.lucka_kapetanija}
              </Popup>
            </Marker>
        );
      })}
    </>
  );
};

export default Cluster;
