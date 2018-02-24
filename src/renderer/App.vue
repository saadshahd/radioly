<template>
  <div id="app" class="app">
    <el-button
      icon="el-icon-back"
      size="small"
      class="back-button"
      @click="back"
      v-show="isNotLandingRoute"
    ></el-button>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'radiooly',
    methods: {
      back() {
        this.$router.go(-1);
      },
    },
    computed: {
      isNotLandingRoute() {
        return this.$route.name !== 'landing';
      },
    },
  };
</script>

<style lang="scss">
  @import "~@/styles/main";
</style>

<style lang="scss" scoped>
  .back-button {
    position: fixed;
    top: 10px;
    left: 10px;
    z-index: 2000;
  }
</style>
