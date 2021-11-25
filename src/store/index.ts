import { axiosInstance } from "@/network";
import router from "@/router";
import { createStore, createLogger } from "vuex";

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
    countries: [],
    selectedCountry: {},
    shared: {
      isLoading: false,
      notification: {
        show: false,
        message: null,
        color: null,
      },
    },
  },
  mutations: {
    addLoginData(state, payload) {
      const authCookie = `token=${payload.token};`;
      document.cookie = authCookie;

      state.auth.token = payload.token;

      // Check if there is a redirect url
      const redirectQueryParam = router.currentRoute.value.query
        ?.redirect as string;

      router.push({
        path: redirectQueryParam ? redirectQueryParam : "/",
      });
    },

    onLogout(state) {
      document.cookie = "token=;";

      state.auth.token = null;
      state.countries = [];
      state.selectedCountry = {};

      router.push({
        name: "login",
        query: { redirect: router.currentRoute.value.fullPath },
      });
    },

    addCountries(state, payload) {
      state.countries = payload;
    },

    addSelectedCountry(state, payload) {
      state.selectedCountry = payload;
    },

    setIsLoading(state, isLoading) {
      state.shared.isLoading = isLoading;
    },

    openNotification(state, payload) {
      state.shared.notification = {
        show: true,
        message: payload.message,
        color: payload.color || "negative",
      };
    },

    dismissNotification(state) {
      state.shared.notification = { show: false, message: null, color: null };
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

    async getAllCountries(context) {
      const response = await axiosInstance.get("country");

      context.commit("addCountries", response.data.data);
    },

    async getCountry(context, payload) {
      const response = await axiosInstance.get(`country/${payload.name || ""}`);

      context.commit("addSelectedCountry", response.data.data);
    },
  },
  modules: {},
  plugins: [createLogger()],
});
