<template>
  <section id="cm-detail">
    <header class="md-header">
      <span class="back-icon fl" @click="back"></span>
      <h3>{{cinemaData.cinemaName}}</h3>
    </header>
    <header class="cm-d-header">
      <div>
        <p class="tddd fb f16">{{cinemaData.cinemaName}}</p>
        <p class="tddd f13 c6">{{cinemaData.address}}</p>
      </div>
    </header>
    <div class="cm-welfare cm-d-welfare">
      <span class="label-mod label-orange">新人专享</span>
      <span class="label-mod">新人特惠，名额有限抢完即止</span>
    </div>
    <div class="film-info">
      <film :lists="filmLists"></film>
      <div class="sel-film">
        <p class="fb">{{selFilm.showName}}</p>
        <div class="full-star pr cm-star">
          <div class="score-start" :style="{width: `${selFilm.remark * 10}%`}"></div>
          <span class="score pa">{{selFilm.remark}}</span>
        </div>
      </div>
      <div class="sel-date pr">
        <ul @click="selectDateTab">
          <li :data-num="item.num" v-for="item in playDate" :key="item.date">
            <span :data-num="item.num">{{item.date}}</span>
            <span :data-num="item.num" class="font-icon">惠</span>
          </li>
        </ul>
        <span class="move pa" :style="{left: `${105 * selDateNum}px`}"></span>
      </div>
      <div class="tips">温馨提示:开场前15分钟关闭在线售票</div>
    </div>
    <play-date :dataNum="selDateNum"></play-date>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios'
import film from './Film'
import playDate from './PlayDate'
export default {
  name: 'cinama-detail',
  data () {
    return {
      filmLists: [],
      itemId: 0,
      selDateNum: 0,
      cinemaData: {},
      selFilm: {},
      playDate: [
        {date: '今天 12-15', num: 0},
        {date: '明天 12-16', num: 1},
        {date: '后天 12-17', num: 2},
        {date: '周五 12-18', num: 3}
      ]
    }
  },
  components: {
    film,
    'play-date': playDate
  },
  methods: {
    ...mapMutations([
      'pushLoadStack',
      'completeLoad',
      'showCityList',
      'updateAreaData'
    ]),
    getDataById (array, id) {
      return array.filter(item => item.id === id)[0]
    },
    selectDateTab (event) {
      this.selDateNum = +event.target.getAttribute('data-num')
    },
    back () {
      this.$router.back()
    }
  },
  created () {
    axios.get(`/movie/cinema_detail`).then(res => {
      this.filmLists = res.data.data.data.returnValue.shows
      this.selFilm = this.filmLists[0]
    })
    this.cinemaData = this.getDataById(this.$store.state.cinama.area, this.$route.params.id)
    if (!this.cinemaData) {
      this.$router.push('/')
    }
  }
}
</script>

<style>
#cm-detail {
  background: #fff;
  height: 100%;
}
#cm-detail + .footer{
  display: none!important;
}
.md-header{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  height: 44px;
  background: #f5f5f5;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
}
.md-header h3{
  font-size: 16px;
  line-height: 44px;
}
.md-header .back-icon{
  display: block;
  width: 44px;
  height: 44px;
  background: url(../../assets/images/back.svg) no-repeat center center;
  background-size: 20px 20px;
}
.cm-d-header {
  padding: 13px 0 0 15px;
  box-sizing: border-box;
  margin-top: 44px;
}
.cm-d-header>div {
  padding: 0 15px 13px 0;
  border-bottom: 1px solid #ebebeb;
}
.cm-d-header p:last-child {
  margin-top: 6px;
  color: #666;
}
.cm-d-welfare {
  padding: 0 15px 15px;
  margin-top: 15px;
}
.cm-d-welfare::after {
  content: '>';
  float: right;
  font-size: 16px;
  color: #999;
  font-weight: 100;
  transform: scaleY(1.3);
  line-height: 15px;
}
.film-info {
  background-color: #4685a4;
}
.sel-film {
  text-align: center;
  background-color: #fff;
  padding: 5px 0;
  border-bottom: 1px solid #ebebeb;
}
.sel-film p {
  font-size: 16px;
}
.cm-star {
  display: inline-block;
  margin: 3px 0 0 -29px;
  height: 15px;
  width: 73px;
}
.cm-star .score {
  right: -24px;
  font-size: 13px;
  top: 1px;
}
.sel-date {
  width: 100%;
  overflow: hidden;
  overflow-x: scroll;
}
.sel-date ul {
  width: 480px;
}
.sel-date li {
  float: left;
  width: 100px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  font-size: 13px;
  color: #555;
  padding-left: 5px;
}
.font-icon {
  color: #fff;
  height: 20px;
  border-radius: 3px;
  background-color: #ff9201;
  margin-left: 5px;
}
.sel-date .move {
  width: 105px;
  transition: left .3s ease-in-out;
}
.tips {
  padding: 5px 15px;
  font-size: 12px;
  color: #ffa101;
  text-align: left;
  background-color: #fbf9e4;
  border-top: 1px solid #fbeccd;
  border-bottom: 1px solid #fbeccd;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  height: 0;
  background-color: transparent;
}
</style>
