import {buildServerURL} from './build-server-url';
// import {isWeb} from '../constants/ui';

export function getServerURL(): string {
  // const url = isWeb ? '/api' : (process.env.EXPO_SERVER_URL as string);
  const url = process.env.EXPO_SERVER_URL as string;
  return buildServerURL(url);
}
