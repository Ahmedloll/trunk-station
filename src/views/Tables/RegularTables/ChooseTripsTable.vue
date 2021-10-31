<template>
  <b-card no-body>
    <b-card-header class="border-0 d-flex justify-content-between">
      <h3 class="mb-0">Choose Trip</h3>
    </b-card-header>

    <el-table
      class="table-responsive table"
      header-row-class-name="thead-light"
      :data="trips"
    >
      <el-table-column :label="$t('N')" type="index"> </el-table-column>

      <el-table-column
        :label="$t('Company Name')"
        min-width="150px"
        prop="name"
      >
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="font-weight-600 name mb-0 text-sm">{{
                row.companyName
              }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>

      <el-table-column label="Price per KM" min-width="150px">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="mb-0 text-sm">{{ row.pricePerKM }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>

      <el-table-column label="Total Price" min-width="150px">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="mb-0 text-sm">{{ row.price }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>

      <el-table-column label="Actions" min-width="150px" prop="actions">
        <template v-slot="{ row }">
          <div class="d-flex justify-content-between">
            <button
              @click="selectTrip(row.companyId, row.price)"
              class="btn btn-sm btn-info mr-4"
              :class="selected == row.companyId ? 'selected' : ''"
            >
              Select
            </button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <loader v-if="loader" />
  </b-card>
</template>
<script>
// import projects from "./../projects";
import { Table, TableColumn } from "element-ui";
import axios from "axios";
import loader from "../../../components/Loader.vue";
export default {
  name: "choose-trips-table",
  components: {
    loader,

    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  props: ["trips"],
  data() {
    return {
      loader: false,
      selected: "",
      currentPage: 1
    };
  },
  methods: {
    selectTrip(tripId, price) {
      console.log(tripId);
      this.selected = tripId;
      this.$emit("selectTrip", this.selected, price);
    }
  }
};
</script>
<style lang="scss" scoped>
.selected {
  background-color: lightgreen;
}
</style>
