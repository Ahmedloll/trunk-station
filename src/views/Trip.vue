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
                <h3 class="mb-0">Update Trip</h3>
              </b-col>
              <!-- <b-col cols="4" class="text-right">
                <a href="#!" class="btn btn-sm btn-primary">Settings</a>
              </b-col> -->
            </b-row>

            <b-form @submit.prevent="onSubmit">
              <h6 class="heading-small text-muted mb-4">Trip information</h6>

              <div class="pl-lg-4">
                <b-row>
                  <b-col md="12">
                    <base-input
                      prepend-icon=""
                      label="Truck Type"
                      alternative
                      required
                      class="mb-3"
                    >
                      <b-form-select
                        :options="$store.state.types"
                        value-field="id"
                        text-field="name"
                        v-model="trip.truckType"
                        required
                      ></b-form-select>
                    </base-input>
                  </b-col>
                  <b-col md="12">
                    <base-input
                      prepend-icon=""
                      label="From"
                      alternative
                      required
                      class="mb-3"
                    >
                      <b-form-select
                        :options="$store.state.cities"
                        value-field="id"
                        text-field="name"
                        v-model="trip.from"
                        required
                      ></b-form-select>
                    </base-input>
                  </b-col>
                  <b-col md="12">
                    <base-input
                      prepend-icon=""
                      label="To"
                      alternative
                      required
                      class="mb-3"
                    >
                      <b-form-select
                        :options="$store.state.cities"
                        value-field="id"
                        text-field="name"
                        v-model="trip.to"
                        required
                      ></b-form-select>
                    </base-input>
                  </b-col>

                  <b-col lg="12">
                    <base-input
                      alternative
                      class="mb-3"
                      prepend-icon=""
                      type="text"
                      label="Price"
                      id="Price"
                      placeholder="Price"
                      v-model="trip.price"
                      required
                      :rules="{ required: true }"
                    >
                    </base-input>
                  </b-col>

                  <!-- <b-col md="12">
                    <base-input prepend-icon="" label="License Document">
                      <b-form-file v-model="trip.identityFile"></b-form-file>
                    </base-input>
                  </b-col> -->
                </b-row>
              </div>
              <!-- <hr class="my-4" /> -->

              <!-- Address -->
              <!-- <h6 class="heading-small text-muted mb-4">Contact information</h6> -->

              <!-- <div class="pl-lg-4">
                <b-row>
                  <b-col md="12">
                    <base-input
                      type="text"
                      label="Address"
                      placeholder="Home Address"
                      v-model="trip.address"
                    >
                    </base-input>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col lg="4">
                    <base-input
                      type="text"
                      label="City"
                      placeholder="City"
                      v-model="trip.city"
                    >
                    </base-input>
                  </b-col>
                  <b-col lg="4">
                    <base-input
                      type="text"
                      label="Country"
                      placeholder="Country"
                      v-model="trip.country"
                    >
                    </base-input>
                  </b-col>
                  <b-col lg="4">
                    <base-input
                      label="Postal Code"
                      placeholder="ZIP Code"
                      v-model="trip.postalCode"
                    >
                    </base-input>
                  </b-col>
                </b-row>
              </div> -->

              <!-- <hr class="my-4" /> -->
              <!-- Description -->
              <!-- <h6 class="heading-small text-muted mb-4">About me</h6>
              <div class="pl-lg-4">
                <b-form-group
                  label="About Me"
                  label-class="form-control-label"
                  class="mb-0"
                  label-for="about-form-textaria"
                > -->
              <!--  <label class="form-control-label">About Me</label> -->
              <!-- <b-form-textarea
                    rows="4"
                    value="A beautiful premium dashboard for BootstrapVue."
                    id="about-form-textaria"
                    placeholder="A few words about you ..."
                  ></b-form-textarea>
                </b-form-group>
                <div class="text-center">
                  <b-button type="submit" variant="primary" class="mt-4"
                    >Update Data</b-button
                  >
                </div>
              </div> -->
              <div class="text-center">
                <base-button type="primary" native-type="submit" class="my-4"
                  >Update trip</base-button
                >
              </div>
            </b-form>
          </card>
        </b-col>
      </b-row>
    </b-container>
    <loader v-if="loader" />
  </div>
</template>

<script>
import flatPicker from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";
import axios from "axios";
import loader from "../components/Loader.vue";

export default {
  components: { loader, flatPicker },
  data() {
    return {
      loader: true,
      types: ["shipping", "SSSS", "truck"],
      locations: ["Cairo", "Mansoura", "alex"],
      trip: {}
    };
  },
  methods: {
    onSubmit() {
      let data = {
        id: this.trip.id.toString(10),
        truckType: this.trip.truckType,
        from: this.trip.from,
        to: this.trip.to,
        price: this.trip.price
      };
      axios
        .put(`http://159.223.27.152/api/fixedTrip/`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("truck-user-token")}`
          }
        })
        .then(response => {
          console.log(response);
          this.$router.push({ path: "/trips" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    //****************************** getting drivers ******************************

    axios
      .get(`http://159.223.27.152/api/fixedTrip/${this.$route.params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("truck-user-token")}`
        }
      })
      .then(response => {
        this.trip = response.data.trip;
        this.trip.truckType = this.trip.truckType.id;
        this.trip.from = this.trip.from.id;
        this.trip.to = this.trip.to.id;
        this.loader = false;
      });
  }
};
</script>
<style></style>
