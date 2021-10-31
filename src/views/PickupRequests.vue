<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
    </base-header>
    <b-container fluid class="mt--7">
      <b-row>
        <b-col>
          <pickup-request-table  :trips="trips" />
        </b-col>
      </b-row>
      <div class="mt-5"></div>
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
import PickupRequestTable from "./Tables/RegularTables/PickupRequestTable";
import DarkTable from "./Tables/RegularTables/DarkTable";
import axios from "axios";
import loader from "../components/Loader.vue";

export default {
  components: {
    PickupRequestTable,
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
    // deleteTrip(trip) {
    //   this.trips = this.trips.filter(function(el) {
    //     return el.id != trip.id;
    //   });
    // }
  },
  mounted() {
    //****************************** getting trips ******************************

    axios
      .get(`https://truckstation.info/api/pickups/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("truck-user-token")}`
        }
      })
      .then(response => {
        this.trips = response.data.pickup;
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
