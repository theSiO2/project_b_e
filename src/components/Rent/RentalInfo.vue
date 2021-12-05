<template>
  <el-card class="box-card JobContainer">
    <!-- 查询 -->
    <el-row :gutter="20" class="FirstRow">
      <el-col :span="8">
        <el-input
          placeholder="请输入内容"
          v-model="queryInfo.query"
          class="CusImput"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            id="custom-btn"
            @click="getDataList(1)"
            style="margin-left: -20px"
          ></el-button>
        </el-input>
      </el-col>
      <el-button
        type="primary"
        icon="el-icon-search"
        style="margin-left: -20px"
        autosize="true"
        size="small"
        id="advanced_search"
        @click="openSearchBox()"
        >高级搜索</el-button
      >

      <el-button
        type="primary"
        size="small"
        style="margin-left: 10px"
        @click="HandlePush('通过')"
        id="Batch_push"
        >批量推送</el-button
      >
      <el-button type="danger" size="small" id="Batch_off_shelf"
        >批量下架</el-button
      >
    </el-row>
    <!-- 表格主体 -->
    <div class="table-wrapper">
      <el-table
        :data="housingList"
        style="width: 100%"
        class="table customer-table"
        empty-text="暂无数据"
      >
        <el-table-column type="selection"> </el-table-column>
        <el-table-column prop="hosId" label="编号" min-width="50px">
        </el-table-column>
        <el-table-column label="缩略图">
          <template slot-scope="scope">
            <el-image
              style="width: 80px; height: 60px"
              :src="scope.row.hosSmallImg"
              :preview-src-list="scope.row.hosSmallImg.split(' ')"
              fit="fill"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column
          prop="hosTitle"
          label="房源标题"
          min-width="205px"
          transition="fade-in-linear"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column label="租金" prop="hosMoney"> </el-table-column>
        <el-table-column label="租赁方式" prop="hosManner"> </el-table-column>
        <el-table-column label="面积" prop="hosArea"> </el-table-column>
        <el-table-column label="地区" prop="hosRegion"> </el-table-column>
        <el-table-column label="状态" prop="hosStatus"> </el-table-column>
        <el-table-column label="发布日期" prop="hosDate"> </el-table-column>
        <el-table-column label="操作" min-width="100px">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="openDialog(scope.row.hosId)"
              type="primary"
              size="mini"
              >审核</el-button
            >
            <el-button
              @click.native.prevent="openDialog(scope.row.hosId)"
              type="danger"
              size="mini"
              >下架</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- <el-dialog
      title="详细信息"
      :visible.sync="dialogVisible"
      width="40%"
      :close-on-click-modal="true"
      :modal-append-to-body="false"
    >
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="房源设施：">
          <span>{{ this.dialog.hosFacility }}</span>
        </el-form-item>
        <el-form-item label="楼层：">
          <span>{{ this.dialog.hosFloor }}</span>
        </el-form-item>
        <el-form-item label="朝向：">
          <span>{{ this.dialog.hosTowards }}</span>
        </el-form-item>
        <el-form-item label="交付方式：">
          <span>{{ this.dialog.hosPay }}</span>
        </el-form-item>
        <el-form-item label="房源简介：">
          <span>{{ this.dialog.hosIntro }}</span>
        </el-form-item>
        <el-form-item label="房源亮点：">
          <span>{{ this.dialog.hosTag }}</span>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkSubmit('通过')">通过</el-button>
        <el-button type="danger" @click="checkSubmit('未通过')"
          >不通过</el-button
        >
      </span>
    </el-dialog> -->
    <!-- 表尾分页 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.currentPage"
      :page-sizes="[5, 10, 20, 30, 40]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.totalCount"
    >
    </el-pagination>
    <rental-check
      v-if="dialogVisible"
      ref="rentalCheck"
      @getDataList="getDataList"
    >
    </rental-check>
    <rental-search  v-if="searchVisible" ref="RentalSearchBox"></rental-search>
  </el-card>
</template>

