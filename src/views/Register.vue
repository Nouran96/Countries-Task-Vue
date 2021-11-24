<template>
  <div class="container row items-center justify-center">
    <div class="col-9 col-sm-6 col-md-5 col-lg-3">
      <AuthForm @submitForm="register" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthForm from "@/components/AuthForm.vue";
import { mapActions } from "vuex";
import { AuthData } from "@/models/Auth";

export default defineComponent({
  components: { AuthForm },
  methods: {
    ...mapActions(["onRegister"]),
    register(payload: AuthData) {
      this.onRegister(payload);
    },
  },
});
</script>

<style lang="scss">
.container {
  min-height: 100vh;
}
</style>
