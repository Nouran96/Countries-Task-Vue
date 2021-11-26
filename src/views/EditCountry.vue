<template>
  <CountryForm @submitForm="editCountry" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CountryForm from "@/components/CountryForm.vue";
import { mapActions } from "vuex";

export default defineComponent({
  components: { CountryForm },
  methods: {
    ...mapActions(["editCountry"]),
  },
});
</script>
