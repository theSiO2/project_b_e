<template>
  <el-dialog
    title="审核信息"
    :close-on-click-modal="false"
    :visible.sync="visible"
    :modal-append-to-body="false"
  >
    <el-descriptions
      class="margin-top"
      labelStyle="width:150px"
      title="基本信息"
      :column="1"
      border
    >
      <el-descriptions-item>
        <template slot="label"> 房源编号 </template>
        {{ this.list.hosId }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 房源地区 </template>
        {{ this.list.hosRegion }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 房源面积 </template>
        {{ this.list.hosArea }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 房源类型 </template>
        {{ this.list.hosType }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 房源楼层 </template>
        {{ this.list.hosFloor }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 房源朝向</template>
        {{ this.list.hosTowards }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 房源亮点</template>
        {{ this.list.hosTag }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 房源设施</template>
        {{ this.list.hosFacility }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 住宅类型 </template>
        {{ this.list.hosStyle }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 房源状态 </template>
        {{ this.list.hosStatus }}
      </el-descriptions-item>
    </el-descriptions>
    <br />
    <el-descriptions
      class="margin-top"
      title="租售详情"
      labelStyle="width:150px"
      :column="1"
      border
    >
      <el-descriptions-item>
        <template slot="label"> 租金 </template>
        {{ this.list.hosMoney }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 租赁方式 </template>
        {{ this.list.hosManner }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label"> 支付方式 </template>
        {{ this.list.hosPay }}
      </el-descriptions-item>
    </el-descriptions>
    <br />
    <el-descriptions class="margin-top" title="房源简介" :column="1" border>
      <el-descriptions-item>
        <template slot="label"> </template>
        {{ this.list.hosIntro }}
      </el-descriptions-item>
    </el-descriptions>
    <br />
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
      visible: true,
      list: {},
    };
  },
  methods: {
    init(id) {
      this.visible = true;

      axios.get(`/rent/house/` + id, {}).then((response) => {
        console.log(response.data.houseinfor);
        this.list = response.data.houseinfor;
      });
    },
    checkSubmit(issueStatus) {
      console.log("提交通过的ID："+this.list.hosId)
      axios({
        url: `/rent/house/${issueStatus === 1 ? "up" : "fail"}`,
        data: [this.list.hosId],
        method: "post",
      }).then((data) => {
        if (!data.data.code) {
          this.$message({
            message: "操作成功",
            type: "success",
            duration: 500,
            onClose: () => {
              this.visible = false;
              this.$emit("getDataList");
              // this.$emit("refreshdatalist");
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

<style>
</style>