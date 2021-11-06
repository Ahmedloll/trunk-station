<template>
  <div>
    <div
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
      style="min-height: 200px;  background-size: cover; background-position: center top;"
    >
      <!-- background-image: url(img/theme/profile-cover.jpg); -->
      <!-- <b-container fluid> -->
      <!-- Mask -->
      <span class="mask bg-gradient-success opacity-8"></span>
      <!-- Header container -->
      <!-- <b-container fluid class="d-flex align-items-center">
          <b-row >
            <b-col lg="7" md="10">
              <h1 class="display-2 text-white">Hello Jesse</h1>
              <p class="text-white mt-0 mb-5">This is your profile page. You can see the progress you've made with your
                work and manage your projects or assigned tasks</p>
              <a href="#!" class="btn btn-info">Edit profile</a>
            </b-col>
          </b-row>
        </b-container> -->
      <!-- </b-container> -->
    </div>

    <b-container fluid class="mt--6">
      <b-row>
        <b-col class="order-xl-1">
          <card>
            <b-row align-v="center" slot="header">
              <b-col cols="8">
                <h3 class="mb-0">Create Cargo Pickup</h3>
              </b-col>
              <!-- <b-col cols="4" class="text-right">
                <a href="#!" class="btn btn-sm btn-primary">Settings</a>
              </b-col> -->
            </b-row>

            <b-form @submit.prevent="onSubmit">
              <form-wizard shape="square" title="" subtitle="" color="#5e72e4">
                <tab-content title="Information">
                  <b-row>
                    <b-col md="6">
                      <base-input
                        alternative
                        prepend-icon="ni ni-calendar-grid-58 "
                        label="Pickup date"
                        required
                      >
                        <flat-pickr
                          :config="{ allowInput: true }"
                          required
                          class="form-control datepicker"
                          v-model="date"
                        ></flat-pickr>
                      </base-input>
                    </b-col>
                    <b-col md="6">
                      <base-input
                        alternative
                        prepend-icon="ni ni-time-alarm"
                        label="Pickup time"
                        required
                      >
                        <flat-pickr
                          :config="{
                            allowInput: true,
                            enableTime: true,
                            noCalendar: true,
                            dateFormat: 'H:i'
                          }"
                          required
                          class="form-control datepicker"
                          v-model="time"
                        >
                        </flat-pickr>
                      </base-input>
                    </b-col>
                    <b-col cols="12">
                      <div>
                        <label class="form-control-label">Select Truck</label>
                      </div>

                      <div
                        v-for="type in $store.state.types"
                        :key="type.id"
                        class="radio-wrapper"
                      >
                        <input
                          type="radio"
                          required
                          :id="`${type.id}`"
                          :value="type"
                          name="type"
                          v-model="radio"
                        />
                        <label :for="`${type.id}`">
                          <img src="../assets/truck2.png" />
                          <div>{{ type.name }}</div>
                        </label>
                      </div>
                    </b-col>
                    <b-col cols="4">
                      <base-input
                        alternative
                        class="mb-3"
                        prepend-icon=""
                        id="Quantity"
                        label="Quantity"
                        placeholder="Quantity"
                        required
                        v-model="quantity"
                      >
                      </base-input>
                    </b-col>
                    <b-col cols="8">
                      <base-input
                        prepend-icon=""
                        label="Unit Type"
                        alternative
                        placeholder="Unit Type"
                        class="mb-3"
                      >
                        <b-form-select
                          :options="types"
                          v-model="type"
                          required
                        ></b-form-select>
                      </base-input>
                    </b-col>
                    <b-col cols="12">
                      <base-input
                        alternative
                        class="mb-3"
                        prepend-icon=""
                        id="no-of-truck-quantity"
                        label="No Of Truck Quantity"
                        placeholder="No Of Truck Quantity"
                        required
                        v-model="nOftruckQuantity"
                      >
                      </base-input>
                    </b-col>
                    <b-col cols="12">
                      <base-input
                        alternative
                        class="mb-3"
                        prepend-icon=""
                        label="Description"
                        v-model="description"
                      >
                        <textarea
                          class="form-control form-control-alternative"
                          rows="3"
                          placeholder="Description"
                          v-model="description"
                          id="Description"
                          required
                        ></textarea>
                      </base-input>
                    </b-col>
                  </b-row>
                </tab-content>
                <tab-content title="Pickup location">
                  <b-row>
                    <b-col cols="12">
                      <base-input
                        prepend-icon=""
                        label="Pickup location"
                        alternative
                        placeholder="Pickup location"
                        class="mb-3"
                        required
                      >
                        <b-form-select
                          :options="$store.state.cities"
                          value-field="id"
                          text-field="name"
                          v-model="from"
                          required
                        ></b-form-select>
                      </base-input>
                    </b-col>
                    <b-col cols="12">
                      <GMap
                        @gotlocation="gotPickupLocation"
                        :center="center"
                        :zoom="12"
                        style="width: 100%; height: 400px"
                      ></GMap>
                    </b-col>
                  </b-row>
                </tab-content>
                <tab-content title="Drop off location">
                  <b-row>
                    <b-col cols="12">
                      <base-input
                        prepend-icon=""
                        label="Drop off location"
                        alternative
                        placeholder="Drop off location"
                        class="mb-3"
                      >
                        <b-form-select
                          :options="$store.state.cities"
                          value-field="id"
                          text-field="name"
                          v-model="to"
                          required
                        ></b-form-select>
                      </base-input>
                    </b-col>
                    <b-col cols="12">
                      <GMap
                        @gotlocation="gotDropdownLocation"
                        :center="center"
                        :zoom="12"
                        style="width: 100%; height: 400px"
                      ></GMap>
                    </b-col>
                  </b-row>
                </tab-content>
                <tab-content title="Transporter">
                  <b-row>
                    <b-col cols="12">
                      <choose-trips-table
                        @selectTrip="selectTrip"
                        :trips="trips"
                      />
                    </b-col>
                  </b-row>
                </tab-content>
                <tab-content title="Reciver">
                  <b-col cols="12">
                    <base-input
                      prepend-icon=""
                      label="User"
                      alternative
                      placeholder="User"
                      class="mb-3"
                    >
                      <b-form-select
                        :options="users"
                        value-field="id"
                        text-field="name"
                        v-model="user"
                        required
                      ></b-form-select>
                    </base-input>
                  </b-col>
                </tab-content>
                <tab-content title="Review">
                  <b-row>
                    <b-col cols="6">
                      <span class="title">Pick up date:</span> {{ date }}</b-col
                    >
                    <b-col cols="6"
                      ><span class="title">Pick up time:</span>
                      {{ time }}</b-col
                    >
                    <b-col cols="6"
                      ><span class="title">Truck type:</span>
                      {{ radio.name }}</b-col
                    >
                    <b-col cols="6"
                      ><span class="title">Quantity:</span>
                      {{ `${quantity} ${type}` }}</b-col
                    >
                    <b-col cols="12"
                      ><span class="title">No of truck quantity:</span>
                      {{ nOftruckQuantity }}</b-col
                    >
                    <b-col cols="12"
                      ><span class="title">Description:</span>
                      {{ description }}</b-col
                    >
                    <b-col cols="6"
                      ><span class="title">From:</span>
                      {{ fromCity }}
                    </b-col>
                    <b-col cols="6"
                      ><span class="title">To:</span>
                      {{ toCity }}
                    </b-col>
                    <b-col cols="6"
                      ><span class="title">Transporter:</span>
                      {{ transporter }}
                    </b-col>
                    <b-col cols="6"
                      ><span class="title">Reciver:</span>
                      {{ reciver }}
                    </b-col>
                  </b-row>
                </tab-content>
                <template slot="footer" slot-scope="props">
                  <div class="wizard-footer-left">
                    <wizard-button
                      v-if="props.activeTabIndex > 0"
                      @click.native="props.prevTab()"
                      :style="props.fillButtonStyle"
                      >{{ $t("Back") }}</wizard-button
                    >
                  </div>
                  <div class="wizard-footer-right">
                    <wizard-button
                      v-if="props.activeTabIndex == 0"
                      @click.native="
                        step1Verfication ? props.nextTab() : handleError(0)
                      "
                      class="wizard-footer-right"
                      :style="props.fillButtonStyle"
                      >{{ $t("Next") }}</wizard-button
                    >
                    <wizard-button
                      v-else-if="props.activeTabIndex == 1"
                      @click.native="
                        step2Verfication ? props.nextTab() : handleError(1)
                      "
                      class="wizard-footer-right"
                      :style="props.fillButtonStyle"
                      >{{ $t("Next") }}</wizard-button
                    >
                    <wizard-button
                      v-else-if="props.activeTabIndex == 2"
                      @click.native="
                        if (step3Verfication) {
                          props.nextTab();
                          nextStep(props.activeTabIndex);
                        } else {
                          handleError(2);
                        }
                      "
                      class="wizard-footer-right"
                      :style="props.fillButtonStyle"
                      >{{ $t("Next") }}</wizard-button
                    >
                    <wizard-button
                      v-else-if="props.activeTabIndex == 3"
                      @click.native="trip ? props.nextTab() : handleError(3)"
                      class="wizard-footer-right"
                      :style="props.fillButtonStyle"
                      >{{ $t("Next") }}</wizard-button
                    >
                    <wizard-button
                      v-else-if="props.activeTabIndex == 4"
                      @click.native="props.nextTab()"
                      class="wizard-footer-right"
                      :style="props.fillButtonStyle"
                      >{{ $t("Next") }}</wizard-button
                    >
                    <!-- v-else-if="props.activeTabIndex == 4" -->
                    <wizard-button
                      v-else
                      @click.native="user ? submit() : handleError(4)"
                      class="wizard-footer-right finish-button"
                      :style="props.fillButtonStyle"
                      >{{ $t("Send request") }}</wizard-button
                    >

                    <!-- <wizard-button
                      v-else
                      @click.native="submit()"
                      class="wizard-footer-right finish-button"
                      :style="props.fillButtonStyle"
                    >
                      {{ $t("Done") }}</wizard-button
                    > -->
                  </div>
                </template>
              </form-wizard>
            </b-form>
          </card>
        </b-col>
      </b-row>
    </b-container>
    <modal :show.sync="modals.modal0">
      <template slot="header">
        <h5 class="modal-title" id="exampleModalLabel">Error</h5>
      </template>
      <div>
        {{ modals.error }}
      </div>
      <template slot="footer">
        <base-button type="secondary" @click="modals.modal0 = false"
          >Close</base-button
        >
      </template>
    </modal>
  </div>
