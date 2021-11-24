<template>
  <div class="q-pa-md">
    <q-table
      class="table"
      title="Countries"
      :rows="rows"
      :columns="columns"
      :loading="isLoading"
      no-data-label="No countries found"
      :filter="filter"
      :filter-method="filterMethod"
      no-results-label="The filter didn't match any results"
      row-key="name"
      flat
      :pagination="{ rowsPerPage: 10 }"
      :rows-per-page-options="[5, 10, 20]"
      @row-click="goToDetails"
    >
      <!-- Header labels Override -->
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <!-- Actions Column -->
      <template #body-cell-actions="props">
        <q-td class="text-center">
          <q-btn
            dense
            flat
            round
            color="accent"
            field="edit"
            icon="edit"
            @click.stop="goToEdit(props.row)"
          >
            <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
              >Edit</q-tooltip
            >
          </q-btn>
        </q-td>
      </template>

      <!-- Filter -->
      <template v-slot:top-right>
        <q-input
          outlined
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <!-- <template v-slot:loading>
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span> Loading... </span>
        </div>
      </template> -->

      <!-- No data customization -->
      <template v-slot:no-data="{ message }">
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon size="2em" name="error_outline" />
          <span> {{ message }} </span>
        </div>
      </template>
    </q-table>

    <!-- Custom pagination -->
    <!-- <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        :max="pagesNumber"
        size="sm"
      />
    </div> -->
  </div>
</template>

<script lang="ts">
import { Country } from "@/models/Countries";
import { computed, defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();

    const filter = ref("");

    const columns = ref([
      {
        name: "name",
        label: "Name",
        field: "name",
        sortable: true,
        align: "left",
      },
      {
        name: "population",
        label: "Population",
        field: "population",
        sortable: true,
        align: "left",
      },
      {
        name: "numberOfStates",
        label: "Number of States",
        field: "numberOfStates",
        sortable: true,
        align: "left",
      },
      {
        name: "actions",
        align: "center",
        label: "Actions",
        field: "actions",
      },
    ]);

    const rows = computed(() => store.state.countries);
    const isLoading = computed(() => store.state.shared.isLoading);

    // const pagination = ref({
    //   sortBy: "desc",
    //   descending: false,
    //   page: 1,
    //   rowsPerPage: 10,
    // });

    // const pagesNumber = computed(() =>
    //   Math.ceil(rows.value.length / pagination.value.rowsPerPage)
    // );

    const filterMethod = (rows: Array<Country>, terms: string) => {
      return rows.filter((row: Country) =>
        row.name.toLowerCase().includes(terms.toLowerCase())
      );
    };

    const getAllCountries = () => store.dispatch("getAllCountries");

    const goToEdit = (row: Country) => {
      console.log(row);
    };

    const goToDetails = (e: PointerEvent, row: Country) => {
      console.log(row, e);
    };

    getAllCountries();

    return {
      columns,
      rows,
      filter,
      filterMethod,
      goToEdit,
      goToDetails,
      isLoading,
      //   pagination,
      //   pagesNumber,
    };
  },
});
</script>

<style lang="scss">
@import "@/styles/quasar.variables.scss";

.table {
  .q-table__progress .q-linear-progress {
    color: #fff !important;
  }

  thead tr:first-child th {
    /* bg color is important for th; just specify one */
    background-color: $accent;
    color: #fff;
    font-weight: bold;
    font-size: 1em;
  }

  thead tr th {
    position: sticky;
    z-index: 1;
  }
  thead tr:first-child th {
    top: 0;
  }

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th {
    /* height of all previous header rows */
    top: 48px;
  }

  tbody tr {
    cursor: pointer;
  }

  .q-table__bottom--nodata {
    justify-content: center;
  }
}
</style>
