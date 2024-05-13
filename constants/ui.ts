import {Dimensions, Linking, PixelRatio, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

export const isDev = process.env.NODE_ENV === 'development';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isWeb = Platform.OS === 'web';
export const OS = Platform.OS;
export const OS_VERSION = Platform.Version;

export const isRetina = PixelRatio.get() >= 2;
export const deviceWidth = width;
export const deviceHeight = height;

export const openURL = (url: string) =>
  new Promise<any>(async (resolve, reject) => {
    const canOpenURL = await Linking.canOpenURL(url);
    if (canOpenURL) {
      try {
        await Linking.openURL(url);
        resolve('Opened URL');
      } catch (e) {
        reject(e);
        console.error(e);
      }
    } else {
      reject(new Error('Cannot Open URL'));
    }
  });
