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
          <b-col cols="6" class="mt-1">
            <label class="form-control-label">Agreement</label>
            <!-- {{ $store.state.docs.agreement }} -->
            <vue-dropzone
              v-if="!$store.state.user.docs.agreement[0]"
              ref="myVueDropzone"
              id="dropzone"
              :options="dropzoneAgreementOptions"
            ></vue-dropzone>
            <div v-else>
              <a
                v-for="(doc, i) in $store.state.user.docs.agreement"
                :key="doc.id"
                :href="doc.link"
                target="_blank"
                class="file-link"
                >{{ `agreement ${i + 1}` }}</a
              >
            </div>
          </b-col>
          <b-col cols="6" class="mt-1">
            <label class="form-control-label">CR</label>
            <!-- {{ $store.state.docs.CR }} -->
            <vue-dropzone
              v-if="!$store.state.user.docs.CR[0]"
              ref="myVueDropzone"
              id="dropzone2"
              :options="dropzoneCROptions"
            ></vue-dropzone>
            <div v-else>
              <a
                v-for="(doc, i) in $store.state.user.docs.CR"
                :key="doc.id"
                :href="doc.link"
                target="_blank"
                class="file-link"
                >{{ `CR ${i + 1}` }}</a
              >
            </div>
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
import axios from "axios";
export default {
  components: {
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      dropzoneAgreementOptions: {
        url: "https://truckstation.info/api/transporter/upload",
        paramName: "agreement",
        thumbnailWidth: 90,
        maxFilesize: 2,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("truck-user-token")}`
        }
      },
      dropzoneCROptions: {
        url: "https://truckstation.info/api/transporter/upload",
        paramName: "CR",
        thumbnailWidth: 150,
        maxFilesize: 2,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("truck-user-token")}`
        }
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
    };
  },
  methods: {
    updateProfile() {
      alert("Your data: " + JSON.stringify(this.user));
    }
  },
  mounted() {
    axios
      .get(`https://truckstation.info/api/transporter/upload`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("truck-user-token")}`
        }
      })
      .then(response => {
        console.log(response);
        localStorage.setItem(
          "truck-user-docs",
          JSON.stringify(response.data.files)
        );
        this.$store.state.docs = response.data.files;
      });
  }
};
</script>
<style>
.dropzone {
  padding: 10px;
}
.vue-dropzone > .dz-preview .dz-image {
  height: 90px;
}
.file-link {
  padding: 5px;
  background-color: #5e72e4;
  color: white;
  margin: 5px;
  display: inline-block;
  border-radius: 10px;
  min-height: 35px;
  text-align: center;
}
</style>
