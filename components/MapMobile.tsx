import MapLibreGL from '@maplibre/maplibre-react-native';

import {View, Text} from './Themed';

type MapProps = {};

export const MapMobile = (props: MapProps) => {
  return (
    <MapLibreGL.MapView
      style={{flex: 1, alignSelf: 'stretch'}}
      styleURL="https://api.maptiler.com/maps/streets-v2/style.json?key=btibCp40kPasT3lZMd3R"
      logoEnabled={false}
      compassEnabled={false}
      rotateEnabled={false}>
      <MapLibreGL.Camera zoomLevel={14} centerCoordinate={[37.8, -122.4]} />
      <MapLibreGL.MarkerView coordinate={[37.8, -122.4]}>
        <View>
          <Text>*</Text>
        </View>
      </MapLibreGL.MarkerView>
    </MapLibreGL.MapView>
  );
};
