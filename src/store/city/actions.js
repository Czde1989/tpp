import { UPDATECITY } from './type'
// import { mapMutations } from 'vuex'

import axios from 'axios'

export default {
  updateCityAsync ({commit, state}, {city}) {
    if (!city.name) {
      city.name = state.name
      city.rN = state.rN
    }
    return axios.get(`/movie/hot/?city=${city.rN}`).then(res => {
      let data = res.data
      let lists = data.data.data.returnValue
      lists.forEach((item, index) => {
        item.mID = index
      })
      city.data = lists
      commit(UPDATECITY, {city})
    })
  }
}
