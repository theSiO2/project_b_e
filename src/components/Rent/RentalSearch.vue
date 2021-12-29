<template>
  <el-dialog
    title="高级搜索"
    :close-on-click-modal="true"
    :visible.sync="visible"
    :modal-append-to-body="false"
    width="600px"
  >
    <el-form label-position="right" label-width="100px" :model="searchForm">
      <el-form-item label="城市/地区：">
        <el-cascader
          v-model="region"
          :options="regionList"
          :props="defalutProps"
          @change="handleChange"
          style="width: 30%"
          placeholder="请选择地区"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select
          v-model="searchForm.houseStatus"
          placeholder="请选择状态"
          style="width: 100%"
          clearable
        >
          <el-option
            v-for="item in statusList"
            :key="item.id"
            :value="item.id"
            :label="item.label"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="租房价格：">
        <el-input-number
          v-model="searchForm.startPrice"
          :step="100.0"
          size="medium"
          controls-position="right"
          :min="0"
        ></el-input-number>
        <span class="line">—</span>
        <el-input-number
          v-model="searchForm.endPrice"
          :step="100.0"
          size="medium"
          controls-position="right"
          :min="0"
        ></el-input-number>
        <transition name="el-zoom-in-top">
          <div class="el-form-item__error" v-show="confmessage">
            最少租金不可高于最高租金
          </div>
        </transition>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="searchSubmit">搜索</el-button>
    </span>
  </el-dialog>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      visible: false,
      regionList: [],
      region: "",
      defalutProps: {
        value: "id",
        label: "name",
        children: "children",
      },
      searchForm: {
        cityId: "",
        regionId: "",
        houseStatus: "",
        startPrice: "",
        endPrice: "",
      },
      cityList: [],
      statusList: [
        { label: "待审核", value: 0 },
        { label: "通过", value: 1 },
        { label: "未通过", value: 2 },
      ],
    };
  },
  methods: {
    getRegionList() {
      axios.get("/attr/regions").then((data) => {
        this.regionList = data.data.regionList;
      });
    },

    init() {
      this.visible = true;
      this.$nextTick(() => {
        this.searchForm.cityId = "";
        this.searchForm.majorId = "";
        this.searchForm.issueStatus = "";
        this.searchForm.issueDate = "";
        this.getRegionList();
        this.getMajorList();
      });
    },
    getMajorList() {
      axios.get("/attr/majors").then((data) => {
        this.majorList = data.data.majorList;
      });
    },
    getRegionList() {
      axios.get("/attr/regions").then((data) => {
        this.regionList = data.data.regionList;
      });
    },
    searchSubmit() {
      this.$emit("searchfunc", this.searchForm); //自定义事件，让父组件执行监听的事件，传过去的参数为this.searchForm
      this.$emit("refreshdatalist", 1); //自定义事件，让父组件执行监听的事件，传过去的参数为1（代表跟新了搜索条件 ）
      this.visible = false;
    },
    handleChange() {
      this.searchForm.cityId = this.region[0];
      this.searchForm.regionId = this.region[1];
    },
  },
  computed: {
    confmessage() {
      if (this.searchForm.startPrice > this.searchForm.endPrice) return true;
      else return false;
    },
  },
};
</script>

<style lang="less" scoped>
//dialog样式框调整
/deep/.el-dialog__title,
/deep/.el-dialog,
/deep/.el-form-item__label,
/deep/.el-descriptions__title {
  border-radius: 1em !important;
  background-color: #171834;
  color: rgba(255, 255, 255, 0.6) !important;
}
//去除日历边框上下百边
.el-icon-arrow-right:before,
.el-icon-d-arrow-right,
.el-icon-arrow-left:before,
.el-icon-d-arrow-left {
  color: white !important;
}

//鼠标悬停样式
.customedDataPicker:hover,
.el-input__inner:hover {
  cursor: pointer;
}

// .el-descriptions-item {
//   height: 200px;
// }

//按钮样式修改
.el-button--default {
  background-color: transparent;
  border: none;
  color: rgba(rgb(255, 255, 255), 0.8);
}
.el-button--default:hover {
  background-color: transparent;
}
.el-button--primary {
  background-color: #2477ff;
  border: none;
}
.popper__arrow::after {
  border-color: rgb(22 25 51) !important ;
  border: 1px rgb(22 25 51) !important;
  background-color: rgb(22 25 51) !important;
}
</style>