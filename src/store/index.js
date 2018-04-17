import Vue from 'vue'
import Vuex from 'vuex'
import city from './city'
import loading from './loading'
import coming from './coming'
import video from './video'
import cinama from './cinama'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    city,
    loading,
    coming,
    video,
    cinama
  }
})
