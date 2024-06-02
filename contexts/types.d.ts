export interface AuthContextValue {
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}
