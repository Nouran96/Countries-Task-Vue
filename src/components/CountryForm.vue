<template>
  <div class="q-ma-md row items-center justify-center container">
    <div class="col-10 col-sm-6 col-md-5 col-lg-3">
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <q-card class="q-pa-lg card col-6">
          <h5 class="greeting" v-if="!isLoading || submittingForm">
            {{ emptyCountry ? "Add Country" : `Edit "${country.name}"` }}
          </h5>
          <q-form
            ref="myForm"
            autocomplete="off"
            greedy
            @submit="onSubmit"
            class="q-gutter-y-md form"
          >
            <TheInputField
              :disable="!emptyCountry"
              :model-value="model.name"
              @update:model-value="model.name = $event"
              label="Name"
              :rules="[isRequired]"
            />

            <TheInputField
              :model-value="model.population"
              @update:model-value="model.population = $event"
              label="Population"
              :rules="[isRequired, isNumbersOnly]"
            />

            <TheInputField
              :model-value="model.numberOfStates"
              @update:model-value="model.numberOfStates = $event"
              label="Number of states"
              :rules="[isRequired, isNumbersOnly]"
            />

            <div class="row justify-center q-gutter-sm q-my-md">
              <TheButton
                :loading="isLoading && submittingForm"
                :disable="!isValidForm"
                label="Submit"
                type="submit"
              />

              <TheButton
                color="transparent"
                label="Cancel"
                textColor="black"
                @click="$router.back()"
              />
            </div>
          </q-form>
        </q-card>
      </transition>
    </div>

    <q-inner-loading
      :showing="$route.params.name && emptyCountry && isLoading"
      color="accent"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed, onUnmounted } from "vue";
import TheInputField from "./controls/TheInputField.vue";
import TheButton from "./controls/TheButton.vue";
import { isRequired, isNumbersOnly } from "@/utils/Validators";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default defineComponent({
  components: { TheInputField, TheButton },
  props: {
    isLogin: { type: Boolean, default: false },
  },
  setup(props, { emit }) {
    const store = useStore();
    const route = useRoute();

    const myForm = ref();
    const submittingForm = ref(false);
    const isValidForm = ref(false);
    const model = ref({
      name: null,
      population: null,
      numberOfStates: null,
    });

    const isLoading = computed(() => store.state.shared.isLoading);
    const country = computed(() => store.state.countries.selectedCountry);
    const emptyCountry = computed(
      () => Object.keys(country.value).length === 0
    );

    const getCountry = () =>
      store.dispatch("getCountry", { name: route.params.name });

    if (route.params.name) {
      getCountry();
    }

    onUnmounted(() => store.commit("addSelectedCountry", {}));

    watch(
      model,
      () => {
        if (
          model.value.name &&
          model.value.population &&
          model.value.numberOfStates
        ) {
          isValidForm.value = true;
        } else {
          isValidForm.value = false;
        }
      },
      { deep: true }
    );

    watch(
      country,
      () => {
        if (Object.keys(country.value).length > 0) {
          model.value = {
            ...country.value,
            population: `${country.value.population}`,
            numberOfStates: `${country.value.numberOfStates}`,
          };
        }
      },
      { deep: true }
    );

    return {
      myForm,
      isLoading,
      isValidForm,
      model,
      isRequired,
      isNumbersOnly,
      country,
      emptyCountry,
      submittingForm,

      onSubmit() {
        const payload = {
          ...model.value,
          population: Number(model.value.population),
          numberOfStates: Number(model.value.numberOfStates),
        };

        submittingForm.value = true;

        emit("submitForm", payload);
      },
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/quasar.variables.scss";
.container {
  height: $fullHeight;
  .card {
    margin: 1rem 0;
    border-radius: 7px;
    background: #fff;

    .greeting {
      text-align: center;
      color: $accent;
      margin: 0 0 1rem;
      font-weight: bold;
    }

    .form {
      width: 80%;
      margin: auto;

      @media (max-width: 750px) {
        width: 90%;
      }
    }
  }
}
</style>
