<template>
  <q-input
    outlined
    dense
    :type="type"
    :name="name"
    v-model="inputVal"
    :label="label"
    :disable="disable"
    :reactive-rules="reactiveRules"
    :lazy-rules="!reactiveRules"
    :rules="rules"
    no-error-icon
    hide-bottom-space
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: [
    "value",
    "name",
    "label",
    "type",
    "rules",
    "reactiveRules",
    "disable",
  ],
  emits: ["update:model-value"],
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val: string) {
        this.$emit("update:model-value", val);
      },
    },
  },
});
</script>
