<template>
  <div class="q-ma-md row items-center justify-center container">
    <q-card class="col-10 col-sm-6 col-md-5 col-lg-3">
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div v-if="country">
          <q-card-section>
            <div class="text-h6 q-mb-xs text-accent text-bold text-center">
              {{ country.name }}
            </div>
          </q-card-section>

          <q-img no-spinner :ratio="18 / 9" src="@/assets/mountains.jpg" />

          <q-card-section>
            <q-btn
              fab
              color="primary"
              icon="edit"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%)"
              :to="{ name: 'edit', params: { name: country.name } }"
            >
              <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
                >Edit</q-tooltip
              >
            </q-btn>

            <div class="column">
              <span class="col text-h6 text-secondary">Population</span>
              <span class="col text-grey text-caption">
                {{ country.population }}
              </span>
            </div>

            <div class="column">
              <span class="col text-h6 text-secondary">Number of States</span>
              <span class="col text-grey text-caption">
                {{ country.numberOfStates }}
              </span>
            </div>
          </q-card-section>
        </div>
      </transition>

      <q-inner-loading :showing="isLoading" color="accent" />
    </q-card>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const route = useRoute();
    const isLoading = computed(() => store.state.shared.isLoading);
    const country = computed(() => store.state.countries.selectedCountry);

    const getCountry = () =>
      store.dispatch("getCountry", { name: route.params.name });

    getCountry();

    onUnmounted(() => store.commit("addSelectedCountry", {}));

    return {
      isLoading,
      country,
    };
  },
});
</script>

<style lang="scss">
@import "@/styles/quasar.variables.scss";

.container {
  height: $fullHeight;
}
</style>
