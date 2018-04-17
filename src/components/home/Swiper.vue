<template>
  <div id="swiper" class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in imgs" :key="index">
        <img :src="'https://gw.alicdn.com/tfs/' + item.smallPicUrl" alt="">
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'swiper',
  data () {
    return {}
  },
  props: {
    imgs: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    imgs () {
      this.$nextTick(() => {
        /* eslint-disable */
        const swiper = new Swiper('.swiper-container', {
          loop: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          autoplay: 2000,
          autoplayDisableOnInteraction: false
        })
      })
    }
  }
}
</script>

<style>
  img {
    width: 100%;
    height: auto;
  }
  #swiper .swiper-pagination-bullet {
    background: #e5e8e8;
    opacity: 1;
  }
  #swiper .swiper-pagination-bullet-active {
    background: #ff5733;
  }
</style>
