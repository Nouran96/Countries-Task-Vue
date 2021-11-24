<template>
  <q-card class="q-pa-lg card">
    <q-img
      src="@/assets/gradient_logo.png"
      spinner-color="white"
      no-native-menu
      class="logo"
    />
    <h5 class="greeting">{{ isLogin ? "Welcome again" : "First time?" }}</h5>
    <q-form
      ref="myForm"
      autocomplete="off"
      greedy
      @submit="onSubmit"
      class="q-gutter-md form"
    >
      <TheInputField
        :model-value="model.email"
        @update:model-value="model.email = $event"
        label="Email address"
        :rules="[isRequired, isValidEmail]"
      />

      <TheInputField
        :model-value="model.password"
        @update:model-value="model.password = $event"
        type="password"
        label="Password"
        :rules="[isRequired, ...(!isLogin ? [(val: string) => isMinLength(val, 6)] : [])]"
      />

      <TheInputField
        v-if="!isLogin"
        :model-value="model.confirmPassword"
        @update:model-value="model.confirmPassword = $event"
        type="password"
        label="Confirm Password"
        :reactiveRules="true"
        :rules="[isRequired, (val: string) => isSamePassword(val, model.password)]"
      />

      <div class="row justify-center q-my-md">
        <TheButton :disable="!isValidForm" label="Submit" type="submit" />
      </div>

      <div v-if="isLogin" class="redirectLink">
        <span>No account yet?</span>
        <router-link :to="{ name: 'register' }">Register now</router-link>
      </div>

      <div v-else class="redirectLink">
        <span>Have an account?</span>
        <router-link :to="{ name: 'login' }">Login now</router-link>
      </div>
    </q-form>
  </q-card>
</template>

<script lang="ts">
import { useQuasar } from "quasar";
import { defineComponent, ref, reactive, watch } from "vue";
import TheInputField from "./controls/TheInputField.vue";
import TheButton from "./controls/TheButton.vue";
import {
  isRequired,
  isValidEmail,
  isMinLength,
  isSamePassword,
} from "@/utils/Validators";

export default defineComponent({
  components: { TheInputField, TheButton },
  props: {
    isLogin: { type: Boolean, default: false },
  },
  setup(props, { emit }) {
    const $q = useQuasar();

    const myForm = ref();
    const isValidForm = ref(false);
    const model = reactive({
      email: null,
      password: null,
      confirmPassword: null,
    });

    // const validateForm = () => {
    //   (myForm.value as { validate: () => Promise<boolean> })
    //     .validate()
    //     .then((success: boolean) => {
    //       isValidForm.value = success;
    //       myForm.value.resetValidation();
    //     });
    // };

    watch(model, () => {
      if (
        model.email &&
        model.password &&
        (props.isLogin ? true : model.confirmPassword)
      ) {
        isValidForm.value = true;
      } else {
        isValidForm.value = false;
      }
    });

    // onMounted(() => {
    //   console.log(
    //     myForm.value
    //       .getValidationComponents()
    //       .map((comp: any) => console.log(comp.errors))
    //   );

    //   validateForm();
    // });

    return {
      myForm,
      isValidForm,
      model,
      isValidEmail,
      isSamePassword,
      isRequired,
      isMinLength,

      onSubmit() {
        const { confirmPassword, ...data } = model;
        emit("submitForm", data);
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted",
        });
        //   $q.notify({
        //     color: "red-5",
        //     textColor: "white",
        //     icon: "warning",
        //     message: "You need to accept the license and terms first",
        //   });
      },
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/styles/quasar.variables.scss";
.card {
  // width: 400px;
  // min-width: 400px;
  margin: 1rem 0;
  border-radius: 7px;
  background: #fff;

  .redirectLink {
    display: flex;
    justify-content: center;
    gap: 0.2rem;

    a {
      color: $accent;
      text-decoration: none;
      font-weight: bold;
    }
  }

  .greeting {
    text-align: center;
    color: $accent;
    margin: 0 0 1rem;
    font-weight: bold;
  }

  .logo {
    display: block;
    margin: auto;
  }

  .form {
    width: 80%;
    margin: auto;

    @media (max-width: 750px) {
      width: 90%;
    }

    label {
      margin-left: 0;
    }
  }
}
</style>
