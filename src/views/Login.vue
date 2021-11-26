<template>
  <div class="container row items-center justify-center">
    <div class="col-10 col-sm-6 col-md-5 col-lg-3">
      <AuthForm @submitForm="login" :isLogin="true" />
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
    ...mapActions(["onLogin"]),
    login(payload: AuthData) {
      this.onLogin(payload);
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
}
</style>
