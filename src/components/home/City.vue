<template>
  <section ref="city" id="select-city" class="pf fadeInDown" v-if="show">
    <header class="city-header mint-1px-b pr">
      <span class="fb">选择城市</span>
      <span class="close-city pa" @click="closeCityList">x</span>
    </header>
    <div @click="selectCity($event)">
      <mt-index-list>
        <mt-index-section v-for="city in cityList" :index="city.sort" :key="city.sort">
          <mt-cell v-for="name in city.data" :title="name.regionName" :key="name.id"></mt-cell>
        </mt-index-section>
      </mt-index-list>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import axios from 'axios'
export default {
  name: 'city',
  data () {
    return {
      showCityList: true,
      cityList: []
    }
  },
  computed: {
    show () {
      return this.$store.state.city.show
    }
  },
  methods: {
    ...mapMutations([
      'pushLoadStack',
      'completeLoad'
    ]),
    changeCityData (data) {
      this.pushLoadStack()
      this.$refs.city.className = 'pf fadeOutTop'
      this.$store.dispatch('updateCityAsync', data).then(this.completeLoad)
    },
    closeCityList () {
      this.changeCityData({city: {}})
    },
    matchCityStr (name) {
      let cityRN = ['bj', 'sh', 'gz'][Math.floor(3 * Math.random())]
      switch (name) {
        case '北京': return 'bj'
        case '上海': return 'sh'
        case '广州': return 'gz'
        default: return cityRN
      }
    },
    selectCity (evt) {
      let ele = evt.target
      let className = ele.classList
      let name = ''
      if (className.contains('mint-indexsection-index') || className.contains('mint-indexlist-nav') || className.contains('mint-indexlist-navitem')) {
        return false
      }
      if (className.contains('mint-cell-wrapper')) {
        name = ele.children[0].children[0].innerHTML
      } else if (className.contains('mint-cell-title')) {
        name = ele.children[0].innerHTML
      } else {
        name = ele.innerHTML
      }
      this.changeCityData({
        city: {
          name: name,
          rN: this.matchCityStr(name)
        }
      })
    }
  },
  created () {
    this.$store.dispatch('updateCityAsync', {city: {}})
    this.pushLoadStack()
    axios.get('/movie/city').then(res => {
      let data = res.data.data.data.returnValue
      let citySort = Object.keys(data)
      this.cityList.push({
        sort: '热门',
        data: [{
          regionName: '北京',
          id: 1,
          rN: 'bj'
        }, {
          regionName: '上海',
          id: 2,
          rN: 'sh'
        }, {
          regionName: '广州',
          id: 3,
          rN: 'gz'
        }]
      })
      citySort.forEach((item) => {
        this.cityList.push({
          sort: item,
          data: data[item]
        })
      })
    }).then(this.completeLoad)
  }
}
</script>

<style>
  .mint-indicator-wrapper {
    z-index: 1000
  }
  #select-city {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9999999;
    background-color: #fff;
  }
  .city-header {
    height: 46px;
    line-height: 46px;
    text-align: center;
    color: #000;
    font-size: 16px;
    background-color: #fff;
  }
  .close-city {
    font-size: 28px;
    color: #666;
    display: inline-block;
    height: 46px;
    width: 50px;
    line-height: 38px;
    text-align: center;
    right: 0px;
  }
  @-webkit-keyframes fadeInDown {
    0% {
      opacity: .7;
      -webkit-transform: translateY(-50px);
      transform: translateY(-50px)
    }
    100% {
      opacity: 1;
      -webkit-transform: translateY(0);
      transform: translateY(0)
    }
  }
  @keyframes fadeInDown {
    0% {
      opacity: .7;
      -webkit-transform: translateY(-50px);
      -ms-transform: translateY(-50px);
      transform: translateY(-50px)
    }
    100% {
      opacity: 1;
      -webkit-transform: translateY(0);
      -ms-transform: translateY(0);
      transform: translateY(0)
    }
  }
  .fadeInDown {
    -webkit-animation: fadeInDown .3s;
    animation: fadeInDown .3s;
  }
  @-webkit-keyframes fadeOutTop {
    0% {
      opacity: 1;
      -webkit-transform: translateY(0);
      transform: translateY(0)
    }
    100% {
      opacity: 0;
      -webkit-transform: translateY(-50px);
      transform: translateY(-50px)
    }
  }
  @keyframes fadeOutTop {
    0% {
      opacity: 1;
      -webkit-transform: translateY(0);
      -ms-transform: translateY(0);
      transform: translateY(0)
    }
    100% {
      opacity: 0;
      -webkit-transform: translateY(-50px);
      -ms-transform: translateY(-50px);
      transform: translateY(-50px)
    }
  }
  .fadeOutTop {
    -webkit-animation: fadeOutTop .35s;
    animation: fadeOutTop .35s;
  }
</style>
