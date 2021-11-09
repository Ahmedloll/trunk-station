<template>
  <b-card no-body>
    <b-card-header class="border-0 d-flex justify-content-between">
      <h3 class="mb-0">Incoming Pickup Request</h3>
    </b-card-header>

    <el-table
      class="table-responsive table"
      header-row-class-name="thead-light"
      :data="trips"
    >
      <el-table-column :label="$t('N')" type="index"> </el-table-column>

      <el-table-column label="From" min-width="150px">
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

      <el-table-column label="Sender" min-width="180px">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="mb-0 text-sm">{{ row.sender.name }}</span>
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
      <el-table-column label="Pickup Time" min-width="150px">
        <template v-slot="{ row }">
          <b-media no-body class="align-items-center">
            <b-media-body>
              <span class="mb-0 text-sm">{{ row.pickupTime }}</span>
            </b-media-body>
          </b-media>
        </template>
      </el-table-column>

      <el-table-column label="Actions" min-width="250px" prop="actions">
        <template v-slot="{ row }">
          <div class="d-flex justify-content-between">
            <button
              v-if="
                row.transporterAprove != '0' && row.transporterAprove != '1'
              "
              @click="approve(row)"
              class="btn btn-sm btn-success mr-4"
            >
              <i class="fas fa-check"></i>
            </button>
            <button
              v-if="row.transporterAprove == '1'"
              class="btn btn-sm btn-success mr-4"
            >
              Approved
              <i class="fas fa-check"></i>
            </button>
            <button
              v-if="
                row.transporterAprove != '0' && row.transporterAprove != '1'
              "
              @click="decline(row)"
              class="btn btn-sm btn-danger mr-4"
            >
              <i class="fas fa-times"></i>
            </button>
            <button
              v-if="row.transporterAprove == '0'"
              class="btn btn-sm btn-danger mr-4"
            >
              Declined
              <i class="fas fa-times"></i>
            </button>
            <button
              @click="setTrip(row)"
              class="btn btn-sm btn-info float-right"
            >
              <i class="fas fa-info-circle"></i>
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
  name: "incoming-pickup-request-table",
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
    approve(trip) {
      axios
        .post(
          `https://truckstation.info/api/pickups/approveTransporter`,
          { id: trip.id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "truck-user-token"
              )}`
            }
          }
        )
        .then(response => {
          console.log(response);
          this.$emit("approve", trip);
        })
        .catch(err => {
          console.log(err);
          // this.modals.error = err.response.data.message;
          // this.modals.modal0 = true;
        });
    },
    decline(trip) {
      axios
        .post(
          `https://truckstation.info/api/pickups/declineTransporter`,
          { id: trip.id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                "truck-user-token"
              )}`
            }
          }
        )
        .then(response => {
          console.log(response);
          this.$emit("decline", trip);
        })
        .catch(err => {
          console.log(err);
          // this.modals.error = err.response.data.message;
          // this.modals.modal0 = true;
        });
    },
    setTrip(trip) {
      console.log(trip);
      this.$store.state.detail_trip = trip;
      this.$router.push({ path: "trip-details" });
    }
  }
};
</script>
