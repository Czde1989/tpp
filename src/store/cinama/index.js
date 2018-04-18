import cinamaMutations from './mutations'

export default {
  state: {
    area: []
  },
  mutations: cinamaMutations,
  getters: {
    cinamaArea: (state) => {
      return state.area
    }
  }
}
