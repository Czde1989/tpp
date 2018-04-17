<template>
  <section class="mask video-mask" v-show="showMask" @click="cancelMask">
    <div class="video-box pa">
      <div class="v-cover">
        <video :src="getVideoUrl" ref="video" class="v-content" :poster="getVideoCover"></video>
      </div>
      <div class="v-icon pa" @click="videoStar" v-if="showIcon"></div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'play-video',
  data () {
    return {
      showIcon: true
    }
  },
  computed: mapGetters([
    'showMask',
    'getVideoUrl',
    'getVideoCover'
  ]),
  methods: {
    ...mapMutations([
      'pauseVideo'
    ]),
    cancelMask (event) {
      if (event.target.className === 'mask video-mask') {
        this.videoStop()
        this.pauseVideo()
      }
    },
    videoStar () {
      this.showIcon = false
      let video = this.$refs.video
      video.play()
    },
    videoStop () {
      this.showIcon = true
      let video = this.$refs.video
      video.pause()
    }
  },
  mounted () {
    let video = this.$refs.video
    video.onended = () => {
      this.showIcon = true
    }
  }
}
</script>

<style scoped>
.video-box {
  width: 100%;
  height: 200px;
  top: 20%;
  padding: 0 20px;
  box-sizing: border-box;
}
.v-cover {
  height: 100%;
  background-color: #000;
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: center;
}
.v-icon {
  width: 90px;
  height: 90px;
  left: 50%;
  top: 50%;
  margin-left: -45px;
  margin-top: -45px;
  background: url('../../assets/images/sprite.png') -2px -2px no-repeat;
}
.v-content {
  width: 100%;
  height: 100%;
}
</style>
