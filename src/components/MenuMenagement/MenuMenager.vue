<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>卡片名称</span>
      <el-button
        style="float: right; padding: 8px 8px"
        type="primary"
        @click="openMenuAdd()"
        >添加目录/菜单</el-button
      >
    </div>
    <el-table
      :data="List"
      style="width: 100%; margin-bottom: 20px"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      row-key="name"
      class="menuTable"
      stripe
    >
      <el-table-column prop="name" label="菜单名" min-width="300">
      </el-table-column>
      <el-table-column prop="path" label="菜单路径" min-width="300">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标" min-width="300">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="300">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="
              openMenuEdit(
                scope.row.type,
                scope.row.name,
                scope.row.path,
                scope.row.icon,
                scope.row.parentId,
                scope.row.menuId
              )
            "
            class="passed"
            type="primary"
            size="mini"
          >
            编辑
          </el-button>
          <el-button
            @click.native.prevent="
              openMenuDelete(scope.row.type, scope.row.name, scope.row.menuId)
            "
            class="disabled"
            type="danger"
            size="mini"
            :disabled="!ArrayIsNull(scope.row.children)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <menu-add
      v-if="menuAddVisiable"
      ref="MenuAdd"
      @refreshDataList="getParentMenus"
    >
    </menu-add>
    <menu-edit
      v-if="menuEditVisiable"
      ref="MenuEdit"
      @refreshDataList="getParentMenus"
    ></menu-edit>
    <menu-delete
      v-if="menuDeleteVisiable"
      ref="MenuDelete"
      @refreshDataList="getParentMenus"
    ></menu-delete>
  </el-card>
</template>

<script>
import MenuAdd from "./MenuAdd.vue";
import MenuEdit from "./MenuEidit.vue";
import MenuDelete from "./MenuDelete.vue";
import axios from "axios";
export default {
  components: { MenuAdd, MenuEdit, MenuDelete },
  data() {
    return {
      List: [],
      menuAddVisiable: false,
      menuEditVisiable: false,
      menuDeleteVisiable: false,
    };
  },
  methods: {
    ArrayIsNull(array) {
      if (array == undefined || array.length <= 0) {
        return true;
      } else false;
    },

    openMenuAdd() {
      this.menuAddVisiable = true;
      this.$nextTick(() => {
        this.$refs.MenuAdd.init();
      });
    },
    openMenuEdit(type, name, path, icon, belong, id) {
      this.menuEditVisiable = true;
      this.$nextTick(() => {
        this.$refs.MenuEdit.init(type, name, path, icon, belong, id);
      });
    },
    openMenuDelete(type, name, id) {
      this.menuDeleteVisiable = true;
      this.$nextTick(() => {
        this.$refs.MenuDelete.init(name, type, id);
      });
    },
    menuEdit() {
      console.log("编辑");
    },
    menuDelete() {
      console.log("删除");
    },
    getParentMenus() {
      axios.get("/sys/menu/list").then((response) => {
        this.$store.state.menuList = response.data.menus;
        console.log(response.data.menus);
        this.List = this.$store.state.menuList;
      });
    },
  },
  mounted() {
    this.getParentMenus();

 
  },
};
</script>

<style lang="less" scoped>
.box-card {
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 1em;
  border: none;
  color: rgba(255, 255, 255, 0.6);

  /deep/.el-card__header {
    border-bottom: none !important;
  }

  /deep/tr,
  .menuTable,
  /deep/.el-table__cell,
  .el-table::before,
  .el-table--border::after,
  .el-table--group::after,
  .el-table::before {
    background-color: transparent !important;
  }
  /deep/.el-table,
  /deep/td,
  /deep/.el-table__cell,
  /deep/.el-table--border,
  /deep/.el-table__cell,
  /deep/.el-table,
  /deep/th,
  /deep/.el-table__cell,
  /deep/.is-leaf,
  /deep/.cell {
    border-color: #040620 !important;
    color: rgba(255, 255, 255, 0.8) !important;
  }
  /deep/.el-icon-arrow-right:before {
    color: rgba(255, 255, 255, 0.8) !important  ;
  }
}
</style>