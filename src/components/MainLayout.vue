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
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" behavior="mobile" elevated>
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
import { computed, defineComponent, ref, watch } from "vue";

export default defineComponent({
  setup() {
    const $q = useQuasar();

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
