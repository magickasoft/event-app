import {buildServerURL} from './build-server-url';

export function getApiURL(): string {
  return buildServerURL(`${process.env.EXPO_PUBLIC_API_URL}/api/v1`);
}
