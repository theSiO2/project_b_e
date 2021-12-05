<template>
  <!-- 主页面显示区域 -->
  <router-view></router-view>
</template>
<script>
export default {
  name: "App",
};
</script>

<style lang="less">

// ---------------------------------------------------------------------------------职位管理详细信息弹出框样式修改
.el-popover {
  background: rgba(8, 11, 37, 0.96) !important;
  color: #e9e9e9 !important;
  border-color: rgba(255, 255, 255, 0.2) !important;
  box-shadow: #02030f 0px 0px 10px;
  border-radius: 1em;
  width: 500px;
}
.el-popover__title {
  color: #e9e9e9 !important;
}
.el-popper[x-placement^="bottom"] .popper__arrow {
  border-bottom-color: rgba(255, 255, 255, 0.2) !important;
}
.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: rgba(04, 06, 20, 0.96) !important;
}
body {
  font-family: "Microsoft YaHei", Arial, Helvetica, sans-serif, "楷体" !important;
}
// ---------------------------------------------------------------------------------职位管理详细信息弹出框样式修改
.el-popper[x-placement^="bottom"] .popper__arrow{
  // border-color:rgb(23 24 52)!important ;
  // border: 1px rgb(23 24 52) !important;
  // background-color: rgb(23 24 52) !important;
  border-bottom-color: #50529b !important;

}
</style>
