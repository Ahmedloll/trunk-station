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
                        <flat-picker
                          slot-scope="{ focus, blur }"
                          @on-open="focus"
                          @on-close="blur"
                          :config="{ allowInput: true }"
                          required
                          class="form-control datepicker"
                          v-model="date"
                        >
                        </flat-picker>
                      </base-input>
                    </b-col>
                    <b-col md="6">
                      <base-input
                        alternative
                        prepend-icon="ni ni-time-alarm"
                        label="Pickup time"
                        required
                      >
                        <flat-picker
                          slot-scope="{ focus, blur }"
                          @on-open="focus"
                          @on-close="blur"
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
                        </flat-picker>
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
                          :value="`${type.id}`"
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
                        v-model="text"
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
                        v-model="text"
                      >
                      </base-input>
                    </b-col>
                    <b-col cols="12">
                      <base-input
                        alternative
                        class="mb-3"
                        prepend-icon=""
                        label="Description"
                        v-model="text"
                      >
                        <textarea
                          class="form-control form-control-alternative"
                          rows="3"
                          placeholder="Description"
                          v-model="text"
                          id="Description"
                          required
                        ></textarea>
                      </base-input>
                    </b-col>
                  </b-row>
                </tab-content>
                <tab-content title="Location">
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
                          required
                        ></b-form-select>
                      </base-input>
                    </b-col>
                    <b-col cols="12">
                      
                    </b-col>
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
                          required
                        ></b-form-select>
                      </base-input>
                    </b-col>
                  </b-row>
                </tab-content>
                <tab-content title="Transporter">
                  Yuhuuu! This seems pretty damn simple
                </tab-content>
                <tab-content title="Reciver">
                  Yuhuuu! This seems pretty damn simple
                </tab-content>
                <tab-content title="Review">
                  Yuhuuu! This seems pretty damn simple
                </tab-content>
                <template slot="footer" slot-scope="props">
                  <div class="wizard-footer-left">
                    <wizard-button
                      v-if="props.activeTabIndex > 0 && !props.isLastStep"
                      @click.native="props.prevTab()"
                      :style="props.fillButtonStyle"
                      >{{ $t("Back") }}</wizard-button
                    >
                  </div>
                  <div class="wizard-footer-right">
                    <wizard-button
                      v-if="!props.isLastStep"
                      @click.native="
                        props.nextTab();
                        nextStep(props.activeTabIndex);
                      "
                      class="wizard-footer-right"
                      :style="props.fillButtonStyle"
                      >{{ $t("Next") }}</wizard-button
                    >

                    <wizard-button
                      v-else
                      @click.native="step1()"
                      class="wizard-footer-right finish-button"
                      :style="props.fillButtonStyle"
                    >
                      {{ $t("Done") }}</wizard-button
                    >
                  </div>
                </template>
              </form-wizard>
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
// import axios from "axios";

export default {
  components: {
    flatPicker
  },
  data() {
    return {
      types: ["Ton", "KG"],
      date: "",
      time: "",
      text: "",
      radio: ""
    };
  },
  methods: {
    nextStep(index) {
      console.log(index);
    }

    // onSubmit() {
    //   axios
    //     .post(`https://truckstation.info/api/truck/`, this.truck, {
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("truck-user-token")}`
    //       }
    //     })
    //     .then(response => {
    //       console.log(response);
    //       this.$router.push({ path: "trucks" });
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       // this.modals.error = err.response.data.message;
    //       // this.modals.modal0 = true;
    //     });
    // }
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
</style>
