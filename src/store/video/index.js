import mutations from './mutations'
export default {
  state: {
    url: '',
    cover: '',
    playStatus: false
  },
  mutations: mutations,
  getters: {
    showMask: state => state.playStatus,
    getVideoUrl: state => state.url,
    getVideoCover: state => state.cover
  }
}
