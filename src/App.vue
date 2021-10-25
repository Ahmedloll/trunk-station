<template>
  <router-view></router-view>
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    document.querySelector("html").setAttribute("lang", this.$i18n.locale);
    if (localStorage.getItem("truck-user-token")) {
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
    }
  }
};
</script>
<style lang="scss">
.bg-default {
  background-color: white !important;
}

@media screen and (max-width: 767.98px) {
  .navbar-collapse .side-item .nav-link {
    margin-left: 25px;
  }
}

html[lang="ar"] {
  body {
    direction: rtl;
    text-align: right;
  }
  .navbar-expand .navbar-nav .nav-link {
    padding-right: 1rem !important;
    padding-left: 0;
  }
  .media-body.ml-2.d-none.d-lg-block {
    margin-left: 0rem !important;
    margin-right: 0.5rem !important;
  }
  .nav-link-text {
    margin-right: 10px;
  }
  .dropdown-menu-right {
    left: 0;
    right: auto;
  }
  .dropdown-menu .dropdown-item {
    text-align: right;
  }
  .dropdown-menu .dropdown-item > i {
    margin-right: 0rem;
    margin-left: 1rem;
  }
  .dropdown-header h6.text-overflow.m-0 {
    text-align: right;
  }

  @media screen and (min-width: 768px) {
    .navbar-vertical.navbar-expand-md.fixed-left {
      right: 0;
      left: unset;
    }
    .navbar-vertical.navbar-expand-md.fixed-left + .main-content {
      margin-right: 250px;
      margin-left: unset;
    }
    .navbar-vertical.navbar-expand-md .navbar-nav .nav-link.active:before {
      right: 0;
      left: auto;
    }
    .navbar-vertical.navbar-expand-md .navbar-nav {
      padding: 0;
    }
  }
  @media screen and (max-width: 767.98px) {
    .navbar-collapse .collapse-close {
      text-align: left;
    }
  }
  @media screen and (max-width: 767.98px) {
    .navbar-collapse .side-item .nav-link {
      margin-left: 0px;
      margin-right: 25px;
    }
  }
}
</style>
