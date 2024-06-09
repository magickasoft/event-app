import {buildServerURL} from './build-server-url';
import {isWeb} from '../constants/ui';

export function getAuthApiURL(): string {
  const url = isWeb ? 'http://localhost:3000/auth/' : (process.env.EXPO_AUTH_API_URL as string);
  return buildServerURL(url);
}

export function getS3ApiURL(): string {
  const url = isWeb ? 'http://localhost:3000/s3/' : (process.env.EXPO_S3_API_URL as string);
  return buildServerURL(url);
}
