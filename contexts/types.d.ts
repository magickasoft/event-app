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

export interface SignUpResponseData {
  data: {
    action_id: string;
  };
}
export interface SignUpRequestData {
  first_name: string;
  second_name: string;
  patronymic: string;
  phone: string;
  password: string;
}

export interface CodeVerificationRequestData {
  verification_code: string;
}

export interface CodeVerificationResponseData {
  data: any;
}

export interface Error {
  detail: string;
  code: number;
}
export interface AuthContextValue {
  codeVerification: (data: CodeVerificationRequestData) => void;
  signUp: (data: SignUpRequestData) => void;
  signIn: (data: Oauth2TokenRequestData) => void;
  signOut: () => void;
  decodeToken?: JwtPayload | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  isLoading: boolean;
}