</template>

<script>
import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

import ChooseTripsTable from "./Tables/RegularTables/ChooseTripsTable.vue";
import axios from "axios";
import GMap from "./GMap.vue";

export default {
  components: {
    flatPickr,
    ChooseTripsTable,
    GMap
  },
  computed: {
    step1Verfication() {
      return (
        this.date &&
        this.time &&
        this.radio &&
        this.quantity &&
        this.type &&
        this.nOftruckQuantity &&
        this.description
      );
    },
    step2Verfication() {
      return this.from && this.pickupLat && this.pickupLng;
    },
    step3Verfication() {
      return (
        this.to &&
        this.dropdownLat &&
        this.dropdownLng &&
        this.to != this.from &&
        (this.dropdownLat != this.pickupLat ||
          this.dropdownLng != this.pickupLng)
      );
    },
    fromCity() {
      if (this.$store.state.cities && this.from) {
        let city = this.$store.state.cities.filter(el => el.id == this.from)[0];
        return city.name;
      }
    },
    toCity() {
      if (this.$store.state.cities && this.to) {
        let city = this.$store.state.cities.filter(el => el.id == this.to)[0];
        return city.name;
      }
    },
    transporter() {
      if (this.trips && this.trip) {
        let company = this.trips.filter(el => el.companyId == this.trip)[0];
        return company.companyName;
      }
    },
    reciver() {
      if (this.users && this.user) {
        let user = this.users.filter(el => el.id == this.user)[0];
        return user.name;
      }
    }
  },
  data() {
    return {
      center: { lat: 24.694061084357084, lng: 46.67799070650271 },
      trips: [],
      users: [],
      date: "",
      time: "",
      radio: "",
      quantity: "",
      types: ["Ton", "KG"],
      type: "",
      nOftruckQuantity: "",
      description: "",
      from: "",
      pickupLat: "",
      pickupLng: "",
      to: "",
      dropdownLat: "",
      dropdownLng: "",
      trip: "",
      price: "",
      user: "",
      modals: {
        modal0: false,
        error: ""
      }
    };
  },
  methods: {
    nextStep(index) {
      if (index == 2) {
        axios
          .post(
            `https://truckstation.info/api/pickups/getTripsAndUsers`,
            {
              from: this.from,
              to: this.to,
              location: {
                lat: this.pickupLat,
                long: this.pickupLng
              },
              distination: {
                lat: this.dropdownLat,
                long: this.dropdownLng
              },
              truckType: this.radio.id
            },

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
            this.trips = response.data.trips;
            this.users = response.data.users;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

    gotPickupLocation(location) {
      this.pickupLat = location.position.lat;
      console.log(this.pickupLat);
      this.pickupLng = location.position.lng;
      console.log(this.pickupLng);
    },
    gotDropdownLocation(location) {
      this.dropdownLat = location.position.lat;
      console.log(this.dropdownLat);
      this.dropdownLng = location.position.lng;
      console.log(this.dropdownLng);
    },
    selectTrip(id, price) {
      this.trip = id;
      this.price = price;
    },
    handleError(step) {
      switch (step) {
        case 0:
          if (!this.date) {
            this.modals.error = "You have to enter pickup date";
          } else if (!this.time) {
            this.modals.error = "You have to enter pickup time";
          } else if (!this.radio) {
            this.modals.error = "You have to choose truck type";
          } else if (!this.quantity) {
            this.modals.error = "You have to enter quantity";
          } else if (!this.type) {
            this.modals.error = "You have to enter quantity type";
          } else if (!this.nOftruckQuantity) {
            this.modals.error = "You have to enter no of truck quantity";
          } else if (!this.description) {
            this.modals.error = "You have to enter description";
          }
          this.modals.modal0 = true;
          break;
        case 1:
          if (!this.from) {
            this.modals.error = "You have to choose pickup city";
          } else if (!(this.pickupLat && this.pickupLng)) {
            this.modals.error = "You have to enter pickup location";
          }
          this.modals.modal0 = true;
          break;
        case 2:
          if (!this.to) {
            this.modals.error = "You have to choose drop down city";
          } else if (!(this.dropdownLat && this.dropdownLng)) {
            this.modals.error = "You have to enter drop down location";
          } else if (this.to == this.from) {
            this.modals.error =
              "Drop down city cannot be the same as pick up city";
          } else if (
            !(
              this.dropdownLat != this.pickupLat ||
              this.dropdownLng != this.pickupLng
            )
          ) {
            this.modals.error =
              "Drop down location cannot be the same as pick up location";
          }
          this.modals.modal0 = true;
          break;
        case 3:
          if (!this.trip) {
            this.modals.error = "You have to choose trip";
          }
          this.modals.modal0 = true;
          break;
        case 4:
          if (!this.user) {
            this.modals.error = "You have to choose user";
          }
          this.modals.modal0 = true;
          break;
        default:
        // code block
      }
    },
    submit() {
      axios
        .post(
          `https://truckstation.info/api/pickups/`,
          {
            pickupDate: this.date,
            pickupTime: this.time,
            quantity: this.quantity,
            unit: this.type,
            numberOfTruck: this.nOftruckQuantity,
            description: this.description,
            reciver: this.user,
            transporter: this.trip,
            price: this.price,
            from: this.from,
            to: this.to,
            location: {
              lat: this.pickupLat,
              long: this.pickupLng
            },
            distination: {
              lat: this.dropdownLat,
              long: this.dropdownLng
            },
            truckType: this.radio.id
          },

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
          this.$router.push({ path: "pickup-requests" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
$spinTime: 3;
html,
body {
  height: 100%;
}
* {
  user-select: none;
}
.radio-wrapper {
  display: inline-block;
  input[type="radio"] {
    display: none;
    + label {
      width: 140px;
      margin-top: 10px;
      display: inline-block;
      padding: 20px 10px;
      text-align: center;
      transition: all 0.15s ease-in-out;
      background: #fff;
      border-radius: 10px;
      box-sizing: border-box;
      font-size: 12px;
      cursor: pointer;
      img {
        width: 64px;
      }
    }
    &:checked + label {
      box-shadow: inset 0 0 0 4px #1597ff,
        0 15px 15px -10px rgba(darken(#1597ff, 10%), 0.375);
    }
    &:not(:checked) + label {
      &:first-child {
        box-shadow: inset 0 0 0 0px #1597ff, 0 10px 15px -20px rgba(#1597ff, 0);
      }
    }
  }
}
.title {
  color: darkslategrey;
  font-size: 18px;
  line-height: 35px;
  font-weight: 600;
}
</style>
