<template>
  <el-dialog
    title="修改操作"
    :visible.sync="menuEditVisiable"
    :close-on-click-modal="true"
    :modal-append-to-body="false"
  >
    <el-tabs type="border-card">
      <el-tab-pane label="目录操作" v-if="catalogVisiable">
        <el-form
          :model="catalogInfo"
          :rules="rules1"
          ref="catalogInfo"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="目录名字：" prop="name">
            <el-input v-model="catalogInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="选择图标：">
            <el-input v-model="catalogInfo.Icon"></el-input>
            <span>样式预览：</span><i :class="catalogInfo.Icon"></i>
          </el-form-item>
        </el-form>
        <el-button
          @click="menuEditVisiable = false"
          class="passed"
          type="primary"
          size="mini"
        >
          取消
        </el-button>
        <el-button
          class="disabled"
          type="danger"
          size="mini"
          @click.native="dataFormSubmit()"
        >
          确定
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="菜单" v-if="MenuVisiable">
        <el-form
          :model="menuInfo"
          :rules="rules2"
          ref="menuInfo"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="选择目录：" prop="belong">
            <el-select v-model="menuInfo.belong" clearable placeholder="请选择">
              <el-option
                v-for="item in this.$store.state.menuList"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜单名字：" prop="name">
            <el-input v-model="menuInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="选择路径：">
            <el-input v-model="menuInfo.path"></el-input>
          </el-form-item>
          <el-form-item label="选择图标：">
            <el-input v-model="menuInfo.Icon"></el-input>
            <span>样式预览：</span><i :class="menuInfo.Icon"></i>
          </el-form-item>
        </el-form>
        <el-button
          @click="EditVisible = false"
          class="passed"
          type="primary"
          size="mini"
        >
          取消
        </el-button>
        <el-button
          class="disabled"
          type="danger"
          size="mini"
          @click.native="menuSubmit('menuInfo')"
        >
          确定
        </el-button>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      type: "",
      belong: "",
      belongName: "",
      MenuList: [],
      menuEditVisiable: false,
      catalogInfo: {
        name: "",
        Icon: "",
        id: "",
      },
      menuInfo: {
        belong: "",
        name: "",
        Icon: "",
        path: "",
        id: "",
        belongID: "",
      },
      rules1: {
        name: [
          { required: true, message: "请输入目录名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
      },
      rules2: {
        belong: [{ required: true, message: "请选择目录", trigger: "change" }],
        name: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    catalogVisiable() {
      if (this.type == "目录") return true;
      else return false;
    },
    MenuVisiable() {
      if (this.type == "菜单") return true;
      else return false;
    },
  },
  methods: {
    getParentID(parentName) {
      for (let i = 0; i < this.MenuList.length; i++) {
        if (parentName == this.MenuList[i].name) {
          return this.MenuList[i].menuId;
        }
      }
    },
    catalogSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.$refs[formName]);
          console.log(this.catalogInfo.name);
          console.log(this.catalogInfo.Icon);
        } else {
          console.log("提交失败!!");
          return false;
        }
      });
    },
    menuSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.$refs[formName]);
          console.log(this.menuInfo.belong);
          console.log(this.menuInfo.name);
          console.log(this.menuInfo.Icon);
          console.log("MENU ID", this.menuId);
          this.dataFormSubmit();
        } else {
          console.log("提交失败!!");
          return false;
        }
      });
    },
    init(type, name, path, icon, belong, id) {
      console.log(type, name, path, icon, belong, id);
      this.type = type;
      this.belong = belong;
      console.log("所属父元素ID", belong);
      this.menuEditVisiable = true;
      if (type == "菜单") {
        for (let i = 0; i < this.MenuList.length; i++) {
          if (this.MenuList[i].menuId == belong) {
            console.log(this.MenuList[i].name);
            this.belongName = this.MenuList[i].name;
            this.menuInfo.belongID = this.MenuList[i].menuId;
            break;
          }
        }
      } else {
        console.log("该元素是目录");
        this.catalogInfo.name = name;
        this.catalogInfo.Icon = icon;
        this.catalogInfo.id = id;
      }
      this.menuInfo.name = name;
      this.menuInfo.path = path;
      this.menuInfo.Icon = icon;
      this.menuInfo.belong = this.belongName;
      this.menuInfo.id = id;
    },
    dataFormSubmit() {
      if (this.type == "菜单") {
        axios
          .post(`/sys/menu/update`, {
            menuId: this.menuInfo.id,
            parentId: this.getParentID(this.menuInfo.belong),
            name: this.menuInfo.name,
            path: this.menuInfo.path,
            type: this.type,
            icon: this.menuInfo.Icon,
          })
          .then((data) => {
            if (!data.data.code) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 500,
                onClose: () => {
                  this.menuEditVisiable = false;
                  this.$emit("refreshDataList");
                },
              });
            } else {
              this.$message.error(data.data.msg);
            }
          });
      } else {
        axios
          .post(`/sys/menu/update`, {
            menuId: this.menuInfo.id,
            parentId: this.getParentID(this.menuInfo.belong),
            name: this.catalogInfo.name,
            path: this.catalogInfo.path,
            type: this.type,
            icon: this.catalogInfo.Icon,
          })
          .then((data) => {
            if (!data.data.code) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 500,
                onClose: () => {
                  this.menuEditVisiable = false;
                  this.$emit("refreshDataList");
                },
              });
            } else {
              this.$message.error(data.data.msg);
            }
          });
      }
    },
  },
  mounted() {
    this.MenuList = this.$store.state.menuList;
  },
};
</script>

<style lang="less" scoped>
/deep/.el-tabs--border-card,
/deep/.el-tabs__item,
/deep/.is-active,
/deep/.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active,
/deep/.el-tabs--border-card > .el-tabs__header {
  background-color: transparent;
  border: none;
  color: white;
  box-shadow: none;
}
//输入框，下拉框样式调整
/deep/.el-input__inner {
  border: #040620 1px !important;
  color: rgba(255, 255, 255, 0.6) !important;
  background: rgba(0, 0, 0, 0.24);
}
</style>