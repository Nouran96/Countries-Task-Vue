import { axiosInstance } from "@/network";
import router from "@/router";
import { createStore, createLogger, ActionContext } from "vuex";
import { Cookies } from "quasar";
import { AuthState } from "@/models/Auth";
import { CountriesState, Country } from "@/models/Countries";
import { NotificationState, SharedState } from "@/models/Shared";

interface RootState {
  auth: AuthState;
  countries: CountriesState;
  shared: SharedState;
}

const authModule = {
  state: {
    token: Cookies.get("token") || null,
  },
  mutations: {
    addLoginData(state: AuthState, payload: { token: string }) {
      Cookies.set("token", payload.token);

      state.token = payload.token;

      // Check if there is a redirect url
      const redirectQueryParam = router.currentRoute.value.query
        ?.redirect as string;

      router.push({
        path: redirectQueryParam ? redirectQueryParam : "/",
      });
    },
  },
  actions: {
    async onLogin(
      context: ActionContext<AuthState, RootState>,
      payload: { email: string; password: string }
    ) {
      const response = await axiosInstance.post("cognito-login", payload);
      if (response.data?.data?.token) {
        context.commit("addLoginData", { token: response.data.data.token });
      }
    },

    async onRegister(
      context: ActionContext<AuthState, RootState>,
      payload: { email: string; password: string }
    ) {
      await axiosInstance.post("cognito-register", payload);

      context.dispatch("onLogin", payload);
    },
  },
};

const countriesModule = {
  state: {
    countries: [],
    selectedCountry: {},
  },
  mutations: {
    addCountries(state: CountriesState, payload: Array<Country>) {
      state.countries = payload;
    },

    addSelectedCountry(state: CountriesState, payload: Country) {
      state.selectedCountry = payload;
    },
  },
  actions: {
    async getAllCountries(context: ActionContext<CountriesState, RootState>) {
      const response = await axiosInstance.get("country");

      context.commit("addCountries", response.data.data);
    },

    async getCountry(
      context: ActionContext<CountriesState, RootState>,
      payload: { name: string }
    ) {
      const response = await axiosInstance.get(`country/${payload.name || ""}`);

      context.commit("addSelectedCountry", response.data.data);
    },

    async editCountry(
      context: ActionContext<CountriesState, RootState>,
      payload: Country
    ) {
      const { name, ...data } = payload;
      await axiosInstance.put(`country/${name || ""}`, data);

      router.push({ name: "details", params: { name } });
    },

    async addCountry(
      context: ActionContext<CountriesState, RootState>,
      payload: Country
    ) {
      await axiosInstance.post(`country`, payload);

      router.push({ name: "details", params: { name: payload.name } });
    },
  },
};

const sharedModule = {
  state: {
    isLoading: false,
    notification: {
      show: false,
      message: null,
      color: null,
    },
  },
  mutations: {
    setIsLoading(state: SharedState, isLoading: boolean) {
      state.isLoading = isLoading;
    },

    openNotification(state: SharedState, payload: NotificationState) {
      state.notification = {
        show: true,
        message: payload.message,
        color: payload.color || "negative",
      };
    },

    dismissNotification(state: SharedState) {
      state.notification = { show: false, message: null, color: null };
    },
  },
};

export default createStore({
  modules: {
    auth: authModule,
    countries: countriesModule,
    shared: sharedModule,
  },
  // Global mutation because it accesses root State
  mutations: {
    onLogout(state: RootState) {
      Cookies.remove("token");

      state.auth.token = null;
      state.countries.countries = [];
      state.countries.selectedCountry = {};

      router.push({
        name: "login",
        query: { redirect: router.currentRoute.value.fullPath },
      });
    },
  },
  plugins: [createLogger()],
});
