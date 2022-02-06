export default {
  actions: {
    earnToday(context: any, money: number) {
      context.commit('addCurrent', {money});
      context.commit('addToday', {money});
    },
  },
  getters: {},
  mutations: {
    removeCurrent(state: any, payload: {money: number}) {
      state.current -= payload.money;
    },
    addCurrent(state: any, payload: {money: number}) {
      state.current += payload.money;
    },
    addToday(state: any, payload: {money: number}) {
      state.today += payload.money;
    },
    resetToday(state: any) {
      state.today = 0;
    },
  },
  namespaced: true,
  state: () => ({
    current: 0,
    today: 0,
  }),
};
