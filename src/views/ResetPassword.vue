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
                <h3 class="mb-0">Reset Password</h3>
              </b-col>
              <!-- <b-col cols="4" class="text-right">
                <a href="#!" class="btn btn-sm btn-primary">Settings</a>
              </b-col> -->
            </b-row>

            <b-form @submit.prevent="onSubmit">

              <div class="pl-lg-4">
                <b-row>
                  <b-col md="12">
                    <base-input
                      alternative
                      class="mb-3"
                      type="text"
                      label="Old Password"
                      id="Old Password"
                      prepend-icon=" "
                      placeholder="Old Password"
                      :rules="{ required: true }"
                      required
                    >
                    </base-input>
                  </b-col>
                  <b-col md="12">
                    <base-input
                      alternative
                      class="mb-3"
                      type="text"
                      label="New Password"
                      id="New Password"
                      prepend-icon=" "
                      placeholder="New Password"
                      :rules="{ required: true }"
                      required
                    >
                    </base-input>
                  </b-col>
                  <b-col md="12">
                    <base-input
                      alternative
                      class="mb-3"
                      type="text"
                      label="Password Confirmation "
                      id="Password Confirmation "
                      prepend-icon=" "
                      placeholder="Password Confirmation "
                      :rules="{ required: true }"
                      required
                    >
                    </base-input>
                  </b-col>
                </b-row>
              </div>
              <div class="text-center">
                <base-button type="primary" native-type="submit" class="my-4"
                  >Change Password</base-button
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
import axios from "axios";

export default {
  components: {},
  data() {
    return {
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
    onSubmit() {}
  }
};
</script>
<style></style>
