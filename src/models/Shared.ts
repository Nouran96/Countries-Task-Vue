export interface SharedState {
  isLoading: boolean;
  notification: NotificationState;
}

export interface NotificationState {
  show?: boolean;
  message: string | null;
  color?: string | null;
}
