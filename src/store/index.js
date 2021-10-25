import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    lang: "",
    userType: localStorage.getItem("truck-user-type"),

    cities: [],
    citiesID: [],
    types: [],
    typesID: [],
    user: {
      name: "Ahmed Alaa",
      img:
        "https://pbs.twimg.com/profile_images/1389705406683942914/Qv3ml2Rt_400x400.jpg"
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});
