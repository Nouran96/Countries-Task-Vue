import { axiosInstance } from "@/network";
import router from "@/router";
import { createStore, createLogger } from "vuex";
import { Cookies } from "quasar";

export default createStore({
  state: {
    auth: {
      token: Cookies.get("token") || null,
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
      Cookies.set("token", payload.token);

      state.auth.token = payload.token;

      // Check if there is a redirect url
      const redirectQueryParam = router.currentRoute.value.query
        ?.redirect as string;

      router.push({
        path: redirectQueryParam ? redirectQueryParam : "/",
      });
    },

    onLogout(state) {
      Cookies.remove("token");

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

    async editCountry(context, payload) {
      const { name, ...data } = payload;
      await axiosInstance.put(`country/${name || ""}`, data);

      router.push({ name: "details", params: { name } });
    },
  },
  modules: {},
  plugins: [createLogger()],
});
