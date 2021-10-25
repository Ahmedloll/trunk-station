<template>
  <b-card no-body>
    <b-card-header class="border-0 d-flex justify-content-between">
      <h3 class="mb-0">Trip List</h3>
      <router-link to="/addTrip" class="btn btn-sm btn-primary mr-4">
        Add Trip
      </router-link>
    </b-card-header>

    <el-table
      class="table-responsive table"
      header-row-class-name="thead-light"
      :data="trips"
    >
      <el-table-column :label="$t('N')" type="index"> </el-table-column>

      <el-table-column label="Truck Type" min-width="150px" prop="name">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="font-weight-600 name mb-0 text-sm">{{
                row.truckType.name
              }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>
      <el-table-column label="From" min-width="150px">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="mb-0 text-sm">{{ row.from.name }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>
      <el-table-column label="To" min-width="150px">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="mb-0 text-sm">{{ row.to.name }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>
      <el-table-column label="Fixed Price" min-width="140px">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="mb-0 text-sm">{{ row.price }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>

      <el-table-column label="Status" min-width="125px" prop="status">
        <template v-slot="{ row }">
          <badge class="badge-dot mr-4" type="">
            <i :class="`bg-${row.status}`"></i>
            <span class="status" :class="`text-${row.status}`">{{
              row.status
            }}</span>
          </badge>
        </template>
      </el-table-column>

      <el-table-column label="Actions" min-width="150px" prop="actions">
        <template v-slot="{ row }">
          <div class="d-flex justify-content-between">
            <a
              href="#/trips"
              @click="deleteTrip(row)"
              class="btn btn-sm btn-info mr-4"
              ><i class="fas fa-trash-alt"></i
            ></a>
            <router-link
              :to="{ name: 'trip', params: { id: row.id } }"
              class="btn btn-sm btn-default float-right"
            >
              <i class="fas fa-edit"></i>
            </router-link>
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
  name: "trips-table",
  components: {
    loader,

    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  props: ["trips"],
  data() {
    return {
      loader: false,

      currentPage: 1
    };
  },
  methods: {
    deleteTrip(trip) {
      this.loader = true;
      axios
        .delete(
          `http://159.223.27.152/api/fixedTrip/${trip.id}/`,

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "truck-user-token"
              )}`
            }
          }
        )
        .then(response => {
          if (response.status == 200) {
            this.loader = false;

            this.$emit("deleteTrip", trip);
          }
        })
        .catch(err => {
          this.loader = false;
          console.log(err);
        });
    }
  }
};
</script>
