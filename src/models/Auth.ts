export interface AuthData {
  email: string;
  password: string;
}

export interface AuthState {
  token: string | null;
}
