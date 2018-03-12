import * as types from "../mutation-types";

// initial state
const state = {
  userInfo: { login: false },
  loginStatus: JSON.parse(localStorage.getItem("loginStatus")) || false
};

// getters
const getters = {
  isUserLogin: state => state.userInfo.login
};

// actions
const actions = {
  saveUserLogin({ commit }, status) {
    localStorage.setItem("userInfo", true);
    commit(types.SAVE_USERIFO, status);
  },
  removeUserLogin({ commit }, status) {
    localStorage.setItem("userInfo", false);
    commit(types.REMOVE_USERIFO, status);
  }
};

// mutations
const mutations = {
  [types.SAVE_USERIFO](state, status) {
    state.userInfo.login = true;
  },
  [types.REMOVE_USERIFO](state, status) {
    state.userInfo.login = false;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
