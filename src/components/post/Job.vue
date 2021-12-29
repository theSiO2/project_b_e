<template>
  <el-card class="box-card JobContainer">
    <!-- 查询 -->
    <el-row :gutter="20" class="FirstRow">
      <el-col :span="8">
        <el-input
          placeholder="请输入内容"
          v-model="queryInfo.query"
          class="CusImput"
          @keyup.enter.native="getDataList(1)"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            id="custom-btn"
            @click="getDataList(1)"
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
        :disabled="multipleSelection.length <= 0"
        id="Batch_push"
        >批量推送</el-button
      >
      <el-button
        type="danger"
        size="small"
        @click="handleDelete()"
        :disabled="multipleSelection.length <= 0"
        id="Batch_off_shelf"
        >批量下架</el-button
      >
    </el-row>
    <!-- 表格主体 -->
    <div class="table-wrapper">
      <el-table
        :data="tableData"
        style="width: 100%"
        class="table customer-table"
        :v-loading="loading"
        @selection-change="handleSelectionChange"
        empty-text="暂无数据"
      >
        <el-table-column type="selection"> </el-table-column>
        <el-table-column prop="id" label="编号" min-width="120px">
        </el-table-column>
        <el-table-column
          prop="name"
          label="岗位名称"
          min-width="205px"
          transition="fade-in-linear"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column prop="salary" label="薪资" min-width="120px">
        </el-table-column>
        <el-table-column
          prop="welfare"
          label="待遇"
          min-width="280px"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          prop="region"
          label="地区"
          min-width="120px"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column label="招聘要求" min-width="80px">
          <template slot-scope="scope">
            <el-popover
              popper-class="popoverBackB"
              placement="bottom"
              title="岗位要求"
              trigger="click"
              transition="fade-in-linear"
              :content="scope.row.jobInfo"
            >
              <el-link type="primary" slot="reference" :underline="false"
                >详细信息</el-link
              >
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="experience" label="工作经验" min-width="100px">
        </el-table-column>
        <el-table-column prop="education" label="学历" min-width="60px">
        </el-table-column>
        <el-table-column prop="peopleCount" label="招人数" min-width="90px">
        </el-table-column>
        <el-table-column prop="issueStatus" label="状态" min-width="70px">
        </el-table-column>
        <el-table-column prop="issueDate" label="发布日期" min-width="170px">
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          label="操作"
          min-width="160px"
        >
          <!-- 单条数据操作 -->
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="handleCheck(scope.row.id)"
              class="passed"
              type="primary"
              size="mini"
            >
              审核
            </el-button>
            <el-button
              @click.native.prevent="handleDelete(scope.row.id)"
              :disabled="
                scope.row.issueStatus == `待审核` ||
                scope.row.issueStatus == `未通过`
              "
              class="disabled"
              type="danger"
              size="mini"
            >
              下架
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 表尾分页 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[5, 10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 子组件弹窗,单个 新增 / 修改 -->
    <job-check
      v-if="jobCheckVisible"
      ref="jobCheck"
      @searchfunc="getSearchData"
      @refreshdatalist="getDataList"
    ></job-check>
    <!-- 子组件弹窗, 高级搜索 -->
    <job-search
      @searchfunc="getSearchData"
      @refreshdatalist="getDataList"
      v-if="searchVisible"
      ref="searchBox"
    >
    </job-search>
  </el-card>
</template>


<style lang="less"  scoped>
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
//设置el-input_inner

// /deep/ .el-input__inner {
//   height: 47px;
//   background-color: rgba(255, 255, 255, 0.1);
// }
// /deep/ .el-form-item {
//   background-color: unset !important;
// }
// .el-input__inner /deep/ .el-input__inner {
//   height: 47px;
//   background-color: rgba(255, 255, 255, 0.247);
// }

/**表格背景透明 */

// .table-wrapper /deep/ .el-table,
// .el-table__expanded-cell {
//   background-color: transparent !important;
//   color: rgba(255, 255, 255, 0.8);
// }

// .el-table /deep/ thead {
//   border: none;
// }

// .table-wrapper /deep/ .el-table__row {
//   color: #46d4ff;
//   color: rgba(255, 255, 255, 0.8);
// }
/**表格背景透明end */

// .text {
//   font-size: 14px;
// }

// .item {
//   margin-bottom: 18px;
// }

// .box {
//   height: 700px;
// }

// .el-breadcrumb {
//   font-size: 15px;
// }

/* 使表格背景透明 */
// .el-table th,
// .el-table tr {
//   background-color: transparent;
// }

// /deep/.el-input__inner::placeholder {
//   color: rgba(255, 255, 255, 0.6) !important;
// }

// .el-popover {
//   background: #040620 !important;
//   color: #e9e9e9 !important;
// }

// /deep/.el-dialog {
//   border-color: rgba(255, 255, 255, 0.5) !important;
//   border: 2px !important;
//   overflow: visible !important;
// }
// /deep/.el-pagination /deep/.el-select /deep/.el-inputel-input__inner {
//   position: relative !important;
//   top: -10px !important;
// }
// /deep/input.el-input__inner {
//   position: relative !important;
//   top: 0px !important;
// }

// /deep/.el-pagination__jump {

// }
</style>


<script>
import axios from "axios";
import jobCheck from "./Job-check.vue";
import JobSearch from "./Job-search.vue";
import { MessageBox } from "element-ui";

export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      multipleSelection: [],
      jobCheckVisible: false,
      loading: true,
      cityId: "",
      majorId: "",
      ids: [],
      pageNum: 1,
      pageSize: 10,
      tableData: [],
      total: 0,
      jobCheckVisible: false,
      searchVisible: false,
      queryInfo: {
        query: "",
        cityId: "",
        majorId: "",
        issueStatus: "",
        issueDate: "",
      },
    };
  },
  components: {
    jobCheck,
    JobSearch,
  },
  methods: {
    openSearchBox() {
      this.searchVisible = true;
      this.$nextTick(() => {
        this.$refs.searchBox.init();
      });
    },
    getSearchData(searchData) {
      console.log("search");
      this.queryInfo.cityId = searchData.cityId;
      this.queryInfo.majorId = searchData.majorId;
      this.queryInfo.issueDate = searchData.issueDate;
      this.queryInfo.issueStatus = searchData.issueStatus;
      console.log(this.queryInfo);
    },
    getDataList(num) {
      if (num === 1) {
        console.log("普通搜索");
        this.pageNum = 1;
      }
      console.log("更新列表");
      console.log(this.queryInfo);
      axios
        .get("/post/job/list", {
          params: {
            query: this.queryInfo.query,
            cityId: this.queryInfo.cityId,
            majorId: this.queryInfo.majorId,
            issueStatus: this.queryInfo.issueStatus,
            issueDate: this.queryInfo.issueDate,
            pageNum: this.pageNum,
            pageSize: this.pageSize,
          },
        })
        .then((response) => {
          console.log(response.data.page);
          this.tableData = response.data.page.list;
          this.total = response.data.page.totalCount;
        });
      this.loading = false;
    },
    TableCellStyle(row, column, rowIndex, columnIndex) {
      if (!row.columnIndex) {
        return " background-color: rgba(0, 0, 0, 0.5) !important;";
      } else {
        if (row.columnIndex < 11) {
          return "background-color:  rgba(255, 255, 255, 0.3)";
        } else {
          return null;
        }
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    handleDelete(id) {
      if (id != undefined) {
        this.ids = [id];
      } else {
        this.ids = this.multipleSelection.map((item) => item.id);
      }
      MessageBox.confirm(
        `确定对[岗位Id=[${this.ids.join(",")}]进行[${
          id ? "删除" : "批量删除"
        }]操作?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          axios({
            url: `/post/job/down`,
            data: this.ids,
            method: "post",
          }).then((data) => {
            if (!data.data.code) {
              this.$message({
                message: "操作成功",
                type: "success",
                duration: 500,
                onClose: () => {
                  this.getDataList();
                },
              });
            } else {
              this.$message.error(data.data.msg);
            }
          });
        })
        .catch(() => {});
    },
    HandlePush(status) {
      this.ids = this.multipleSelection.map((item) => {
        return item.id;
      });
      axios.post("/post/job/up", { ids: this.ids, status }).then((response) => {
        if (!response.data.code) {
          this.$message({
            message: "操作成功",
            type: "success",
            duration: 500,
            onClose: () => {
              this.visible = false;
              this.getDataList();
            },
          });
        } else {
          this.$message.error(response.data.msg);
        }
      });
    },
    handleCheck(id) {
      this.jobCheckVisible = true;
      this.$nextTick(() => {
        this.$refs.jobCheck.init(id);
      });
    },
    // 处理一页显示多少条数据
    handleSizeChange(val) {
      this.pageSize = val;
      console.log(`每页 ${this.pageSize} 条`);
      this.getDataList();
    },
    // 处理当前页
    handleCurrentChange(val) {
      this.pageNum = val;
      console.log(`当前页: ${this.pageNum}`);
      this.getDataList();
    },
    // 处理被选项
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
  mounted() {
    this.getDataList();
  },
};
</script>

