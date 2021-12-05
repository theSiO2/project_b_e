<template>
  <el-row class="tac">
    <el-col :span="24">
      <h3 class="asideTitle">自定义标题</h3>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="rgba(255, 255, 255, 0)"
        text-color="#fff"
        active-text-color="#ffd04b"
        fa-border="none"
      >
        <!-- 最外侧有子元素 -->
        <el-submenu
          v-for="item in hasChildren"
          :key="item.path"
          :index="item.path"
        >
          <template slot="title">
            <i class="el-icon-location"></i>
            <span class="options">{{ item.label }}</span>
          </template>
          <el-menu-item-group>
            <!-- 第二层列表 -->
            <el-menu-item
              :index="subItem.label"
              v-for="(subItem, subIndex) in item.children"
              :key="subIndex.label"
              text-color="#fff"
              style="background-color=#000"
            >
              <!-- <i :class="'el-icon-' + subItem.icon"></i> -->
              <span slot="title">{{ subItem.label }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <!-- 最外没有子元素 -->
        <el-menu-item v-for="item in noChildren" :key="item.label">
          <template slot="title">
            <i class="el-icon-location"></i>
            <router-link :to="item.url"
              ><span class="options">{{ item.label }}</span></router-link
            >
          </template>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home",
          url: "Home/Home",
          children: [
            {
              path: "/",
              name: "",
              label: "子元素1",
              icon: "s-home",
              url: "/",
            },
            {
              path: "/",
              name: "",
              label: "子元素2",
              icon: "s-home",
              url: "/",
            },
            {
              path: "/",
              name: "",
              label: "子元素3",
              icon: "s-home",
              url: "/",
            },
            {
              path: "/",
              name: "",
              label: "子元素4",
              icon: "s-home",
              url: "/",
            },
          ],
        },

        {
          path: "/",
          name: "首页",
          label: "首页",
          icon: "s-home",
          url: "/",
        },
        {
          path: "/",
          name: "职位管理",
          label: "岗位管理",
          icon: "s-home",
          url: "/job",
        },
        {
          path: "/",
          name: "home",
          label: "元素4",
          icon: "s-home",
          url: "Home/Home",
        },
      ],
    };
  },
  computed: {
    noChildren() {
      return this.menu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.menu.filter((item) => item.children);
    },
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    test1() {
      console.log(this.index);
    },
  },
};
</script>

<style lang="less"  scoped>
// @font-face{
//   font-family:"苹方-简细体";
//   src: url("../assets/苹方-简细体.otf");
// }
// *{
//   font-family:'苹方-简细体', Courier, monospace;
// }
.el-icon-location {
  margin-top: 20px;
  float: left;
  height: 18px;
  width: 18px;
}
.tac {
  background-color: rgba(255, 255, 255, 0);
  color: rgba(244, 244, 245, 0.9);
}
.el-menu {
  border: none;
}
.el-menu-item-group > ul {
  background-color: "rgba(255, 255, 255, 0.8)";
}
.options {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none !important;
  width: 70%;
  // float: left;
  // text-align: left;
}
.asideTitle {
  margin-top: 10px;
  margin-bottom: 20px;
}

</style>