<template>
  <TheNotification />
  <MainLayout />
</template>

<script lang="ts">
import { mapState } from "vuex";
import MainLayout from "@/components/MainLayout.vue";
import TheNotification from "./components/controls/TheNotification.vue";

export default {
  name: "LayoutDefault",
  components: { MainLayout, TheNotification },
  computed: {
    ...mapState(["auth"]),
  },
};
</script>

<style lang="scss">
@import "@/styles/quasar.variables.scss";

html {
  min-height: 100vh;
  background: $primary fixed;
}
</style>
