import { axiosInstance } from "@/network";
import { createStore } from "vuex";

export const getCookie = (c_name: string): string | null => {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      let c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) {
        c_end = document.cookie.length;
      }
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }

  return null;
};

export default createStore({
  state: {
    auth: {
      token: getCookie("token"),
    },
  },
  mutations: {
    addLoginData(state, payload) {
      const authCookie = `token=${payload.token};`;
      document.cookie = authCookie;

      state.auth.token = payload.token;
    },

    onLogout(state) {
      state.auth.token = null;
    },
  },
  actions: {
    async onLogin(context, payload) {
      const response = await axiosInstance.post("cognito-login", payload);
      if (response.data?.data?.token) {
        context.commit("addLoginData", { token: response.data.data.token });
      }
    },

    async onRegister(context, payload) {
      await axiosInstance.post("cognito-register", payload);

      context.dispatch("onLogin", payload);
    },
  },
  modules: {},
});
