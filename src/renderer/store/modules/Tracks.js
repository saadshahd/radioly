const state = {
  local: [],
};

const mutations = {
  SET_LOCAL(state, items) {
    state.local = items;
  },
};

const actions = {
  setLocal({ commit }, items) {
    commit('SET_LOCAL', items);
  },
};

export default {
  state,
  mutations,
  actions,
  namespaced: true,
};
