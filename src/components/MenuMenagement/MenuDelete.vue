<template>
  <el-dialog
    title="删除操作"
    :visible.sync="dialogFormVisible"
    :close-on-click-modal="true"
    :modal-append-to-body="false"
  >
    <el-tabs type="border-card">
      <span id="message">确认要删除{{ name }}吗？</span>

      <div>
        <el-button
          @click="dialogFormVisible = false"
          class="passed"
          type="primary"
          size="mini"
          >取 消</el-button
        >
        <el-button
          class="disabled"
          type="danger"
          size="mini"
          @click.native="deleteMenu(id,name)"
          >确 定</el-button
        >
      </div>
    </el-tabs>
  </el-dialog>
</template>

<script>
import { MessageBox } from "element-ui";
import axios from "axios"
export default {
  data() {
    return {
      dialogFormVisible: false,
      type: "",
      name: "",
      id: "",
    };
  },
  methods: {
    handleDelete(Id, name) {
      axios
          .post("/sys/menu/delete/" + Id)
          .then((data) => {
            if (!data.data.code) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 500,
                onClose: () => {
                  this.dialogFormVisible = false;
                  this.$emit("refreshDataList");
                },
              });
            } else {
              this.$message.error(data.data.msg);
            }
          });
    },
    init(name, type, id) {
      this.dialogFormVisible = true;
      this.name = name;
      this.type = type;
      this.id = id;
    },
    deleteMenu(id,name) {
      console.log("删除操作" + id);
      this.handleDelete(id, name);  
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="less" scoped>
#message {
  height: 40px;
  width: 250px;
  display: inline-block;
  margin-bottom: 20px;

  font-size: 20px;
  color: rgba(255, 255, 255, 0.8);
}
.el-tabs--border-card {
  background: transparent;
  border: none;
  box-shadow: none;
}
/deep/.el-tabs--border-card > .el-tabs__header {
  border: none !important;
}
</style>