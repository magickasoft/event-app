import 'maplibre-gl/dist/maplibre-gl.css';

import Map, {Marker} from 'react-map-gl/maplibre';

type MapProps = {};

export const MapWeb = (props: MapProps) => {
  return (
    <Map
      initialViewState={{
        latitude: 37.8,
        longitude: -122.4,
        zoom: 14,
      }}
      style={{width: '100%', height: '100%'}}
      mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=btibCp40kPasT3lZMd3R">
      <Marker longitude={-122.4} latitude={37.8} color="red" />
    </Map>
  );
};
