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
                <h3 class="mb-0">Add Truck</h3>
              </b-col>
              <!-- <b-col cols="4" class="text-right">
                <a href="#!" class="btn btn-sm btn-primary">Settings</a>
              </b-col> -->
            </b-row>

            <b-form @submit.prevent="onSubmit">
              <h6 class="heading-small text-muted mb-4">Truck information</h6>
              <div class="pl-lg-4">
                <b-row>
                  <b-col md="12">
                    <base-input
                      prepend-icon=""
                      label="Truck Location"
                      alternative
                      placeholder="Truck Location"
                      class="mb-3"
                    >
                      <b-form-select
                        :options="$store.state.cities"
                        value-field="id"
                        text-field="name"
                        v-model="truck.truckLocation"
                        required
                      ></b-form-select>
                    </base-input>
                  </b-col>
                  <b-col md="12">
                    <base-input
                      prepend-icon=""
                      label="Truck Type"
                      alternative
                      placeholder="Truck Type"
                      class="mb-3"
                    >
                      <b-form-select
                        :options="$store.state.types"
                        value-field="id"
                        text-field="name"
                        v-model="truck.type"
                        required
                      ></b-form-select>
                    </base-input>
                  </b-col>
                  <b-col lg="12">
                    <base-input
                      alternative
                      class="mb-3"
                      prepend-icon=""
                      type=""
                      id="capacity"
                      label="Capacity"
                      placeholder="Capacity"
                      required
                      v-model="truck.capacity"
                    >
                    </base-input>
                  </b-col>
                  <b-col md="12">
                    <base-input
                      alternative
                      prepend-icon="ni ni-calendar-grid-58 "
                      label="license Expiry Date"
                    >
                      <flat-picker
                        slot-scope="{ focus, blur }"
                        @on-open="focus"
                        @on-close="blur"
                        :config="{ allowInput: true }"
                        class="form-control datepicker"
                        required
                        v-model="truck.licenseExpiryDate"
                      >
                      </flat-picker>
                    </base-input>
                  </b-col>
                  <b-col md="12">
                    <base-input
                      alternative
                      class="mb-3"
                      type="text"
                      label="Registration No"
                      id="registration no"
                      prepend-icon=" "
                      placeholder="Registration No"
                      required
                      v-model="truck.registrationNo"
                    >
                    </base-input>
                  </b-col>
                  <b-col md="12">
                    <base-input
                      alternative
                      class="mb-3"
                      type="text"
                      label="Price per KM"
                      id="price per km"
                      prepend-icon=" "
                      required
                      placeholder="Price per KM"
                      v-model="truck.priceKM"
                    >
                    </base-input>
                  </b-col>
                  <b-col md="12">
                    <base-input
                      alternative
                      class="mb-3"
                      type="text"
                      label="Return Price per KM"
                      id="return price per km"
                      required
                      prepend-icon=" "
                      placeholder="Return Price per KM"
                      v-model="truck.returnPriceKM"
                    >
                    </base-input>
                  </b-col>
                  <b-col md="12">
                    <base-input
                      alternative
                      class="mb-3"
                      type="text"
                      label="Truck Number"
                      id="truck number"
                      required
                      prepend-icon=" "
                      placeholder="Truck Number"
                      v-model="truck.truckNumber"
                    >
                    </base-input>
                  </b-col>
                  <!-- <b-col md="12">
                    <base-input prepend-icon="" label="License Document">
                      <b-form-file v-model="truck.identityFile"></b-form-file>
                    </base-input>
                  </b-col> -->
                </b-row>
              </div>
              <div class="text-center">
                <base-button type="primary" native-type="submit" class="my-4"
                  >Add truck</base-button
                >
              </div>
            </b-form>
          </card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import axios from "axios";

export default {
  components: {
    flatPicker
  },
  data() {
    return {
      types: ["shipping", "SSSS"],
      locations: ["Cairo", "Mansoura"],
      truck: {
        truckLocation: "",
        type: "",
        capacity: "",
        licenseExpiryDate: "",
        registrationNo: "",
        priceKM: "",
        returnPriceKM: "",
        truckNumber: ""
      }
    };
  },
  methods: {
    // updateData() {
    //   alert("Your data: " + JSON.stringify(this.user));
    // },

    onSubmit() {
      axios
        .post(`http://159.223.27.152/api/truck/`, this.truck, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("truck-user-token")}`
          }
        })
        .then(response => {
          console.log(response);
          this.$router.push({ path: "trucks" });
        })
        .catch(err => {
          console.log(err);
          // this.modals.error = err.response.data.message;
          // this.modals.modal0 = true;
        });
    }
  }
};
</script>
<style></style>
