<template>
  <section style="margin-top: 40px" :class="{mask: showArea}" @click="cancelArea">
    <header class="cm-header pf">
      <div class="mint-1px-r" @click="showCityList">
        <span>{{cityName}}</span>
        <span class="city-arrow-icon vm"></span>
      </div>
      <div @click="showAreaAction">
        <span>{{area}}</span>
        <span class="city-arrow-icon vm"></span>
      </div>
    </header>
    <ul class="area-item" v-show="showArea" @click="selectAreaAction">
      <li>全部区域 ({{allArea.length}})</li>
      <li v-for="(item, index) in regionOrder" :key="index">
        {{item}} ({{regionCinemas[item].length}})
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: 'cinama-area',
  data () {
    return {
      area: '全部区域',
      showArea: false,
      allArea: [],
      regionOrder: [],
      regionCinemas: {}
    }
  },
  computed: mapGetters([
    'cityName'
  ]),
  methods: {
    ...mapMutations([
      'pushLoadStack',
      'completeLoad',
      'showCityList',
      'updateAreaData'
    ]),
    matchCityStr (name) {
      let cityRN = ['bj', 'sh', 'gz'][Math.floor(3 * Math.random())]
      switch (name) {
        case '北京': return 'bj'
        case '上海': return 'sh'
        case '广州': return 'gz'
        default: return cityRN
      }
    },
    getAreaData (city) {
      let cityStr = this.matchCityStr(city)
      this.allArea = []
      this.pushLoadStack()
      axios.get(`/movie/cinema/?city=${cityStr}`).then(res => {
        let data = res.data.data.data.returnValue
        let regionOrder = data.regionOrder
        let regionCinemas = data.regionCinemas
        this.regionOrder = regionOrder
        this.regionCinemas = regionCinemas
        regionOrder.forEach((item) => {
          regionCinemas[item].forEach((cinema) => {
            this.allArea.push(cinema)
          })
        })
      }).then(this.completeLoad)
    },
    selectAreaAction (evt) {
      let str = evt.target.innerHTML.trim()
      this.area = str.split(' (')[0]
      this.showArea = false
      document.documentElement.style.overflow = 'scroll'
    },
    showAreaAction () {
      this.showArea = true
      document.documentElement.style.overflow = 'hidden'
    },
    cancelArea (evt) {
      if (evt.target.className === 'mask') {
        this.showArea = false
        document.documentElement.style.overflow = 'scroll'
      }
    }
  },
  watch: {
    'area' () {
      if (this.area === '全部区域') {
        this.updateAreaData({area: this.allArea})
      } else {
        this.updateAreaData({area: this.regionCinemas[this.area]})
      }
    },
    cityName () {
      this.getAreaData(this.cityName)
      this.area = '全部区域'
      setTimeout(() => {
        this.updateAreaData({area: this.allArea})
      }, 0)
    }
  },
  created () {
    this.getAreaData(this.$store.state.city.name)
    setTimeout(() => {
      this.updateAreaData({area: this.allArea})
    }, 0)
  }
}
</script>

<style>
.cm-header {
  background: #fafafa;
  color: #333;
  height: 40px;
  line-height: 26px;
  font-size: 14px;
  left: 0;
  right: 0;
  top: 0;
  display: -webkit-box;
  box-sizing: border-box;
  padding: 8px 0;
  border-bottom: 1px solid #ebebeb;
}
.cm-header>div {
  -moz-box-flex: 1.0;
  -webkit-box-flex: 1.0;
  text-align: center;
  box-sizing: border-box;
}
.area-item {
  background-color: #fff;
  font-size: 14px;
  color: #222;
  box-sizing: border-box;
  max-height: 70%;
  padding-left: 15px;
  overflow-y: scroll;
}
.area-item li {
  padding: 14px 0;
  border-bottom: 1px solid #ebebeb;
}
</style>
