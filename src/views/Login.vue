<template>
  <h1>Login page</h1>
  <AuthForm :isLogin="true" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AuthForm from "@/components/AuthForm.vue";

export default defineComponent({
  components: { AuthForm },
});
</script>
