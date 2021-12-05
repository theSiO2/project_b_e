<template >
  <div class="MainContainer Main back-ground">
    <el-container class="back-ground">
      <el-aside width="200px" class="mainAside"
        ><commen-aside></commen-aside
      ></el-aside>
      <el-container>
        <el-header><commen-header></commen-header></el-header>
        <el-main>
          <transition name="el-fade-in-linear">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import commenAside from "../components/commenAised.vue"; //导入侧边栏
import commenHeader from "../components/commenHeader.vue"; //导入顶部
import messageItem from "../components/messageItem.vue";
import Vue from "vue";
import Plugin from "v-fit-columns";
import axios from "axios";

Vue.use(Plugin);
export default {
  name: "Main",
  components: { commenAside, commenHeader, messageItem },
  mounted() {
    axios.get("/sys/menu/list").then((response) => {
      this.$store.state.menuList = response.data.menus;
    });

    // for (var i = 0; i < this.$store.state.menuList.length; i++) {
    //   // this.$router.options.routers[0].children.push({
    //   //   name: this.$store.state.menuList[i].name,
    //   //   path: this.$store.state.menuList[i].path,
    //   // });
    //   // this.$router.addRoutes(this.$router.options.routes); //调用addRoutes添加路由
    //   for (var j = 0; j < this.$store.state.menuList[i].children.length; j++) {
    //     this.$router.options.routers[0].children.push({
    //       name: this.$store.state.menuList[i].children[j].name,
    //       path: this.$store.state.menuList[i].children[j].path,
    //       component: () => import("../components/`this.$store.state.menuList[i].children[j].path`.vue")
    //     });
    //   }
    // }
  },
};
</script>

<style lang="less"  scoped >
@font-face {
  font-family: "苹方-简细体";
  src: url("../assets/苹方-简细体.otf");
}
@font-face {
  font-family: "上天";
  src: url("../assets/NiZhaBuShangTian-2.ttf");
}
@font-face {
  font-family: "中细体";
  src: url("../assets/思源黑体中细.ttf");
}
* {
  // font-family:'苹方-简细体', Courier, monospace;
  font-family: "中细体", Courier, monospace;
}
.MainContainer.back-ground {
  top: 0;
  bottom: 0;
  position: fixed;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;

  background-image: radial-gradient(
    farthest-side ellipse at 10% 0,
    #333867,
    #17193b
  );
  // background-image: linear-gradient(60deg, #3d3393 0%, #2b76b9 37%, #2cacd1 65%, #35eb93 100%);
  // background-image: linear-gradient(to top, #09203f 0%, #537895 100%);
  height: 100%;
  width: 100%;

  background-size: 100% 100%;
}
.MainContainer.Main {
  /* background-image: linear-gradient(to right, #383d68, #17193b); */
  color: rgba(244, 244, 245, 0.9);
}
.el-header,
.el-footer {
  /* background-color: #b3c0d1; */
  text-align: center;
  line-height: 60px;
}

.el-aside.mainAside {
  /* background-color: #d3dce6; */
  text-align: center;
  line-height: 200px;
  /* border-right: solid 1px rgba(244, 244, 245, 0.3); */
}

.el-main.Container {
  /* background-color: #e9eef3; */
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5).el-aside,
.el-container:nth-child(6).el-aside {
  line-height: 260px;
}

.el-container:nth-child(7).el-aside {
  line-height: 320px;
}

// .transition-box {
//   margin-bottom: 10px;
//   width: 200px;
//   height: 100px;
//   border-radius: 4px;
//   background-color: #409eff;
//   text-align: center;
//   color: #fff;
//   padding: 40px 20px;
//   box-sizing: border-box;
//   margin-right: 20px;
// }
</style>