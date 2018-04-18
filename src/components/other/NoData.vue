<template>
  <div id="no-data">
    <header class="md-header">
      <span class="back-icon fl" @click="back"></span>
      <h3>返回</h3>
    </header>
    <section class="no-content">
      空空如也～
    </section>
  </div>
</template>

<script>
export default {
  name: 'no',
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>

<style>
.no-content {
  text-align: center;
  padding-top: 50%;
  color: #999;
  font-size: 18px;
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
#no-data + .footer{
  display: none!important;
}
</style>
