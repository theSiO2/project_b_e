<template>
  <ul class="outest">
    <li v-for="(Item, Index) in messageList" :key="Index" class="inner">
      <div class="container">
        <div class="job-primary">
          <div class="message-item jobName">{{ Item.jobName }}</div>

          <div class="message-item companyName">{{ Item.companyName }}</div>
          <div class="message-item primaryGroup">
            <div class="message-item salaryText">{{ Item.salaryText }}</div>
            <div class="message-item experience">{{ Item.experience }}</div>
            <div class="message-item education">{{ Item.education }}</div>
          </div>
          <div class="message-item typeGroup">
            <div class="message-item type">{{ Item.type }}</div>
            <div class="message-item size">{{ Item.size }}</div>
          </div>
        </div>
        <div class="job-bottom">
          <div class="message-item area">{{ Item.area }}</div>
          <div class="message-item welfare">{{ Item.welfare }}</div>
        </div>
      </div>
    </li>
    <div class="message-item-pagination">
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="totalCount"
        :page-size="pageSize"
        :current-page.sync="pageNum"
        @current-change="getDataList"
      >
      </el-pagination>
    </div>
  </ul>
</template>
<style>
.message-item-pagination {
  margin: auto;
  display: inline-block;
  padding: 0px;
  width: 900px;
  margin: auto;
  position: relative;
  left: -32px;
}
.pagination {
  margin: auto;
}
.primaryGroup {
  float: left;
  position: relative;
  top: 20px;
  left: 10px;
}
.message-item.typeGroup {
  position: relative;
  top: 10px;
  left: 500px;
  color: rgb(32, 32, 32);
}
.container {
  width: 100%;
  height: 130px;
}
.job-primary {
  height: 70%;
  width: 100%;
  color: rgb(32, 32, 32);
  background-color: rgb(255, 255, 255);
  margin: 0px;
  padding: 0px;
}
.job-bottom {
  height: 30%;
  width: 100%;
  /* color: black; */
  background-color: rgb(221, 221, 221);
  margin: 0px;
  padding: 0px;
}
.message-item {
  margin: 0px;
  font-size: 10px;
  width: auto;
  height: 15px;
  padding-top: 0px;
  float: none;
}
.inner {
  /* display: list-item; */
  /* text-align: -webkit-match-parent; */
  padding: 0px;
  width: 900px;
  margin: auto;
  position: relative;
  left: -33px;
  padding-bottom: 10px;
}
.outest {
  background-color: #fafafa;
  width: 900px;
  height: auto;
  list-style: none;
  margin: auto;
}
.message-item.jobName {
  color: #00c2b3;
  position: relative;
  top: 10px;
  left: 20px;
  font-size: 20px;
  /* font-weight:bold; */
  /* display: inline-block; */
}

.message-item.salaryText {
  color: #fc703e;
  /* position: relative;
  top: 30px;
  left: 20px; */
  font-size: 20px;
  display: inline-block;
  margin-left: 10px;
}
.message-item.companyName {
  color: #00c2b3;
  position: relative;
  top: -10px;
  left: 500px;
  font-size: 20px;
}
.message-item.experience {
  color: #3b3b3b;
  /* position: relative;
  top: 15px;
  left: 10px; */
  font-size: 15px;
  /* float: left; */
  display: inline-block;
  padding-left: 10px;
}
.message-item.education {
  color: #3b3b3b;
  /* position: relative;
  top: -22px;
  right: -100px; */
  font-size: 15px;
  /* float: left; */
  padding-left: 10px;
  display: inline-block;
}
.message-item.welfare {
  font-size: 13px;
  position: relative;
  top: -5px;
  left: 500px;
  width: 320px;
  height: 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: #000000;
}
.type {
  display: inline-block;
  margin-right: 5px;
}
.size {
  display: inline-block;
  margin-left: 5px;
}
.message-item.area {
  position: relative;
  top: 10px;
  left: 20px;
  font-size: 13px;
  color: #3b3b3b;
}
</style>
<script>
import axios from "axios";
export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 6,
      totalCount:1,
      messageList: [],
    };
  },
  methods: {
    getDataList() {
      console.log("当前页数"+this.pageNum)
      axios
        .get("/api/job/list", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
          },
        })
        .then((response) => {
          console.log("条数",response.data);
          this.messageList = response.data.page.list;
          this.totalCount=response.data.page.totalCount;
        });
    },
  },
  mounted() {
    this.getDataList("/post/job/list");
  },
};
</script>

