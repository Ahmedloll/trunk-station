import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lang: "",
    userType: localStorage.getItem("truck-user-type"),
    user: JSON.parse(localStorage.getItem("truck-user")),

    cities: [],
    citiesID: [],
    types: [],
    typesID: []
  },
  mutations: {},
  actions: {},
  modules: {}
});
