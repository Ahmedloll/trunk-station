<template>
  <b-card no-body>
    <b-card-header class="border-0 d-flex justify-content-between">
      <h3 class="mb-0">Driver List</h3>
      <router-link to="/addDriver" class="btn btn-sm btn-primary mr-4">
        Add Driver
      </router-link>
    </b-card-header>
    <el-table
      class="table-responsive table"
      header-row-class-name="thead-light"
      :data="drivers"
    >
      <el-table-column :label="$t('N')" type="index"> </el-table-column>
      <el-table-column label="Name" min-width="200px" prop="name">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="font-weight-600 name mb-0 text-sm">{{
                row.name
              }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>
      <el-table-column label="Email" min-width="270px" prop="email">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="mb-0 text-sm">{{ row.email }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>
      <el-table-column label="Telephone" min-width="150px" prop="telephone">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="mb-0 text-sm">{{ row.phone }}</span>
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
      <el-table-column label="Valid" min-width="110px" prop="valid">
        <template v-slot="{ row }">
          <badge class="badge-dot mr-4" type="">
            <span class="status text-primary">{{ row.valid }}</span>
          </badge>
        </template>
      </el-table-column>
      <el-table-column label="Actions" min-width="150px" prop="actions">
        <template v-slot="{ row }">
          <div class="d-flex justify-content-between">
            <a
              href="#/drivers"
              @click="deleteDriver(row)"
              class="btn btn-sm btn-info mr-4"
              ><i class="fas fa-trash-alt"></i
            ></a>
            <router-link
              :to="{ name: 'driver', params: { id: row.id } }"
              class="btn btn-sm btn-default float-right"
            >
              <i class="fas fa-edit"></i>
            </router-link>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- <b-card-footer class="py-4 d-flex justify-content-end">
      <base-pagination
        v-model="currentPage"
        :per-page="10"
        :total="50"
      ></base-pagination>
    </b-card-footer> -->
    <loader v-if="loader" />
  </b-card>
</template>
<script>
import { Table, TableColumn } from "element-ui";
import axios from "axios";
import loader from "../../../components/Loader.vue";

export default {
  name: "drivers-table",
  components: {
    loader,

    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  props: ["drivers"],
  data() {
    return {
      loader: false,
      currentPage: 1
    };
  },
  methods: {
    deleteDriver(driver) {
      this.loader = true;
      axios
        .delete(
          `http://159.223.27.152/api/driver/${driver.id}/`,

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

            this.$emit("deleteDriver", driver);
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
