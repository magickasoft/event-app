import * as SecureStore from 'expo-secure-store';
import {isWeb} from '../constants/ui';

export function getAccessToken(): string | null {
  const key = 'access_token';
  let accessToken = null;
  if (isWeb) {
    try {
      if (typeof localStorage !== 'undefined') {
        accessToken = localStorage.getItem(key);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    SecureStore.getItemAsync(key).then((value) => {
      accessToken = value;
    });
  }
  return accessToken;
}
