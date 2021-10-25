<template>
  <b-card no-body>
    <b-card-header class="border-0 d-flex justify-content-between">
      <h3 class="mb-0">{{ $t("Trucks List") }}</h3>
      <router-link to="/addTruck" class="btn btn-sm btn-primary mr-4">
        {{ $t("Add Truck") }}
      </router-link>
    </b-card-header>

    <el-table
      class="table-responsive table"
      header-row-class-name="thead-light"
      :data="trucks"
    >
      <el-table-column :label="$t('N')" type="index"> </el-table-column>
      <el-table-column :label="$t('Truck Type')" min-width="200px">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="font-weight-600 name mb-0 text-sm">{{
                row.type.name
              }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Insurance Date" min-width="250px">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="font-weight-600 name mb-0 text-sm">{{
                row.licenseExpiryDate
              }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column> -->
      <el-table-column :label="$t('Capacity')" min-width="130px">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class=" name mb-0 text-sm">{{ row.capacity }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Registration No" min-width="180px">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class=" name mb-0 text-sm">{{
                row.registrationNo
              }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column> -->
      <el-table-column :label="$t('Price per KM')" min-width="150px">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class=" name mb-0 text-sm">{{ row.priceKM }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Truck Location')" min-width="175px">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class=" name mb-0 text-sm">{{
                row.truckLocation.name
              }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>

      <el-table-column :label="$t('Status')" min-width="125px" prop="status">
        <template v-slot="{ row }">
          <badge class="badge-dot mr-4" type="">
            <i :class="`bg-${row.status}`"></i>
            <span class="status" :class="`text-${row.status}`">{{
              row.status
            }}</span>
          </badge>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Valid')" min-width="110px" prop="valid">
        <template v-slot="{ row }">
          <badge class="badge-dot mr-4" type="">
            <span class="status text-primary">{{ row.valid }}</span>
          </badge>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Actions')" min-width="150px" prop="actions">
        <template v-slot="{ row }">
          <div class="d-flex justify-content-between">
            <a
              href="#/trucks"
              @click="deleteTruck(row)"
              class="btn btn-sm btn-info mr-4"
              ><i class="fas fa-trash-alt"></i
            ></a>
            <router-link
              :to="{ name: 'truck', params: { id: row.id } }"
              class="btn btn-sm btn-default float-right"
            >
              <i class="fas fa-edit"></i>
            </router-link>
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
    <loader v-if="loader" />
  </b-card>
</template>
<script>
// import projects from "./../projects";
import { Table, TableColumn } from "element-ui";
import axios from "axios";
import loader from "../../../components/Loader.vue";

export default {
  name: "trucks-table",
  components: {
    loader,

    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  props: ["trucks"],
  data() {
    return {
      loader: false,

      currentPage: 1
    };
  },
  methods: {
    deleteTruck(truck) {
      this.loader = true;
      axios
        .delete(
          `http://159.223.27.152/api/truck/${truck.id}/`,

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

            this.$emit("deleteTruck", truck);
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
