import React, {useMemo} from 'react';
import {useStorageState} from '@/hooks/useStorageState';
import type {
  AuthContextValue,
  Oauth2TokenResponseData,
  Oauth2TokenRequestData,
  SignUpResponseData,
  SignUpRequestData,
  CodeVerificationRequestData,
  CodeVerificationResponseData,
  Error,
} from './types';
import {router} from 'expo-router';

import {Toast, ToastTitle, useToast} from '@gluestack-ui/themed';

import {BASE_API} from '@/lib/axios/client';
import {jwtDecode} from 'jwt-decode';

export const AuthContext = React.createContext<AuthContextValue>({
  codeVerification: () => null,
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

  const codeVerification = async (data: CodeVerificationRequestData) => {
    if (actionId) {
      try {
        await BASE_API.post<Readonly<CodeVerificationRequestData>, Readonly<CodeVerificationResponseData>>(
          `/authentication/verify-action/${actionId}`,
          data,
        );
        router.replace('/login');
        setActionId(null);
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
    }
  };

  const signUp = async (data: SignUpRequestData) => {
    try {
      const response = await BASE_API.post<Readonly<SignUpRequestData>, Readonly<SignUpResponseData>>(
        '/authentication/sign-up',
        data,
      );
      setActionId(response.data.action_id);
      router.replace('/verify-code');
    } catch (e: any) {
      setActionId(null);
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
      const response = await BASE_API.post<Readonly<Oauth2TokenRequestData>, Readonly<Oauth2TokenResponseData>>(
        '/authentication/log-in',
        data,
      );
      setAccessToken(response.data.access_token);
      setRefreshToken(response.data.refresh_token);
      router.replace('(tabs)/map');
    } catch (e) {
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

  const signOut = async () => {
    try {
      await BASE_API.post('/authentication/log-out', {
        refresh_token: refreshToken,
      });
    } catch (e) {
      console.log(e.response?.data?.detail?.msg);
    }
    setAccessToken(null);
    setRefreshToken(null);
  };

  const contextValue = useMemo(
    () => ({
      codeVerification,
      signUp,
      signIn,
      signOut,
      decodeToken,
      actionId,
      accessToken,
      refreshToken,
      isLoading: isATLoading || isRTLoading || isAILoading,
    }),
    [
      isAILoading,
      isATLoading,
      isRTLoading,
      actionId,
      accessToken,
      refreshToken,
      decodeToken,
      codeVerification,
      signUp,
      signIn,
      signOut,
    ],
  );

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
}
