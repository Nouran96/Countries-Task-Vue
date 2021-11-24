<template>
  <q-btn
    no-caps
    :disable="disable"
    :loading="loading"
    :label="label"
    :type="type"
    :color="color"
  />
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  props: {
    label: { type: String, required: true, default: "Submit" },
    disable: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    color: { type: String, default: "primary" },
    type: {
      type: String,
      default: "button",
      validator: function (value: string) {
        return (
          ["button", "a", "submit", "reset", undefined].indexOf(value) !== -1
        );
      },
    },
  },
});
</script>
