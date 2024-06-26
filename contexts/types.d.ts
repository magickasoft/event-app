export interface Oauth2TokenResponseData {
  data: {
    access_token: string;
    refresh_token: string;
  };
}

export interface Oauth2TokenRequestData {
  login: string;
  password: string;
}
export interface Error {
  detail: string;
  code: number;
}
export interface AuthContextValue {
  signIn: (data: Oauth2TokenRequestData) => void;
  signOut: () => void;
  decodeToken?: JwtPayload | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  isLoading: boolean;
}
