import React, {useMemo} from 'react';
import {useStorageState} from '@/hooks/useStorageState';
import type {
  AuthContextValue,
  Oauth2TokenResponseData,
  Oauth2TokenRequestData,
  SignUpResponseData,
  SignUpRequestData,
  Error,
} from './types';
import {router} from 'expo-router';

import {Toast, ToastTitle, useToast} from '@gluestack-ui/themed';

import {AUTH_API} from '@/lib/axios/client';
import {AxiosError} from 'axios';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = React.createContext<AuthContextValue>({
  signUp: () => null,
  signIn: () => null,
  signOut: () => null,
  decodeToken: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
});

export function SessionProvider(props: Readonly<React.PropsWithChildren>) {
  const [[isATLoading, accessToken], setAccessToken] = useStorageState('access_token');
  const [[isRTLoading, refreshToken], setRefreshToken] = useStorageState('refresh_token');
  const [[isAILoading, actionId], setActionId] = useStorageState('action_id');

  const decodeToken = accessToken ? jwtDecode(accessToken) : null;
  const toast = useToast();

  const signUp = async (data: SignUpRequestData) => {
    try {
      const response = await AUTH_API.post<Readonly<SignUpRequestData>, Readonly<SignUpResponseData>>(
        '/authentication/sign-up',
        data,
      );
      setActionId(response.data.action_id);
      router.replace('/verify-otp');
    } catch (e: any) {
      toast.show({
        placement: 'bottom right',
        render: ({id}) => {
          return (
            <Toast nativeID={id} action="error">
              <ToastTitle>{e.response?.data?.detail?.msg || 'Error'}</ToastTitle>
            </Toast>
          );
        },
      });
    }
  };

  const signIn = async (data: Oauth2TokenRequestData) => {
    try {
      const response = await AUTH_API.post<Readonly<Oauth2TokenRequestData>, Readonly<Oauth2TokenResponseData>>(
        '/authentication/log-in',
        data,
      );
      setAccessToken(response.data.access_token);
      setRefreshToken(response.data.refresh_token);
    } catch (e) {
      if (e instanceof Error) {
        return Promise.reject(e.message);
      }
      const error = e as AxiosError<Error>;
      if (error instanceof AxiosError) {
        return Promise.reject(error.response?.data.detail);
      }
    }
  };

  const signOut = async () => {
    try {
      await AUTH_API.post('/authentication/log-out', {
        refresh_token: refreshToken,
      });
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
      const error = e as AxiosError<Error>;
      if (error instanceof AxiosError) {
        console.log(error.response?.data.detail);
      }
    }
    setAccessToken(null);
    setRefreshToken(null);
  };

  const contextValue = useMemo(
    () => ({
      signUp,
      signIn,
      signOut,
      decodeToken,
      actionId,
      accessToken,
      refreshToken,
      isLoading: isATLoading || isRTLoading || isAILoading,
    }),
    [isAILoading, isATLoading, isRTLoading, actionId, accessToken, refreshToken, decodeToken, signUp, signIn, signOut],
  );

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
}
