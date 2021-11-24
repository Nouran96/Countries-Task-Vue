<template>
  <MainLayout v-if="auth.token" />
  <router-view v-else></router-view>
</template>

<script lang="ts">
import { mapState } from "vuex";
import MainLayout from "@/components/MainLayout.vue";

export default {
  name: "LayoutDefault",
  components: { MainLayout },
  computed: {
    ...mapState(["auth"]),
  },
};
</script>

<style lang="scss">
@import "@/styles/quasar.variables.scss";

html {
  min-height: 100vh;
  background: $primary;
}
</style>
