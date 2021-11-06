<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-9 py-lg-8 pt-lg-9">
      <!-- <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">Welcome!</h1>
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
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-secondary border-0 mb-0">
            <!-- <b-card-header class="bg-transparent pb-5"  >
              <div class="text-muted text-center mt-2 mb-3"><small>Sign in with</small></div>
              <div class="btn-wrapper text-center">
                <a href="#" class="btn btn-neutral btn-icon">
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
                <small>Or sign in with credentials</small>
              </div> -->
              <validation-observer
                v-slot="{ handleSubmit }"
                ref="formValidator"
              >
                <b-form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input
                    alternative
                    class="mb-3"
                    name="Email"
                    :rules="{ required: true, email: true }"
                    prepend-icon="ni ni-email-83"
                    placeholder="Email"
                    v-model="model.email"
                  >
                  </base-input>

                  <base-input
                    alternative
                    class="mb-3"
                    name="Password"
                    :rules="{ required: true, min: 6 }"
                    prepend-icon="ni ni-lock-circle-open"
                    type="password"
                    placeholder="Password"
                    v-model="model.password"
                  >
                  </base-input>

                  <!-- <b-form-checkbox v-model="model.rememberMe">Remember me</b-form-checkbox> -->
                  <div class="text-center">
                    <base-button
                      type="primary"
                      native-type="submit"
                      class="my-4"
                      >Sign in</base-button
                    >
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
          <b-row class="mt-3">
            <b-col cols="6">
              <!-- <router-link to="/dashboard" class="text-light"
                ><small>Forgot password?</small></router-link
              > -->
            </b-col>
            <b-col cols="6" class="text-right">
              <router-link to="/register" class="text-light"
                ><small>Create new account</small></router-link
              >
            </b-col>
          </b-row>
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
  components: {
    Modal,
    loader
  },
  data() {
    return {
      model: {
        email: "",
        password: ""
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
      this.loader = true;
      axios({
        method: "post",
        url: `https://truckstation.info/api/auth/signin`,
        data: { ...this.model }
      })
        .then(result => {
          localStorage.setItem("truck-user-token", result.data.token);
          localStorage.setItem("truck-user-type", result.data.type);
          this.$store.state.userType = result.data.type;
          localStorage.setItem(
            "truck-user",
            JSON.stringify({
              name: result.data.name,
              email: result.data.email,
              docs: result.data.docs,
              img:
                "https://pbs.twimg.com/profile_images/1389705406683942914/Qv3ml2Rt_400x400.jpg"
            })
          );
          this.$store.state.user = {
            name: result.data.name,
            email: result.data.email,
            docs: result.data.docs,
            img:
              "https://pbs.twimg.com/profile_images/1389705406683942914/Qv3ml2Rt_400x400.jpg"
          };

          this.$router.push({ path: "dashboard" });
          axios
            .get(
              `https://truckstation.info/api/static/cities`,

              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "truck-user-token"
                  )}`
                }
              }
            )
            .then(response => {
              this.$store.state.cities = response.data.cities;
            })
            .catch(err => {
              console.log(err);
              // this.modals.error = err.response.data.message;
              // this.modals.modal0 = true;
            });
          axios
            .get(
              `https://truckstation.info/api/static/cars`,

              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "truck-user-token"
                  )}`
                }
              }
            )
            .then(response => {
              this.$store.state.types = response.data.types;
            })
            .catch(err => {
              console.log(err);
              // this.modals.error = err.response.data.message;
              // this.modals.modal0 = true;
            });
        })
        .catch(err => {
          this.modals.error = err.response.data.message;
          this.modals.modal0 = true;
          this.loader = false;
        });

      // this will be called only after form is valid. You can do api call here to login
    }
  }
};
</script>
