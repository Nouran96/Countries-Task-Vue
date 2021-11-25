import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import store from "../store";

export const requestHandler = (req: AxiosRequestConfig): AxiosRequestConfig => {
  const { token } = store.state.auth;

  if (token && req.headers) {
    req.headers["Authorization"] = `Bearer ${token}`;
  }

  store.commit("setIsLoading", true);

  return req;
};

export const successHandler = (res: AxiosResponse): AxiosResponse => {
  store.commit("setIsLoading", false);

  return res;
};

export const errorHandler = (error: AxiosError): Promise<AxiosError> => {
  store.commit("setIsLoading", false);

  if (error.response?.status === 401) {
    store.commit("onLogout");
  }

  store.commit("openNotification", {
    message:
      error.response?.data.message || "Check your connection and Try again",
  });

  return Promise.reject({ ...error });
};
