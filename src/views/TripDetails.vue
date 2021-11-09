<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-success">
    </base-header>
    <b-container fluid class="mt--7">
      <b-row>
        <b-col class="order-xl-1">
          <card>
            <b-row align-v="center" slot="header">
              <b-col cols="8">
                <h3 class="mb-0">Request Details</h3>
              </b-col>
            </b-row>
            <b-row>
              <!-- {{ $store.state.detail_trip }} -->
              <b-col cols="6">
                <span class="title">Pick up date:</span>
                {{ $store.state.detail_trip.pickupDate }}
              </b-col>
              <b-col cols="6"
                ><span class="title">Pick up time:</span>
                {{ $store.state.detail_trip.pickupTime }}
              </b-col>
              <b-col cols="6"
                ><span class="title">Truck type:</span>
                {{ $store.state.detail_trip.car_type.name }}
              </b-col>
              <b-col cols="6"
                ><span class="title">Quantity:</span>
                {{
                  `${$store.state.detail_trip.quantity} ${$store.state.detail_trip.unit}`
                }}
              </b-col>
              <b-col cols="12"
                ><span class="title">No of truck quantity:</span>
                {{ $store.state.detail_trip.numberOfTruck }}
              </b-col>
              <b-col cols="12"
                ><span class="title">Description:</span>
                {{ $store.state.detail_trip.description }}
              </b-col>
              <b-col cols="6"
                ><span class="title">From:</span>
                {{ $store.state.detail_trip.from.name }}
              </b-col>
              <b-col cols="6"
                ><span class="title">To:</span>
                {{ $store.state.detail_trip.to.name }}
              </b-col>
              <b-col cols="6"
                ><span class="title">Transporter:</span>
                {{ $store.state.detail_trip.transporter.name }}
                <button
                  disabled
                  v-if="$store.state.detail_trip.transporterAprove == '1'"
                  class="btn btn-sm btn-success mr-4 float-none ml-3"
                >
                  Approved
                  <i class="fas fa-check"></i>
                </button>

                <button
                  disabled
                  v-else-if="$store.state.detail_trip.transporterAprove == '0'"
                  class="btn btn-sm btn-danger mr-4 float-none ml-3"
                >
                  Declined
                  <i class="fas fa-times"></i>
                </button>
                <button
                  disabled
                  v-else
                  class="btn btn-sm btn-info float-right float-none ml-3"
                >
                  Pending
                </button>
              </b-col>
              <b-col cols="6"
                ><span class="title">Reciver:</span>
                {{ $store.state.detail_trip.reciver.name }}
                <button
                  disabled
                  v-if="$store.state.detail_trip.reciverApprove == '1'"
                  class="btn btn-sm btn-success mr-4 float-none ml-3"
                >
                  Approved
                  <i class="fas fa-check"></i>
                </button>

                <button
                  disabled
                  v-else-if="$store.state.detail_trip.reciverApprove == '0'"
                  class="btn btn-sm btn-danger mr-4 float-none ml-3"
                >
                  Declined
                  <i class="fas fa-times"></i>
                </button>
                <button
                  disabled
                  v-else
                  class="btn btn-sm btn-info float-right float-none ml-3"
                >
                  Pending
                </button>
              </b-col>
            </b-row>
          </card>
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
      trips: ["df"],
      users,
      loader: false
    };
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.title {
  color: darkslategrey;
  font-size: 18px;
  line-height: 35px;
  font-weight: 600;
}
</style>
