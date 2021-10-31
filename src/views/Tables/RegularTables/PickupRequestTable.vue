<template>
  <b-card no-body>
    <b-card-header class="border-0 d-flex justify-content-between">
      <h3 class="mb-0">Trip List</h3>
    </b-card-header>

    <el-table
      class="table-responsive table"
      header-row-class-name="thead-light"
      :data="trips"
    >
      <el-table-column :label="$t('N')" type="index"> </el-table-column>

       <el-table-column label="From" min-width="150px" >
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="font-weight-600 name mb-0 text-sm">{{
                row.from.name
              }}</span>
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

      <el-table-column label="reciver" min-width="180px">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="mb-0 text-sm">{{ row.reciver.name }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>
      <el-table-column label="Pickup Date" min-width="170px">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="mb-0 text-sm">{{ row.pickupDate }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>
      <el-table-column label="Pickup Time" min-width="140px">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="mb-0 text-sm">{{ row.pickupTime }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>



      <!--
      <el-table-column label="Actions" min-width="150px" prop="actions">
        <template v-slot="{ row }">
          <div class="d-flex justify-content-between">

            <router-link
              :to="{ name: 'trip', params: { id: row.id } }"
              class="btn btn-sm btn-default float-right"
            >
              <i class="fas fa-edit"></i>
            </router-link>
          </div>
        </template>
      </el-table-column> -->
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
  name: "pickup-request-table",
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

  }
};
</script>
