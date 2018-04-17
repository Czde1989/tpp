<template>
  <div class="app">
    <router-view/>
    <footer-nav :showNav="showNav"></footer-nav>
  </div>
</template>

<script>
import footer from './components/Footer.vue'
export default {
  name: 'App',
  data () {
    return {
      direction: 'forward',
      showNav: true
    }
  },
  methods: {
    routeChange () {
      let path = this.$route.path
      if (path === '/' || path === '/cinama' || path === '/me') {
        this.showNav = true
      } else {
        this.showNav = false
      }
    }
  },
  watch: {
    '$route': function () {
      this.routeChange()
    }
  },
  components: {
    'footer-nav': footer
  }
}
</script>

<style>
body{
  background: #f5f5f5;
}
</style>
