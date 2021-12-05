<template>
  <el-row class="tac">
    <el-col :span="24">
      
      <h3 class="asideTitle">自定义标题1</h3>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="rgba(255, 255, 255, 0)"
        text-color="#fff"
        active-text-color="#ffd04b"
        fa-border="none"
        :unique-opened = "true"
        width="220px"
        :router="true"
      >
        <!-- 一级目录 -->
        <el-submenu
          v-for="item in this.$store.state.menuList"
          :key="item.name"
          :index="item.name"
        >
          <template slot="title">
            <i :class="item.icon"></i>
            <span class="options" style="width:180px">{{ item.name }}</span>
          </template>
          <el-menu-item-group>
            <!-- 二级目录 -->
            <el-menu-item
              v-for="(subItem, subIndex) in item.children"
              :index="subItem.path"
              :key="subIndex.name"
              :to="item.path"
            >
              <!-- <i :class="subItem.icon"></i> -->
              <span slot="title" style="position:relative;left:-15px">{{ subItem.name }}</span>

            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      // menu: [
      //   {
      //     path: "/",
      //     name: "home",
      //     label: "首页",
      //     icon: "s-home",
      //     url: "Home/Home",
      //     children: [
      //       {
      //         path: "/",
      //         name: "",
      //         label: "子元素1",
      //         icon: "s-home",
      //         url: "/",
      //       },
      //       {
      //         path: "/",
      //         name: "",
      //         label: "子元素2",
      //         icon: "s-home",
      //         url: "/",
      //       },
      //       {
      //         path: "/",
      //         name: "",
      //         label: "子元素3",
      //         icon: "s-home",
      //         url: "/",
      //       },
      //       {
      //         path: "/",
      //         name: "",
      //         label: "子元素4",
      //         icon: "s-home",
      //         url: "/",
      //       },
      //     ],
      //   },
      //   {
      //     path: "/",
      //     name: "首页",
      //     label: "首页",
      //     icon: "s-home",
      //     url: "/",
      //   },
      //   {
      //     path: "/",
      //     name: "职位管理",
      //     label: "岗位管理",
      //     icon: "s-home",
      //     url: "/job",
      //   },
      //   {
      //     path: "/",
      //     name: "home",
      //     label: "元素4",
      //     icon: "s-home",
      //     url: "Home/Home",
      //   },
      // ],
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

<style lang="less">
.el-menu-vertical-demo {
  overflow-y: hidden;
  overflow-x: hidden;
}
.tac {
  background-color: rgba(255, 255, 255, 0);
  color: rgba(244, 244, 245, 0.9);
}
.el-menu {
  border: none;
}
.el-menu-item-group > ul {
  background-color: "rgba(255, 255, 255, 0.2)";
}

.el-menu-item{
color:rgba(255, 255, 255, 0.6) !important;
padding-left: 0px !important;
padding-right: 0px !important;
border-radius: 0.5em !important;
float:left;
}
.el-submenu__title{ 
  border-radius: 0.5em;

}
.el-submenu__title:hover,.el-menu-item:hover{
background-color: rgba(0, 0, 0, 0.3) !important;
}
.submenu__title,.el-menu-item{

  border-radius: 0.5em !important;

}
i{
  padding-left:5px ;
  padding-right: 10px;
}
.options {
  display: inline-block;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none !important;
  width: 70%;
  text-align: left;
}
li.is-active{
  color: rgba(255, 255, 255, 0.9) !important;
}
.el-menu-item-group__title{
  padding: none !important;
}
</style>