<script>
import RentalCheck from "./RentalCheck.vue";
import RentalSearch from './RentalSearch.vue';
import axios from "axios";
export default {
  components: { RentalCheck,RentalSearch },
  data() {
    return {
      loading: "",
      dialogVisible: false,
      searchVisible: false,
      page: {
        totalCount: "",
        pageSize: 10,
        totalPage: "",
        currentPage: 1,
      },
      housingList: [
        {
          hosId: 1,
          hosTitle: "邮电公寓 一楼独卫出租 拎包入住",
          hosMoney: "900.00元/月",
          hosPay: "付1押1",
          hosManner: "整租",
          hosStyle: "普通住宅",
          hosType: "3室2厅2卫",
          hosTowards: "朝南",
          hosTag: "精装修",
          hosIntro:
            "精装修，拎包入住，基础设施完善（冰箱、空调、洗衣机、热水器...）;\n随时入住，已空出房间，卫生打扫完;\n阳光充足，采光好;\n格局好，全明格局;\n成熟社区，设施配套齐全;\n屋内设施齐全，小区周边环境好，交通便利;",
          hosSmallImg:
            "https://pic1.ajkimg.com/display/anjuke/cbb95d80b521160426a8e7114f3d84b8/600x450c.jpg?t=1&srotate=1",
          hosImgUrl: null,
          hosRegion: "南京-江宁区",
          hosFacility:
            "电视 空调 衣柜 床 阳台 暖气 冰箱 洗衣机 热水器 宽带 沙发 可做饭 ",
          hosArea: "18平方米",
          hosFloor: "中层(共6层)",
          hosDate: "2021-11-25",
          hosStatus: "待审核",
          cmyId: null,
          regionId: null,
          cityId: null,
        },
        {
          hosId: 2,
          hosTitle: "竹山路地铁口 潭桥公寓 有志大厦 武夷绿洲 太阳城 非中介",
          hosMoney: "850.00元/月",
          hosPay: null,
          hosManner: "合租",
          hosStyle: "普通住宅",
          hosType: null,
          hosTowards: null,
          hosTag: null,
          hosIntro: null,
          hosSmallImg:
            "https://pic1.ajkimg.com/display/anjuke/2ee89208621ed440cf7abdbaefb9850c/600x450c.jpg?t=1&srotate=1",
          hosImgUrl: null,
          hosRegion: "南京-江宁区",
          hosFacility: null,
          hosArea: null,
          hosFloor: null,
          hosDate: "2021-11-25",
          hosStatus: "待审核",
          cmyId: null,
          regionId: null,
          cityId: null,
        },
      ],
      queryInfo: {
        query: "",
        cityId: "",
        regionId: "",
        startPrice: "",
        endPrice: "",
        hosStatus: "",
        pageNum: "",
        pageSize: "",
      },
      dialog: {
        hosFacility: "",
        hosFloor: "",
        hosTowards: "",
        hosPay: "",
        hosIntro: "",
        hosTag: "",
      },
    };
  },
  methods: {
    openSearchBox() {
      this.searchVisible = true;
      this.$nextTick(() => {
        this.$refs.RentalSearchBox.init();
      });
    },
    // 处理一页显示多少条数据
    handleSizeChange(val) {
      this.page.pageSize = val;
      console.log(`每页 ${this.page.pageSize} 条`);
      this.getDataList();
    },
    // 处理当前页
    handleCurrentChange(val) {
      this.page.currentPage = val;
      console.log(`当前页: ${this.page.currentPage}`);
      this.getDataList();
    },

    openDialog(id) {
      this.dialogVisible = true;
      console.log("审核ID：" + id);
      this.$nextTick(() => {
        this.$refs.rentalCheck.init(id);
      });
    },
    getDataList(num) {
      if (num === 1) {
        console.log("普通搜索");
        this.page.currentPage = 1;
      }
      console.log("更新列表");
      console.log(this.queryInfo);
      axios
        .get("/rent/house/houselists", {
          params: {
            query: this.queryInfo.query,
            cityId: this.queryInfo.cityId,
            regionId: this.queryInfo.regionId,
            startPrice: this.queryInfo.startPrice,
            endPrice: this.queryInfo.endPrice,
            hosStatus: this.queryInfo.hosStatus,
            pageNum: this.page.currentPage,
            pageSize: this.page.pageSize,
          },
        })
        .then((response) => {
          console.log(response.data.page);
          this.housingList = response.data.page.list;
          this.page.totalPage = response.data.page.totalPage;
          this.page.totalCount = response.data.page.totalCount;
        });
      this.loading = false;
    },
    // checkSubmit(issueStatus) {
    //   axios({
    //     url: `/post/job/${issueStatus === 1 ? "up" : "fail"}`,
    //     data: [this.id],
    //     method: "post",
    //   }).then((data) => {
    //     if (!data.data.code) {
    //       this.$message({
    //         message: "操作成功",
    //         type: "success",
    //         duration: 500,
    //         onClose: () => {
    //           this.visible = false;
    //           this.$emit("searchfunc");
    //           this.$emit("refreshdatalist");
    //         },
    //       });
    //     } else {
    //       this.$message.error(data.data.msg);
    //     }
    //   });
    // },
  },
  mounted() {
    this.getDataList();
  },
};
</script>

