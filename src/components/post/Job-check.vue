<template>
  <el-dialog
    title="审核信息"
    :close-on-click-modal="true"
    :visible.sync="visible"
    :modal-append-to-body="false"
    custom-class="details"
  >
    <el-descriptions class="margin-top" title="岗位信息" :column="1" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          岗位编号
        </template>
        {{ this.Info.id }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          岗位名称
        </template>
        {{ this.Info.jobName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          薪资
        </template>
        {{ this.Info.salary }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          待遇
        </template>
        {{ this.Info.welfare }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          地区
        </template>
        {{ this.Info.address }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          经验
        </template>
        {{ this.Info.experience }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          学历
        </template>
        {{ this.Info.education }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          招人数
        </template>
        {{ this.Info.peopleCount }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          状态
        </template>
        {{ this.Info.issueStatus }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          发布日期
        </template>
        {{ this.Info.issueDate }}
      </el-descriptions-item>
    </el-descriptions>
    <br />
    <el-descriptions direction="vertical" :column="1" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          岗位要求
        </template>
        {{ this.Info.jobInfo }}
      </el-descriptions-item>
    </el-descriptions>
    <br />
    <el-descriptions class="margin-top" title="公司信息" :column="1" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          公司编号
        </template>
        {{ this.Info.companyId }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-user"></i>
          公司名称
        </template>
        {{ this.Info.companyName }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          类型
        </template>
        {{ this.Info.type }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-mobile-phone"></i>
          规模
        </template>
        {{ this.Info.size }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          领域
        </template>
        {{ this.Info.field }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-location-outline"></i>
          地址
        </template>
        {{ this.Info.address }}
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions direction="vertical" :column="1" border>
      <el-descriptions-item>
        <template slot="label">
          <i class="el-icon-office-building"></i>
          公司简介
        </template>
        {{ this.Info.introduce }}
      </el-descriptions-item>
    </el-descriptions>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="checkSubmit(1)">通过</el-button>
      <el-button type="danger" @click="checkSubmit(2)">不通过</el-button>
    </span>
  </el-dialog>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      visible: false,
      id: 0,
      Info: {},
    };
  },
  methods: {
    init(id) {
      this.id = id;
      this.visible = true;
      this.$nextTick(() => {
        this.getDataList();
      });
    },
    getDataList() {
      console.log(this.id);
      axios.get("/post/job/" + this.id).then((data) => {
        this.Info = data.data.post;
        console.log(data.data);
      });
    },
    checkSubmit(issueStatus) {
      axios({
        url: `/post/job/${issueStatus === 1 ? "up" : "fail"}`,
        data: [this.id],
        method: "post",
      }).then((data) => {
        if (!data.data.code) {
          this.$message({
            message: "操作成功",
            type: "success",
            duration: 500,
            onClose: () => {
              this.visible = false;
              this.$emit("searchfunc");
              this.$emit("refreshdatalist");
            },
          });
        } else {
          this.$message.error(data.data.msg);
        }
      });
    },
  },
};
</script>

<style lang="less" >
//按钮样式修改
.el-button--default {
  background-color: transparent;
  border: none;
  color: rgba(rgb(255, 255, 255), 0.8);
}
.el-button--default:hover {
  background-color: transparent;
}
//dialog样式框调整
.el-dialog__title,
.el-dialog,
.el-form-item__label,
.el-descriptions__title {
  border-radius: 1em !important;
  background-color: #171834 !important;
  color: rgba(255, 255, 255, 0.6) !important;
}

//dialog样式框调整
/deep/.el-dialog {
  border-color: rgba(255, 255, 255, 0.5) !important;
  border: 2px !important;
  overflow: visible !important;
}
.el-descriptions-item {
  height: 200px;
}

.el-select-dropdown {
  background-color: #161933 !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.el-select-dropdown__item {
  background-color: #161933 !important;
  color: rgba(255, 255, 255, 0.6);
  border-radius: 0.5em;
}
.el-select-dropdown__item:hover {
  background-color: #21254b !important;
}
.el-dialog {
  border-color: rgba(255, 255, 255, 0.5) !important;
  border: 1px !important;
  overflow: visible !important;
  box-shadow: 0px 0px 7px rgba(143, 131, 255, 0.836);
}
.el-picker-panel__body-wrapper,
.el-popper {
  background-color: #161933 !important;
  border: 1px rgba(255, 255, 255, 0.2) !important;
  border-radius: 0.5em;
}
.el-popper {
  box-shadow: 0px 0px 3px rgba(255, 255, 255, 0.3);
}
/deep/div.popper__arrow::after {
  border-bottom-color: rgb(22 25 51) !important;
}
.margin-top {
  background-color: rgba(0, 0, 0, 0.3) !important;
}
.el-descriptions__title {
  background-color: transparent !important;
  border-radius: 0.5em;
}
.el-descriptions__body {
  background-color: transparent !important;
  color: rgba(255, 255, 255, 0.8);
  border-radius: 0.5em;
}
.el-descriptions-item__label.is-bordered-label {
  background-color: transparent !important;
}
.el-descriptions .is-bordered .el-descriptions-item__cell {
  border: none;
}
</style>