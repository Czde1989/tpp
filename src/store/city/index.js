import cityMutations from './mutations'
import cityActions from './actions'

export default {
  state: {
    name: '北京',
    show: false,
    rN: 'bj',
    data: []
  },
  getters: {
    hotLists: state => state.data,
    cityName: state => state.name
  },
  actions: cityActions,
  mutations: cityMutations
}