<style lang="less" scoped>
//-----------------------------按钮样式-----------------------------

// 批量下架按钮禁用状态
/deep/.passed:disabled,
.disabled:disabled {
  background: #fab6b6 !important;
}
// 搜索框搜索按钮样式
/deep/#custom-btn {
  background-color: #474d84 !important;
  border: none !important;
  height: 37.5px !important;
  width: 30px !important;
  position: relative;
  top: 1.5px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
// 搜索按钮样式微调
/deep/.el-input-group__append {
  background-color: transparent !important;
  border: none !important;
}

//高级搜索按钮样式
/deep/#advanced_search {
  color: rgb(#e9e9e9) !important;
  background-color: #2477ff !important;
  border: #2477ff !important;
  height: 36px;
}

//批量推送，批量删除按钮样式
/deep/#Batch_push,
#Batch_off_shelf {
  color: rgb(#e9e9e9) !important;
  height: 36px;
}
//审核按钮样式
/deep/.el-button.el-button--primary.el-button--mini {
  color: rgb(#e9e9e9);
  background-color: #2477ff;
  border: none;
}

//下架按钮样式
/deep/.el-button.el-button--danger.el-button--mini {
  color: rgb(#e9e9e9);
  background-color: #ad2229;
  border: none;
}
//分页按钮样式
/deep/.btn-prev,
/deep/.btn-next,
/deep/.number,
.active,
/deep/.el-icon-more {
  background-color: transparent !important;
}
//输入框，下拉框样式调整
/deep/.el-input__inner {
  border: #040620 1px !important;
  color: rgba(255, 255, 255, 0.6) !important;
  background: rgba(0, 0, 0, 0.24);
}

//-----------------------------输入框样式-----------------------------
/deep/[data-v-16c20ebe] .el-input__inner {
  height: 38px !important;
}

// ----------------------------复选框样式-----------------------------
/deep/.el-checkbox__inner {
  background-color: transparent !important;
}

// ----------------------------定位微调-----------------------------
//搜索框和按钮微调
.CusImput {
  margin-left: -20px;
  /deep/.el-icon-search {
    float: left;
    position: relative;
    left: -7px;
  }
}
//分页下拉框定位微调
/deep/.el-pagination .el-select .el-input .el-input__inner {
  position: relative !important;
  top: -5px !important;
}
// ----------------------------表格内外微调-----------------------------
.FirstRow {
  padding-left: 20px;
  padding-top: 10px;
}
// ----------------------------表格样式-----------------------------
//上边框去除
/deep/.is-leaf {
  border-bottom: 1px solid #00091d !important;
}
//下边框去除
body .el-table::before {
  z-index: inherit;
}
//首行边框去除
/deep/.table > :not(:first-child) {
  border: none !important;
}
//表格外边框去除，表格边框圆角
.box-card {
  margin-top: 20px;
  width: 100%;
  border-radius: 1rem;
  border: none;
}
//表格内背景色去除，边框颜色调整
.table-wrapper /deep/ tr,
.table-wrapper /deep/ th,
.table-wrapper /deep/ td {
  background-color: rgba(0, 0, 0, 0) !important;
  border-color: #040620;
  color: rgba(255, 255, 255, 0.8);
}

//表格斑马条纹
/deep/tr:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.185) !important;
}
//表格背景色
.JobContainer {
  background-color: rgba(0, 0, 0, 0.25);
}
//去除表格背景色
.table {
  margin-top: 20px;
  background-color: transparent !important;
}
//表格单元格伪元素（鼠标悬停效果）
.table-wrapper /deep/ .el-table tbody tr:hover > td {
  background-color: rgba(255, 255, 255, 0.2) !important;
  color: rgb(255, 255, 255);
}
//----------------------------分页模块----------------------------
//分页模块位置调整
.el-pagination {
  margin-top: 20px;
  text-align: right;
  padding-right: 20px;
}
//分页总数字体，颜色调整
/deep/.el-pagination__total {
  font-size: 16px !important;
  color: rgb(#cacaca) !important;
}
/deep/span.el-pagination__jump {
  position: relative;
  top: -5px;
  font-size: 16px !important;
  color: #cacaca !important;
}
</style>