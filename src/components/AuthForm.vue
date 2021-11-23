<template>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form greedy @submit="onSubmit" class="q-gutter-md">
      <TheInputField
        :model-value="email"
        @update:model-value="email = $event"
        label="Email address"
        :rules="[isRequired, isValidEmail]"
      />

      <TheInputField
        :model-value="password"
        @update:model-value="password = $event"
        type="password"
        label="Password"
        :rules="[isRequired, ...(!isLogin ? [(val: string) => isMinLength(val, 6)] : [])]"
      />

      <TheInputField
        v-if="!isLogin"
        :model-value="confirmPassword"
        @update:model-value="confirmPassword = $event"
        type="password"
        label="Confirm Password"
        :reactiveRules="true"
        :rules="[isRequired, (val: string) => isSamePassword(val, password)]"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
      </div>

      <router-link v-if="isLogin" :to="{ name: 'register' }"
        >No account yet ? Regsiter now</router-link
      >

      <router-link v-else :to="{ name: 'login' }"
        >Have an account? Login now</router-link
      >
    </q-form>
  </div>
</template>

<script lang="ts">
import { useQuasar } from "quasar";
import { defineComponent, ref } from "vue";
import TheInputField from "./controls/TheInputField.vue";
import {
  isRequired,
  isValidEmail,
  isMinLength,
  isSamePassword,
} from "@/utils/Validators";

export default defineComponent({
  components: { TheInputField },
  props: {
    isLogin: { type: Boolean, default: false },
  },
  setup() {
    const $q = useQuasar();

    const email = ref(null);
    const password = ref(null);
    const confirmPassword = ref(null);

    return {
      email,
      password,
      confirmPassword,

      onSubmit() {
        console.log(email.value, password.value, confirmPassword.value);
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

      isValidEmail,
      isSamePassword,
      isRequired,
      isMinLength,
    };
  },
});
</script>
