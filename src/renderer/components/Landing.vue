<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="25">
        <div class="text-center">
          <div class="mt-6 mb-2">
            <img src="~@/assets/radioly.svg" alt="">
          </div>
          <div class="slogan">
            Share and listen to music offline.
          </div>
          <div class="mb-6">
            <img src="~@/assets/on-boarding.svg" alt="">
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" justify="center">
      <el-col :span="16">
        <router-link :to="{name: 'select-channel'}" tag="div" class="mb-3">
          <el-button type="primary" class="w-100">Listen To Music</el-button>
        </router-link>
        <router-link :to="{name: 'create-channel'}" tag="div">
          <el-button class="w-100">Broadcast Music</el-button>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'landing',
  };
</script>

<style lang="scss" scoped>
  .slogan {
    font-size: 18px;
    color: #909399;
    letter-spacing: 0.2px;
    margin-bottom: 40px;
  }
</style>
