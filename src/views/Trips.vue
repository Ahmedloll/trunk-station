<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <!-- <b-row>
        <b-col xl="3" md="6">
          <stats-card title="Total traffic"
                      type="gradient-red"
                      sub-title="350,897"
                      icon="ni ni-active-40"
                      class="mb-4">

            <template slot="footer">
              <span class="text-success mr-2">3.48%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Total traffic"
                      type="gradient-orange"
                      sub-title="2,356"
                      icon="ni ni-chart-pie-35"
                      class="mb-4">

            <template slot="footer">
              <span class="text-success mr-2">12.18%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Sales"
                      type="gradient-green"
                      sub-title="924"
                      icon="ni ni-money-coins"
                      class="mb-4">

            <template slot="footer">
              <span class="text-danger mr-2">5.72%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>

        </b-col>
        <b-col xl="3" md="6">
          <stats-card title="Performance"
                      type="gradient-info"
                      sub-title="49,65%"
                      icon="ni ni-chart-bar-32"
                      class="mb-4">

            <template slot="footer">
              <span class="text-success mr-2">54.8%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
      </b-row> -->
    </base-header>
    <b-container fluid class="mt--7">
      <b-row>
        <b-col>
          <trips-table @deleteTrip="deleteTrip" :trips="trips" />
        </b-col>
      </b-row>
      <div class="mt-5"></div>
      <!-- <dark-table></dark-table> -->
    </b-container>
    <loader v-if="loader" />
  </div>
</template>
<script>
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Table,
  TableColumn
} from "element-ui";
import users from "./Tables/users";
import TripsTable from "./Tables/RegularTables/TripsTable";
import DarkTable from "./Tables/RegularTables/DarkTable";
import axios from "axios";
import loader from "../components/Loader.vue";

export default {
  components: {
    TripsTable,
    DarkTable,
    loader,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data() {
    return {
      trips: [],
      users,
      loader: true
    };
  },
  methods: {
    deleteTrip(trip) {
      this.trips = this.trips.filter(function(el) {
        return el.id != trip.id;
      });
    }
  },
  mounted() {
    //****************************** getting trips ******************************

    axios
      .get(`https://truckstation.info/api/fixedTrip/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("truck-user-token")}`
        }
      })
      .then(response => {
        this.trips = response.data.trips;
        this.loader = false;
      });
  }
};
</script>
<style>
.el-table.table-dark {
  background-color: #172b4d;
  color: #f8f9fe;
}

.el-table.table-dark th,
.el-table.table-dark tr {
  background-color: #172b4d;
}

.el-table.table-dark td,
.el-table.table-dark th.is-leaf {
  border-bottom: none;
}
</style>
