<template>
  <div>
    <el-card class="box-card companyContainer">
      <!-- 查询 -->
      <el-row :gutter="20" class="FirstRow">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="query" class="CusImput">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getDataList(1)"
              id="custom-btn"
            ></el-button>
          </el-input>
        </el-col>
        <el-button type="primary" @click="addOrUpdateHandle()"
          >新增公司</el-button
        >
        <el-button
          type="danger"
          @click="handleDelete()"
          :disabled="multipleSelection.length <= 0"
          >批量删除</el-button
        >
      </el-row>

      <el-table
        :data="tableData"
        style="width: 100%"
        class="table"
        v-loading="loading"
        @selection-change="handleSelectionChange"
        stripe
      >
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column prop="id" label="公司编号" min-width="80">
        </el-table-column>
        <el-table-column prop="name" label="公司名称" min-width="200">
        </el-table-column>
        <el-table-column prop="type" label="公司类型" min-width="150">
        </el-table-column>
        <el-table-column prop="size" label="公司规模" min-width="150">
        </el-table-column>
        <el-table-column prop="field" label="公司领域" min-width="150">
        </el-table-column>
        <el-table-column label="公司介绍" min-width="100">
          <template slot-scope="scope">
            <el-popover
              placement="bottom"
              title="公司介绍"
              trigger="click"
              width="400"
              :content="scope.row.introduce"
            >
              <el-link type="primary" slot="reference" :underline="false"
                >详细信息</el-link
              >
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="公司地址" width="400"      :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column label="操作" width="200px" >
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="addOrUpdateHandle(scope.row.id)"
              size="mini"
              type="primary"
            >
              编辑
            </el-button>
            <el-button
              @click.native.prevent="handleDelete(scope.row.id)"
              size="mini"
              type="danger"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>

      <!-- 弹窗, 新增 / 修改 -->
      <company-add-or-update
        v-if="addOrUpdateVisible"
        ref="addOrUpdate"
        @refreshDataList="getDataList"
      ></company-add-or-update>

      <!-- 弹窗, 高级搜索 -->
      <company-search
        v-if="searchVisible"
        ref="searchBox"
        @searchFunc="getSearchData"
        @refreshDataList="getDataList"
      >
      </company-search>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import { MessageBox } from "element-ui";
import companyAddOrUpdate from "./Company-add-or-update.vue";
export default {
  name: "Company",
  data() {
    return {
      tableData: [],
      query: "",
      pageNum: 1,
      pageSize: 10,
      total: 0,
      multipleSelection: [],
      addOrUpdateVisible: false,
      searchVisible: false,
      loading: true,
      cityId: "",
      majorId: "",
      ids: [],
      show: true,
    };
  },
  components: { companyAddOrUpdate },
  methods: {
    // 获得所有分页数据
    getDataList(flag) {
      console.log(flag);
      if (flag) {
        this.pageNum = 1;
      }
      axios
        .get("/post/company/list", {
          params: {
            query: this.query,
            pageNum: this.pageNum,
            pageSize: this.pageSize
          },
        })
        .then((data) => {
          console.log(data.data.page);
          this.tableData = data.data.page.list;
          this.total = data.data.page.totalCount;
        });
      this.loading = false;
    },

    // 处理添加和编辑功能
    addOrUpdateHandle(id) {
      console.log(id);
      this.addOrUpdateVisible = true;
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id);
      });
    },

    handleDelete(id) {
      if (id != undefined) {
        this.ids = [id];
      } else {
        this.ids = this.multipleSelection.map((item) => item.id);
      }
      MessageBox.confirm(
        "请谨慎使用，此操作将会删除公司信息以及公司下的所有岗位信息，确定要继续吗？",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          axios({
            url: '/post/company/delete',
            data: this.ids,
            method: 'post'
          })
          .then((data) => {
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
  created() {
    this.getDataList();
  },
};
</script>

<style lang="less" scoped>
.CusImput {
  margin-left: -20px;
  /deep/.el-icon-search {
    float: left;
    position: relative;
    left: -7px;
  }
}
/deep/.el-checkbox__inner {
  background-color: transparent !important;
}

.table {
  margin-top: 20px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  margin-top: 20px;
  width: 100%;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15) !important;
  border-radius: 10px;
}

.box {
  height: 700px;
}

.el-breadcrumb {
  font-size: 15px;
}

.el-pagination {
  margin-top: 20px;
  text-align: right;
  padding-right: 20px;
}
.table-wrapper,/deep/ tr,
.table-wrapper,/deep/ th,
.table-wrapper,/deep/ td {
  background-color: rgba(0, 0, 0, 0) !important;
  border-color: #040620;
  color: rgba(255, 255, 255, 0.8);
}

//表格斑马条纹
/deep/tr:nth-child(even) {
  background-color: rgba(0, 0, 0, 0.185) !important;
}
.companyContainer{
  background-color: rgba(0, 0, 0, 0.25);
}
//去除表格背景色
.table {
  margin-top: 20px;
  background-color: transparent !important;
}
.box-card {
  margin-top: 20px;
  width: 100%;
  border-radius: 1rem;
  border: none;
}
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
.FirstRow {
  padding-left: 20px;
  padding-top: 10px;
}
//输入框，下拉框样式调整
/deep/.el-input__inner {
  border: #040620 1px !important;
  color: rgba(255, 255, 255, 0.6) !important;
  background: rgba(0, 0, 0, 0.24);
}
// 搜索按钮样式微调
/deep/.el-input-group__append {
  background-color: transparent !important;
  border: none !important;
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
  color: rgb(#cacaca);
}
/deep/span.el-pagination__jump {
  position: relative;
  top: -5px;
  font-size: 16px !important;
  color: #cacaca;
}
//分页按钮样式
/deep/.btn-prev,
/deep/.btn-next,
/deep/.number,
/deep/.el-icon-more {
  background-color: transparent !important;
  color:#606266;
}
/deep/.active{
  color:#fff !important;
}
/deep/.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
   border-bottom: 1px solid #00091d !important;
}
//分页总数字体，颜色调整
/deep/.el-pager li {
  // font-size: 16px !important;
  // color: rgb(#cacaca);
}
/deep/span.el-pagination__jump {
  position: relative;
  top: -5px;
  font-size: 16px !important;
  color: #cacaca;
}
//表格单元格伪元素（鼠标悬停效果）
 /deep/.el-table__row:hover  > td {
  background-color: rgba(255, 255, 255, 0.2) !important;
  color: rgb(255, 255, 255);
}
//分页总数字体，颜色调整
/deep/.el-pagination__total {
  font-size: 16px !important;
  color: rgb(#cacaca);
}

//输入框，下拉框样式调整
/deep/.el-input__inner {
  border: #040620 1px !important;
  color: rgba(255, 255, 255, 0.6) !important;
  background: rgba(0, 0, 0, 0.24);
}
/deep/textarea{
  background-color: #111228 !important;
  border:none;
  color:rgba(255, 255, 255, 0.6) !important
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
</style>

