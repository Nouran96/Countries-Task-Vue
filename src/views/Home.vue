<template>
  <CountriesTable />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CountriesTable from "@/components/CountriesTable.vue";

export default defineComponent({
  name: "Home",
  components: { CountriesTable },
});
</script>
