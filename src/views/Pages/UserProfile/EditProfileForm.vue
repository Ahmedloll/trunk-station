<template>
  <card>
    <b-row align-v="center" slot="header">
      <b-col cols="8">
        <h3 class="mb-0">{{ $t("User Profile") }}</h3>
      </b-col>
      <!-- <b-col cols="4" class="text-right">
        <a href="#!" class="btn btn-sm btn-primary">Settings</a>
      </b-col> -->
    </b-row>

    <b-form @submit.prevent="updateProfile">
      <h6 class="heading-small text-muted mb-4">
        {{ $t("User information") }}
      </h6>

      <div class="pl-lg-4">
        <b-row>
          <b-col lg="12">
            <base-input
              type="text"
              :label="$t('User Name')"
              :placeholder="$t('User Name')"
              v-model="user.username"
            >
            </base-input>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="12">
            <base-input
              type="text"
              :label="$t('P.O. Box')"
              :placeholder="$t('P.O. Box')"
              v-model="user.poBox"
            >
            </base-input>
          </b-col>
          <b-col lg="12">
            <base-input
              type="email"
              :label="$t('Email address')"
              :placeholder="$t('Email address')"
              v-model="user.email"
            >
            </base-input>
          </b-col>
          <b-col lg="4">
            <base-input
              alternative
              class="mb-3"
              prepend-icon="ni ni-mobile-button"
              :label="$t('Key')"
              :placeholder="$t('Key')"
              type="tel"
              name="key"
              :rules="{
                required: true,
                numeric: true
              }"
              v-model="user.key"
            >
            </base-input>
          </b-col>
          <b-col lg="8">
            <base-input
              alternative
              class="mb-3"
              prepend-icon="ni ni-mobile-button"
              :placeholder="$t('Phone')"
              :label="$t('Phone')"
              type="tel"
              name="phone"
              :rules="{
                required: true,
                numeric: true
              }"
              v-model="user.phone"
            >
            </base-input>
          </b-col>
          <b-col lg="12">
            <base-input
              alternative
              class="mb-3"
              prepend-icon="ni ni-mobile-button"
              :label="$t('Fax')"
              :placeholder="$t('Fax')"
              type="tel"
              name="phone"
              :rules="{
                required: true,
                numeric: true
              }"
              v-model="user.phone"
            >
            </base-input>
          </b-col>
          <b-col md="12">
            <base-input
              alternative
              type="text"
              :label="$t('Address')"
              :placeholder="$t('Address')"
              v-model="user.address"
            >
            </base-input>
          </b-col>
          <b-col cols="12">
            <vue-dropzone
              ref="myVueDropzone"
              id="dropzone"
              :options="dropzoneOptions"
              v-model="file"
            ></vue-dropzone>
          </b-col>
        </b-row>
      </div>

      <div class="text-center">
        <b-button type="submit" variant="primary" class="mt-4">{{
          $t("Update account")
        }}</b-button>
      </div>
    </b-form>
  </card>
</template>
<script>
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 150,
        maxFilesize: 0.5,
        headers: { "My-Awesome-Header": "header value" }
      },
      file: [],
      user: {
        company: "",
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        country: "",
        postalCode: "",
        aboutMe: ""
      }
      // user: {
      //   company: "Creative Code Inc.",
      //   username: "michael23",
      //   email: "",
      //   firstName: "Mike",
      //   lastName: "Andrew",
      //   address: "Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09",
      //   city: "New York",
      //   country: "USA",
      //   postalCode: "",
      //   aboutMe: `Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo.`
      // }
    };
  },
  methods: {
    updateProfile() {
      alert("Your data: " + JSON.stringify(this.user));
    }
  }
};
</script>
<style></style>
