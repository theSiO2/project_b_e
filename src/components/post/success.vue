<template>
  <el-result icon="success" title="发布成功" subTitle="请根据提示进行操作" class="text">
    <template slot="extra">
      <el-button type="primary" size="small" @click="toPath('/job')">查看信息</el-button>
      <el-button type="primary" size="small" @click="toPath('/issue')">继续发布</el-button>
    </template>
  </el-result>
</template>

<script>
export default {
  name: "Success",
  methods: {
      toPath(path){
          this.$router.push(path);
      }
  },
};
</script>
<style lang="less">
.el-result__title>p{
  color:rgba(255, 255, 255, 0.6) !important;
}
.el-result__subtitle>p{
    color:rgba(255, 255, 255, 0.3) !important;
}
</style>