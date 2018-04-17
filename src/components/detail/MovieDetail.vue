<template>
  <section id="movie-detail">
    <header class="md-header">
      <span class="back-icon fl" @click="back"></span>
      <h3>影片详情</h3>
    </header>
    <div class="mbg pr">
      <figure class="d-cover">
        <img :src="detail.poster ? `https://gw.alicdn.com/${detail.poster}` : 'https://gw.alicdn.com/tps/i1/TB147JCLFXXXXc1XVXXxGsw1VXX-112-168.png'" alt="">
      </figure>
      <article class="d-info">
        <p class="d-name tddd">{{detail.showName}}</p>
        <p class="tddd">{{detail.showNameEn}}</p>
        <p>{{detail.type}}</p>
        <p>{{detail.country}} | {{detail.duration}}分钟</p>
        <p>{{detail.openTime}}在中国上映</p>
        <div class="full-star pr">
          <div class="score-start" :style="{width: `${detail.remask * 10}%`}"></div>
          <span class="score pa">{{detail.remark}}分</span>
        </div>
      </article>
    </div>
    <section v-if="info">
      <section class="intro-block border-1px-bottom">
        <article class="d-intro">
          <p ref="dint" :class="{'hide-something': hideSomething}">
            {{info.description}}
          </p>
          <p class="d-content" @click="controlShowMany">
            <span v-if="hideSomething">展开</span>
            <span v-else>收起</span>
          </p>
        </article>
      </section>
      <section class="ab-photo pr border-1px-bottom">
        <header class="ab-header pa">
          <span class="fb">演职人员</span>
        </header>
        <div class="swiper-container">
          <div class="swiper-wrapper" v-if="info.artistes">
            <div class="swiper-slide" v-for="(item, index) in info.artistes.actor" :key="index">
              <div class="am-img pr">
                <img :src="`https://gw.alicdn.com/${item.avatar}`" alt="">
                <div class="am-title pa">
                  <p class="tddd">{{item.artisteName}}</p>
                  <p>{{item.profession}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="ab-photo crew-ab-photo pr border-1px-bottom">
        <header class="ab-header pa">
          <span class="fb">剧照</span>
        </header>
        <div class="swiper-container crew-swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item, index) in info.trailer" :key="index">
              <div class="am-img crew-img">
                <img :src="`https://gw.alicdn.com/${item}`" alt="">
              </div>
            </div>
          </div>
        </div>
      </section>
      <hot-evaluation :lists="evalLists"></hot-evaluation>
    </section>
    <section v-else class="no-data">
      <span>暂时没有更多数据～</span>
    </section>
  </section>
</template>

<script>
import Swiper from 'swiper'
import { mapMutations } from 'vuex'
import axios from 'axios'
import HotEvaluation from './HotEvaluation'
export default {
  name: 'detail',
  data () {
    return {
      detail: {},
      hideSomething: true,
      info: false,
      evalLists: []
    }
  },
  methods: {
    ...mapMutations([
      'pushLoadStack',
      'completeLoad'
    ]),
    controlShowMany () {
      this.hideSomething = !this.hideSomething
    },
    getDataById (lists, id) {
      return lists.filter(item => item.mID === id)[0]
    },
    initSwiper () {
      this.$nextTick(() => {
        /* eslint-disable */
        const swiper = new Swiper('.swiper-container', {
          pagination: '.swiper-pagination',
          slidesPerView: 'auto',
          centeredSlides: false,
          spaceBetween: 5
        })
      })
    },
    back () {
      this.$router.back()
    }
  },
  created () {
    let id = this.$route.params.id
    let hotLists = this.$store.state.city.data
    let comingLists = this.$store.state.coming.lists
    if (comingLists.length) {
      this.detail = this.getDataById(comingLists, id)
    } else if (!comingLists.length && !hotLists.length) {
      this.$router.push('/')
    } else {
      this.detail = this.getDataById(hotLists, id)
    }
    let detailStr = this.detail.detailStr
    console.log(this.detail)
    if (detailStr) {
      axios.get(`/movie/info/?name=${detailStr}`).then(res => {
        this.info = res.data.data.data.returnValue
        this.initSwiper()
      })
      axios.get(`/movie/evaluation/?name=${detailStr}`).then(res => {
        this.evalLists = res.data.data.data.returnValue
      })
    } else {
      this.info = false
    }
    this.initSwiper()
  },
  components: {
    HotEvaluation
  }
}
</script>

<style>
.border-1px-bottom {
  border-bottom: 1px solid #d9d9d9;
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
.mbg {
  height: 10rem;
  height: 50vmin;
  margin-top: 44px;
  background: url('../../assets/images/mbg.png') no-repeat;
  background-size: 100% auto;
  padding-left: 15px;
  overflow: hidden;
  box-sizing: border-box;
}
.d-cover {
  position: absolute;
  bottom: 0;
  z-index: 1;
  background: #ccc;
  width: 33.10vmin;
  min-width: 6.25rem;
  min-width: 31.3vmin;
  height: 46.3vmin;
}
.d-cover img {
  width: 100%;
  height: 100%;
}
.d-info {
  display: inline-block;
  margin: 3.8vmin 0 0 37.5vmin;
  color: #fff;
  width: 55%;
}
.d-info p {
  opacity: .8;
  font-size: .75rem;
  line-height: .875rem;
  line-height: 4.4vmin;
  margin-bottom: .375rem;
  margin-bottom: 1.9vmin;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.d-info p.d-name {
  position: relative;
  font-size: 1.125rem;
  line-height: 1.5rem;
  line-height: 7.5vmin;
  max-height: 3rem;
  max-height: 15vmin;
  overflow-y: hidden;
  margin-bottom: .375rem;
  margin-bottom: 1.9vmin;
  color: #fff;
  opacity: 1;
}
.mbg .full-star {
  margin-top: 6vmin;
}
.mbg .score {
  right: -32px;
  top: 1px;
  color: #fff;
  font-size: 12px;
}
.mbg .full-star {
  width: 70px;
  height: 14px;
}
.intro-block {
}
.d-intro {
  padding: 20px 15px;
  box-sizing: border-box;
  background-color: #fff;
}
.d-intro p {
  word-break: break-word;
  margin-bottom: .75rem;
  margin-bottom: 3.8vmin;
  font-size: .9375rem;
  line-height: 1.5rem;
  line-height: 7.5vmin;
  color: #333;
  overflow: hidden;
}
.d-intro p.d-control {
  text-align: center;
  font-size: 1.1rem;
}
.ab-photo {
  padding: 15px 15px 25px;
  box-sizing: border-box;
  background-color: #fff;
}
.crew-ab-photo {
  padding: 15px 15px 0px;
}
.ab-header {
  z-index: 1000;
}
.ab-header span {
  font-size: .9375rem;
  line-height: 2rem;
  line-height: 10vmin;
  color: #000;
}
.hide-something {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.am-img {
  height: 124px;
}
.crew-img {
  height: 100px;
}
.am-img img{
  height: 100%;
  width: auto;
}
.am-title {
  width: 100%;
}
.am-title p {
  text-align: center;
}
.am-title p:first-child {
  color: #333;
  font-size: 13px;
}
.am-title p:last-child {
  color: #999;
  font-size: 11px;
}
#movie-detail .swiper-container {
  height: 202px;
  width: 100%;
  overflow: initial;
  overflow-x: hidden;
}
#movie-detail .crew-swiper-container {
  margin-top: 7px;
  height: 165px;
}
#movie-detail .swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  width: auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
#movie-detail .swiper-slide:nth-child(2n),
#movie-detail .swiper-slide:nth-child(3n) {
  width: auto;
}
.no-data {
  padding: 60px;
  font-size: 16px;
  color: #666;
  text-align: center;
}
</style>
