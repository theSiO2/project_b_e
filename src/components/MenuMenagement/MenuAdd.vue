<template>
  <el-dialog
    title="添加操作"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="true"
    :modal-append-to-body="false"
  >
    <el-tabs type="border-card">
      <el-tab-pane label="目录">
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
          @click="dialogFormVisible = false"
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
          @click.native="catalogSubmit('catalogInfo')"
        >
          添加
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="菜单">
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
            <el-form-item label="输入路径：" prop="path">
            <el-input v-model="menuInfo.path"></el-input>
          </el-form-item>
          <el-form-item label="选择图标：">
            <el-input v-model="menuInfo.Icon"></el-input>
            <span>样式预览：</span><i :class="menuInfo.Icon"></i>
          </el-form-item>
        </el-form>
        <el-button
          @click="dialogFormVisible = !dialogFormVisible"
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
          添加
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
      MenuList:[],
      dialogFormVisible: false,
      catalogInfo: {
        name: "",
        Icon: "",
      },
      menuInfo: {
        belong: "",
        name: "",
        Icon: "",
        path:"",
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
  methods: {
    catalogSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.$refs[formName]);
          console.log(this.catalogInfo.name);
          console.log(this.catalogInfo.Icon);

          axios
            .post(`/sys/menu/save`, {
              name: this.catalogInfo.name,
              icon: this.catalogInfo.Icon,
              type: '目录',
            })
            .then((data) => {
              if (!data.data.code) {
                this.$message({
                  message: "操作成功",
                  type: "success",
                  duration: 500,
                  onClose: () => {
                    this.init();
                    this.dialogFormVisible = false;
                    this.$emit("refreshDataList");
                    
                  },
                });
              } else {
                this.$message.error(data.data.msg);
              }
            });
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
          axios
            .post(`/sys/menu/save`, {
              parentId: this.getParentID(this.menuInfo.belong),
              name: this.menuInfo.name,
              path: this.menuInfo.path,
              type: '菜单',
              icon: this.menuInfo.icon,
            })
            .then((data) => {
              if (!data.data.code) {
                this.$message({
                  message: "操作成功",
                  type: "success",
                  duration: 500,
                  onClose: () => {
                    this.init();
                    this.dialogFormVisible = false;
                    this.$emit("refreshDataList");
                  },
                });
              } else {
                this.$message.error(data.data.msg);
              }
            });
        } else {
          console.log("提交失败!!");
          return false;
        }
      });
    },
    init() {
      this.MenuList = this.$store.state.menuList;
      this.dialogFormVisible = true;
    },
    getParentID(parentName) {
      for (let i = 0; i < this.MenuList.length; i++) {
        if (parentName == this.MenuList[i].name) {
          console.log("找到父元素ID"+this.MenuList[i].menuId);
          return this.MenuList[i].menuId;
        }
        else{
             console.log("找不到父元素ID");
        }
      }
    },
  },
  mounted(){
     this.MenuList = this.$store.state.menuList;
  }
};
</script>

<style lang="less" scoped>
/deep/.el-tabs__content {
  background-color: #1e2140 !important;
}
/deep/.el-tabs__item {
  background-color: transparent !important;
}
/deep/.el-tabs--border-card > .el-tabs__header {
  background-color: transparent !important;
  border: none !important;
}
/deep/.el-tabs--border-card > .el-tabs__header,
/deep/.el-tabs__item,
/deep/.is-active {
  border: none !important;
  color: rgba(255, 255, 255, 0.8);
}
/deep/.el-tabs {
  background-color: #171834 !important;
  border: none;
}
/deep/.el-tabs__item {
  color: rgba(255, 255, 255, 0.5) !important;
}
/deep/.is-active {
  color: rgb(255, 255, 255) !important;
  background-color: #1e2140 !important;
}
/deep/.el-form-item__label {
  background-color: transparent !important;
}
//输入框，下拉框样式调整
/deep/.el-input__inner {
  border: #040620 1px !important;
  color: rgba(255, 255, 255, 0.6) !important;
  background: rgba(0, 0, 0, 0.24);
}
span {
  color: rgba(255, 255, 255, 0.801);
}
</style>