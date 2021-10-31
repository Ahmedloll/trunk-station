<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-9 py-lg-8 pt-lg-9">
      <!-- <b-container class="container">
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">Create an account</h1>
              <p class="text-lead text-white">Use these awesome forms to login or create new account in your project for
                free.</p>
            </b-col>
          </b-row>
        </div>
      </b-container> -->
      <!-- <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            class="fill-default"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div> -->
    </div>
    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <!-- Table -->
      <b-row class="justify-content-center">
        <b-col lg="6" md="8">
          <b-card no-body class="bg-secondary border-0">
            <!-- <b-card-header class="bg-transparent pb-5">
              <div class="text-muted text-center mt-2 mb-4"><small>Sign up with</small></div>
              <div class="text-center">
                <a href="#" class="btn btn-neutral btn-icon mr-4">
                  <span class="btn-inner--icon"><img src="img/icons/common/github.svg"></span>
                  <span class="btn-inner--text">Github</span>
                </a>
                <a href="#" class="btn btn-neutral btn-icon">
                  <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                  <span class="btn-inner--text">Google</span>
                </a>
              </div>
            </b-card-header> -->
            <b-card-body class="px-lg-5 py-lg-5">
              <!-- <div class="text-center text-muted mb-4">
                <small>Or sign up with credentials</small>
              </div> -->
              <h1>Register Now!</h1>
              <validation-observer
                v-slot="{ handleSubmit }"
                ref="formValidator"
              >
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <b-row>
                    <b-col md="12">
                      <div class="radio-wrapper">
                        <input
                          type="radio"
                          required
                          id="sender"
                          value="sender"
                          name="type"
                          v-model="model.type"
                        />
                        <label for="sender">
                          <img src="../../assets/avatar.png" />
                          <div>Sender</div>
                        </label>
                      </div>
                      <div class="radio-wrapper">
                        <input
                          type="radio"
                          required
                          id="transporter"
                          value="transporter"
                          name="type"
                          v-model="model.type"
                        />
                        <label for="transporter">
                          <img src="../../assets/avatar.png" />
                          <div>Transporter</div>
                        </label>
                      </div>
                    </b-col>
                    <!-- <b-col md="12">
                      <b-form-group>
                        <b-form-radio
                          class="custom-control-inline radio-wrapper"
                          name="user-type"
                          value="sender"
                          v-model="model.type"
                          required
                          :rules="{ required: true }"
                        >
                          <img src="../../assets/avatar.png" alt="user icon" />
                          <div>Sender</div>
                        </b-form-radio>
                        <b-form-radio
                          class="custom-control-inline"
                          name="user-type"
                          value="transporter"
                          v-model="model.type"
                          required
                          :rules="{ required: true }"
                        >
                          <img src="../../assets/truck.png" alt="user icon" />
                          Transporter</b-form-radio
                        >
                      </b-form-group>
                    </b-col> -->
                    <b-col md="12">
                      <base-input
                        alternative
                        class="mb-3"
                        prepend-icon="ni ni-hat-3"
                        placeholder="Name"
                        name="Name"
                        :rules="{ required: true }"
                        v-model="model.name"
                      >
                      </base-input>
                    </b-col>
                    <b-col md="12">
                      <base-input
                        alternative
                        class="mb-3"
                        prepend-icon="ni ni-email-83"
                        placeholder="Email"
                        name="Email"
                        :rules="{ required: true, email: true }"
                        v-model="model.email"
                      >
                      </base-input>
                    </b-col>
                    <b-col md="12">
                      <base-input
                        alternative
                        class="mb-3"
                        prepend-icon="ni ni-lock-circle-open"
                        placeholder="password"
                        type="password"
                        name="Password"
                        :rules="{ required: true, min: 6 }"
                        v-model="model.password"
                      >
                      </base-input>
                    </b-col>

                    <b-col md="12">
                      <base-input
                        alternative
                        class="mb-3"
                        prepend-icon="ni ni-lock-circle-open"
                        placeholder="Confirm password"
                        type="password"
                        name="password Confirmation"
                        :rules="{
                          confirmed: model.password !== model.confirm_Password,
                          required: true
                        }"
                        v-model="model.confirm_Password"
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
                        name="key"
                        :rules="{
                          required: true,
                          numeric: true
                        }"
                        v-model="model.key"
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
                        :rules="{
                          required: true,
                          numeric: true
                        }"
                        v-model="model.phone"
                      >
                      </base-input>
                    </b-col>
                  </b-row>

                  <!-- <div class="text-muted font-italic"><small>password strength: <span
                    class="text-success font-weight-700">strong</span></small></div> -->
                  <!-- <b-row class=" my-4">
                    <b-col cols="12">
                      <base-input :rules="{ required: { allowFalse: false } }" name=Privacy Policy>
                        <b-form-checkbox v-model="model.agree">
                          <span class="text-muted">I agree with the <a href="#!">Privacy Policy</a></span>
                        </b-form-checkbox>
                      </base-input>
                    </b-col>
                  </b-row> -->
                  <div class="text-center">
                    <b-button type="submit" variant="primary" class="mt-4"
                      >Create account</b-button
                    >
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
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
    <loader v-if="loader" />
  </div>
</template>
<script>
import axios from "axios";
import { Modal } from "@/components";
import loader from "../../components/Loader.vue";

export default {
  name: "register",
  components: {
    Modal,
    loader
  },
  data() {
    return {
      model: {
        type: "",
        name: "",
        email: "",
        password: "",
        confirm_Password: "",
        key: "966",
        phone: ""
      },
      modals: {
        modal0: false,
        error: ""
      },
      loader: false
    };
  },
  methods: {
    onSubmit() {
      // this will be called only after form is valid. You can do an api call here to register users
      this.loader = true;

      let data = {
        name: this.model.name,
        email: this.model.email,
        password: this.model.password,
        phone: this.model.key + this.model.phone,
        type: this.model.type
      };

      axios({
        method: "post",
        url: `https://truckstation.info/api/auth/signup`,
        data: data
      })
        .then(result => {
          console.log(result);
          this.$router.push({ path: "login" });
        })
        .catch(err => {
          this.modals.error = err.response.data.err;
          this.modals.modal0 = true;
          this.loader = false;
        });
      // this will be called only after form is valid. You can do api call here to login
    }
  }
};
</script>
<style lang="scss" scoped>
.custom-control-inline img {
  width: 30px;
}
.radio-wrapper {
  display: inline-block;
  input[type="radio"] {
    opacity: 0;
    + label {
      width: 140px;
      margin-top: 10px;
      display: inline-block;
      padding: 20px 10px;
      text-align: center;
      transition: all 0.15s ease-in-out;
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
