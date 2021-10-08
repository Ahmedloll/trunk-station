<template>
  <b-card no-body>
    <b-card-header class="border-0 d-flex justify-content-between">
      <h3 class="mb-0">Driver List</h3>
      <router-link to="/drivers/add" class="btn btn-sm btn-primary mr-4">
        Add Driver
      </router-link>
    </b-card-header>

    <el-table
      class="table-responsive table"
      header-row-class-name="thead-light"
      :data="projects"
    >
      <el-table-column label="no" prop="budget" min-width="100px">
      </el-table-column>
      <el-table-column label="Name" min-width="250px" prop="name">
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
      <el-table-column label="Email" min-width="300px" prop="email">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="mb-0 text-sm">{{ row.email }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>
      <el-table-column label="Telephone" min-width="200px" prop="telephone">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="mb-0 text-sm">{{ row.telephone }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>

      <el-table-column label="Status" min-width="180px" prop="status">
        <template v-slot="{ row }">
          <badge class="badge-dot mr-4" type="">
            <i :class="`bg-${row.statusType}`"></i>
            <span class="status" :class="`text-${row.statusType}`">{{
              row.status
            }}</span>
          </badge>
        </template>
      </el-table-column>
      <el-table-column label="Valid" min-width="150px" prop="valid">
        <template v-slot="{ row }">
          <badge class="badge-dot mr-4" type="">
            <span class="status text-primary">{{ row.valid }}</span>
          </badge>
        </template>
      </el-table-column>
      <el-table-column label="Actions" min-width="410px" prop="actions">
        <template v-slot="{ row }">
          <div class="d-flex justify-content-between">
            <a href="#" class="btn btn-sm btn-info mr-4">Edit</a>
            <a href="#" class="btn btn-sm btn-default float-right">Message</a>
            <a href="#" class="btn btn-sm btn-info mr-4">Connect</a>
            <a href="#" class="btn btn-sm btn-default float-right">Message</a>
          </div>
        </template>
      </el-table-column>

      <!-- <el-table-column label="Budget" prop="budget" min-width="140px">
      </el-table-column> -->
      <!-- <el-table-column label="Users" min-width="190px">
        <div class="avatar-group">
          <a
            href="#"
            class="avatar avatar-sm rounded-circle"
            data-toggle="tooltip"
            data-original-title="Ryan Tompson"
          >
            <img alt="Image placeholder" src="img/theme/team-1.jpg" />
          </a>
          <a
            href="#"
            class="avatar avatar-sm rounded-circle"
            data-toggle="tooltip"
            data-original-title="Romina Hadid"
          >
            <img alt="Image placeholder" src="img/theme/team-2.jpg" />
          </a>
          <a
            href="#"
            class="avatar avatar-sm rounded-circle"
            data-toggle="tooltip"
            data-original-title="Alexander Smith"
          >
            <img alt="Image placeholder" src="img/theme/team-3.jpg" />
          </a>
          <a
            href="#"
            class="avatar avatar-sm rounded-circle"
            data-toggle="tooltip"
            data-original-title="Jessica Doe"
          >
            <img alt="Image placeholder" src="img/theme/team-4.jpg" />
          </a>
        </div>
      </el-table-column> -->

      <!-- <el-table-column label="Completion" prop="completion" min-width="240px">
        <template v-slot="{ row }">
          <div class="d-flex align-items-center">
            <span class="completion mr-2">{{ row.completion }}%</span>
            <div>
              <base-progress :type="row.statusType" :value="row.completion" />
            </div>
          </div>
        </template>
      </el-table-column> -->
    </el-table>

    <!-- <b-card-footer class="py-4 d-flex justify-content-end">
      <base-pagination
        v-model="currentPage"
        :per-page="10"
        :total="50"
      ></base-pagination>
    </b-card-footer> -->
  </b-card>
</template>
<script>
// import projects from "./../projects";
import { Table, TableColumn } from "element-ui";
export default {
  name: "light-table",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data() {
    return {
      projects: [
        {
          name: "Argon Design System",
          email: "ahmed.alaa.fathy.96@gmail.com",
          telephone: "00201113639277",
          // budget: "$2500 USD",
          status: "pending",
          statusType: "warning",
          valid: "expired"
          // completion: 60
        },
        {
          name: "Angular Now UI Kit PRO",
          email: "aa@asd.com",
          telephone: "5565656",
          // budget: "$1800 USd",
          status: "completed",
          statusType: "success",
          valid: "expired"
          // completion: 100
        }
      ],
      currentPage: 1
    };
  }
};
</script>
