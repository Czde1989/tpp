<template>
  <section style="height: 100%">
    <city></city>
    <header class="home-header border-bottom">
      <div class="city fl" @click="showCityList">
        <span class="vm city-name f14">{{cityName}}</span>
        <span class="city-arrow-icon vm"></span>
      </div>
      <div class="sel-lists fl f14 pr" @click="moveTab($event)">
        <div hot="sel" :class="{selnav: selnav}">正在热映</div>
        <div :class="{selnav: !selnav}">即将上映</div>
        <span class="move pa" :style="{left: moveDistance}"></span>
      </div>
    </header>
    <section v-show="selnav" class="content">
      <swiper :imgs="swiperImages"></swiper>
      <hot :hotLists="hotLists"></hot>
    </section>
    <section v-show="!selnav" class="content">
      <coming :comingLists="comingLists"></coming>
      <div class="click-load-more" @click="clickLoadMore">
        <span v-show="clickLoadStatus === 'start'">点击查看更多</span>
        <div class="loading-icon" v-show="clickLoadStatus === 'loading'">
          <span>加载中</span>
          <mt-spinner style="display: inline-block" type="fading-circle" color="rgb(100, 100, 100)" :size="19"></mt-spinner>
        </div>
        <span v-show="clickLoadStatus === 'complete'">已经全部显示</span>
      </div>
    </section>
    <play-video></play-video>
  </section>
</template>

<script>
import city from './City'
import swiper from './Swiper'
import hot from './Hot'
import playVideo from './PlayVideo'
import coming from './Coming'
import axios from 'axios'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
      moveDistance: '5%',
      swiperImages: [],
      comingLists: [],
      loadingLists: [],
      selnav: true,
      clickLoadStatus: 'start',
      offset: 0,
      limit: 20,
      total: 0
    }
  },
  computed: mapGetters([
    'hotLists',
    'cityName'
  ]),
  methods: {
    ...mapMutations([
      'showCityList',
      'pushComingList',
      'completeLoad',
      'pushLoadStack'
    ]),
    moveTab (event) {
      event.target.getAttribute('hot') ? this.selectHotTab() : this.selectComingTab()
    },
    selectHotTab () {
      this.selnav = true
      this.moveDistance = '5%'
      this.pushComingList({lists: []})
    },
    selectComingTab () {
      this.selnav = false
      this.moveDistance = '55%'
      this.pushComingList({lists: this.loadingLists})
    },
    sortComingData (lists) {
      let comingLists = []
      lists.forEach(item => {
        let hasItem = false
        for (let i = 0; i < comingLists.length; i++) {
          if (item.openTime === comingLists[i].openTime) {
            comingLists[i].movies.push(item)
            hasItem = true
            break
          }
        }
        if (!hasItem) {
          let comingItem = {
            openTime: '',
            day: '',
            movies: []
          }
          comingItem.openTime = item.openTime
          comingItem.day = this.getWeekDay(new Date(item.openTime).getDay())
          comingItem.movies.push(item)
          comingLists.push(comingItem)
        }
      })
      return comingLists
    },
    getWeekDay (num) {
      let weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      return weeks[num]
    },
    clickLoadMore () {
      if (this.clickLoadStatus !== 'complete') {
        this.clickLoadStatus = 'loading'
        setTimeout(() => {
          axios.get(`/movie/coming/?limit=${this.limit}&offset=${this.offset}`).then(res => {
            let lists = res.data.data.data.returnValue
            this.loadingLists = this.loadingLists.concat(lists)
            // 模拟索引数据的id
            this.loadingLists.forEach((item, index) => {
              item.mID = index
            })
            this.pushComingList({lists: this.loadingLists})
            this.comingLists = this.sortComingData(this.loadingLists)
            this.offset = this.offset + this.limit
            if (this.offset < this.total) {
              this.clickLoadStatus = 'start'
            } else {
              this.clickLoadStatus = 'complete'
            }
          })
        }, 500)
      }
    }
  },
  created () {
    this.pushComingList({lists: []})
    axios.get('/movie/swiper').then(res => {
      this.swiperImages = res.data.data.data.returnValue
    })
    axios.get(`/movie/coming/?limit=${this.limit}&offset=${this.offset}`).then(res => {
      let lists = res.data.data.data.returnValue
      lists.forEach((item, index) => {
        item.mID = index
      })
      this.loadingLists = lists
      this.total = res.data.total
      this.comingLists = this.sortComingData(lists)
      this.offset = this.offset + this.limit
    })
  },
  components: {
    city,
    swiper,
    hot,
    'play-video': playVideo,
    coming
  }
}
</script>

<style>
.home-header {
  height: 40px;
  font-size: 0px;
  background-color: #fff;
}
.selnav {
  color: #ff4d64;
}
.city {
  width: 35%;
  height: 100%;
  line-height: 40px;
  text-align: center;
  display: inline-block;
}
.city-arrow-icon {
  margin-left: 4px;
  width: 12px;
  height: 12px;
  display: inline-block;
}
.city-arrow-icon:after {
  content: "";
  display: block;
  width: 6px;
  height: 6px;
  margin-left: 0;
  border: 1px solid #50505a;
  border-top: 0 none;
  border-left: 0 none;
  margin-left: 2px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}
.content {
  margin-bottom: 58px;
}
.sel-lists {
  width: 65%;
  display:-moz-box;
  display: -webkit-box;
  display: box;
}
.sel-lists div {
  -moz-box-flex: 1.0;
  -webkit-box-flex: 1.0;
  line-height: 40px;
  text-align: center;
}
.move {
  display: inline-block;
  bottom: 0px;
  width: 40%;
  border-bottom: 3px solid #ff4d64;
  -webkit-transition: left 0.5s ease-in-out;
  transition: left 0.5s ease-in-out;
}
.click-load-more {
  height: 42px;
  line-height: 42px;
  text-align: center;
  color: #333;
  font-size: 15px;
  background-color: #fff;
  margin: 5px 0 8px;
}
.loading-icon span {
  vertical-align: middle;
}
</style>
