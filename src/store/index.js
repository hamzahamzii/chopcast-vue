import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: {},
    selectedLanguage: { label: "English", value: "en" },
  },
  getters: {
    getData: (state) => state.data,
    getSelectedLanguage: (state) => state.selectedLanguage,
  },
  mutations: {
    setData(state, payload) {
      state.data = payload;
    },
    setSelectedLanguage(state, payload) {
      state.selectedLanguage = payload;
    },
  },
  actions: {
    saveData({ commit }, payload) {
      commit("setData", payload);
    },
  },
  modules: {},
});
