<template>
  <div>
    <div
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
      style="min-height: 200px;  background-size: cover; background-position: center top;"
    >
      <span class="mask bg-gradient-success opacity-8"></span>
    </div>

    <b-container fluid class="mt--6">
      <b-row>
        <b-col class="order-xl-1">
          <card>
            <b-row align-v="center" slot="header">
              <b-col cols="8">
                <h3 class="mb-0">Update Driver</h3>
              </b-col>
              <!-- <b-col cols="4" class="text-right">
                <a href="#!" class="btn btn-sm btn-primary">Settings</a>
              </b-col> -->
            </b-row>

            <b-form @submit.prevent="onSubmit">
              <h6 class="heading-small text-muted mb-4">Driver information</h6>

              <div class="pl-lg-4">
                <b-row>
                  <b-col md="12">
                    <base-input
                      alternative
                      class="mb-3"
                      type="text"
                      label="Driver Name"
                      prepend-icon=" "
                      placeholder="Driver Name"
                      v-model="driver.name"
                    >
                    </base-input>
                  </b-col>
                  <b-col md="4">
                    <base-input
                      alternative
                      class="mb-3"
                      prepend-icon="ni ni-mobile-button"
                      placeholder="Key"
                      type="tel"
                      label="Key"
                      name="key"
                      :rules="{
                        required: true,
                        numeric: true
                      }"
                      v-model="key"
                    >
                    </base-input>
                  </b-col>
                  <b-col md="8">
                    <base-input
                      alternative
                      class="mb-3"
                      prepend-icon="ni ni-mobile-button"
                      placeholder="Phone"
                      type="tel"
                      name="phone"
                      label="Phone"
                      :rules="{
                        required: true,
                        numeric: true
                      }"
                      v-model="phone"
                    >
                    </base-input>
                  </b-col>
                  <b-col lg="12">
                    <base-input
                      alternative
                      class="mb-3"
                      prepend-icon="ni ni-mobile-button"
                      type="email"
                      label="Email address"
                      placeholder="Email address"
                      v-model="driver.email"
                    >
                    </base-input>
                  </b-col>
                  <b-col md="12">
                    <base-input
                      alternative
                      class="mb-3"
                      type="text"
                      label="License No"
                      prepend-icon=" "
                      placeholder="License No"
                      v-model="driver.licenseNo"
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
                        v-model="driver.licenseEndDate"
                      >
                      </flat-picker>
                    </base-input>
                  </b-col>

                  <b-col md="12">
                    <base-input
                      alternative
                      class="mb-3"
                      type="text"
                      label="Identity No"
                      prepend-icon=" "
                      placeholder="Identity No"
                      v-model="driver.identityNo"
                    >
                    </base-input>
                  </b-col>
                  <b-col md="12">
                    <base-input
                      alternative
                      prepend-icon="ni ni-calendar-grid-58 "
                      label="Identity End Date"
                    >
                      <flat-picker
                        slot-scope="{ focus, blur }"
                        @on-open="focus"
                        @on-close="blur"
                        :config="{ allowInput: true }"
                        class="form-control datepicker"
                        v-model="driver.identityEndDate"
                      >
                      </flat-picker>
                    </base-input>
                  </b-col>
                </b-row>
              </div>
              <div class="text-center">
                <base-button type="primary" native-type="submit" class="my-4"
                  >Update driver</base-button
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

      key: "966",
      phone: "",
      driver: {
        name: "",
        phone: "",
        email: "",
        licenseNo: "",
        licenseEndDate: "",
        identityNo: "",
        identityEndDate: ""
      }
    };
  },
  methods: {
    onSubmit() {
      let data = {
        id: this.driver.id.toString(10),
        email: this.driver.email,
        name: this.driver.name,
        licenseNo: this.driver.licenseNo,
        licenseEndDate: this.driver.licenseEndDate,
        identityNo: this.driver.identityNo,
        identityEndDate: this.driver.identityEndDate
      };
      data.phone = this.key + this.phone;
      axios
        .put(
          `http://159.223.27.152/api/driver/`,
          data,

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
          this.$router.push({ path: "/drivers" });
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    //****************************** getting drivers ******************************

    axios
      .get(`http://159.223.27.152/api/driver/${this.$route.params.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("truck-user-token")}`
        }
      })
      .then(response => {
        this.driver = response.data.data;
        this.loader = false;
      });
  }
};
</script>
<style></style>
