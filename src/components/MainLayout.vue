<template>
  <q-layout view="hHh lpR fFf">
    <q-header reveal elevated class="bg-white text-accent">
      <q-toolbar>
        <q-btn
          v-if="isMobile"
          dense
          flat
          round
          icon="menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-img
            src="@/assets/gradient_logo.png"
            spinner-color="white"
            no-native-menu
            class="logo"
          />
          <q-btn flat dense class="q-mx-xs" to="/">Home</q-btn>
        </q-toolbar-title>

        <q-space></q-space>

        <TheButton label="Add Country" icon="add" />

        <q-btn flat class="q-ml-xs" @click="onLogout">Logout</q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="isMobile"
      v-model="leftDrawerOpen"
      side="left"
      behavior="mobile"
      elevated
    >
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer reveal elevated class="bg-white text-accent">
      <span class="q-py-sm block text-center text-bold"
        >Copyrights &copy; 2021 | Nouran Samy</span
      >
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import { useQuasar } from "quasar";
import { computed, defineComponent, ref } from "vue";
import TheButton from "@/components/controls/TheButton.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { TheButton },
  setup() {
    const $q = useQuasar();
    const store = useStore();

    const leftDrawerOpen = ref(false);

    const isMobile = computed(() => {
      return $q.screen.lt.sm;
    });

    return {
      leftDrawerOpen,
      isMobile,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      onLogout: () => store.commit("onLogout"),
    };
  },
});
</script>

<style lang="scss">
.logo {
  height: 65px;
  max-width: 75px;
}
</style>
