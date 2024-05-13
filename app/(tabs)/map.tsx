import {StyleSheet} from 'react-native';

import {Text} from '@/components/Themed';
import {MapWeb} from '@/components/MapWeb';
// import {MapMobile} from '@/components/MapMobile';

import {isWeb} from '@/constants/ui';

export default function MapScreen() {
  return isWeb ? <MapWeb /> : <Text style={styles.title}>mobile MapScreen</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
