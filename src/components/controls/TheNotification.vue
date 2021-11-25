<template>
  <div></div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from "@vue/runtime-core";
import { useQuasar } from "quasar";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const $q = useQuasar();
    const store = useStore();

    const notification = computed(() => store.state.shared.notification);

    watch(notification, () => {
      if (notification.value.show) {
        $q.notify({
          message: notification.value.message,
          color: notification.value.color,
          actions: [
            {
              label: "Dismiss",
              color: "white",
              handler: () => store.commit("dismissNotification"),
            },
          ],
        });
      }
    });

    return {};
  },
});
</script>
