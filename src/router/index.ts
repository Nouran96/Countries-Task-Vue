import store from "@/store";
import {
  createRouter,
  createWebHistory,
  RouteRecordNormalized,
  RouteRecordRaw,
} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Register.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:name",
    name: "details",
    component: () => import("@/views/Details.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/edit/:name",
    name: "edit",
    component: () => import("@/views/EditCountry.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/add",
    name: "add",
    component: () => import("@/views/AddCountry.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  { path: "/:pathMatch(.*)*", name: "notFound", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Global guard to check authentication
router.beforeEach((to, from, next) => {
  const token = store.state.auth.token;

  if (
    to.matched.some((record: RouteRecordNormalized) => record.meta.requiresAuth)
  ) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    !token
      ? next({
          path: "/login",
          query: { redirect: to.fullPath },
        })
      : next();
  } else {
    token
      ? next({
          path: "/",
        })
      : next();
  }
});

export default router;
