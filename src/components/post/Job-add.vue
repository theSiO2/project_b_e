<template>
  <el-card class="box-card JobContainer">
    <el-form
      :model="jobForm"
      :rules="rules"
      ref="jobForm"
      label-width="130px"
      class="jobForm"
    >
      <el-form-item label="岗位名称" prop="name">
        <el-input
          v-model="jobForm.name"
          placeholder="请输入岗位名称"
        ></el-input>
      </el-form-item>

      <el-form-item label="月薪区间" required>
        <el-input-number
          v-model="jobForm.salaryMin"
          :precision="2"
          :step="1000.0"
          size="medium"
          controls-position="right"
          :min="0"
        ></el-input-number>
        <span class="line">—</span>
        <el-input-number
          v-model="jobForm.salaryMax"
          :precision="2"
          :step="1000.0"
          size="medium"
          controls-position="right"
          :min="0"
        ></el-input-number>
        <transition name="el-zoom-in-top" >
          <div class="el-form-item__error" v-show="confmessage">
            最少工资不可高于最高工资
          </div>
        </transition>
      </el-form-item>

      <el-form-item label="公司待遇" prop="welfare">
        <el-input
          v-model="jobForm.welfare"
          placeholder="五险一金 绩效奖金"
        ></el-input>
      </el-form-item>

      <el-form-item label="所在地区" prop="regionId" style="margin-right: 10px">
        <el-cascader
          v-model="region"
          :options="regionList"
          :props="defalutProps"
          @change="handleChange"
          style="width: 30%"
          placeholder="请选择地区"
        ></el-cascader>
      </el-form-item>

      <el-form-item label="所属专业" prop="majorId">
        <el-select
          v-model="jobForm.majorId"
          placeholder="请选择专业"
          style="width: 30%"
        >
          <el-option
            v-for="item in majorList"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="公司名称" prop="companyId">
        <el-select
          v-model="jobForm.companyId"
          filterable
          remote
          no-match-text
          placeholder="请输入公司名称"
          style="width: 100%"
          :remote-method="getRemoteData"
          :loading="loading"
        >
          <el-option
            v-for="item in companyNameList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="工作经验" prop="experience">
        <el-input
          v-model="jobForm.experience"
          placeholder="1年经验、无需经验"
        ></el-input>
      </el-form-item>

      <el-form-item label="学历要求" prop="education">
        <el-input v-model="jobForm.education" placeholder="本科"></el-input>
      </el-form-item>

      <el-form-item label="招聘人数" prop="peopleCount">
        <el-input
          v-model="jobForm.peopleCount"
          placeholder="招1人、招若干人"
        ></el-input>
      </el-form-item>

      <el-form-item label="岗位信息" prop="jobInfo">
        <el-input
          type="textarea"
          v-model="jobForm.jobInfo"
          :autosize="{ minRows: 15, maxRows: 15 }"
          :placeholder="postInfo"
          :rows="8"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('jobForm')"
          >发布岗位</el-button
        >
        <el-button @click="resetForm('jobForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import axios from "axios";
import { MessageBox } from "element-ui";
export default {
  name: "Issue",
  data() {
    return {
      defalutProps: {
        value: "id",
        label: "name",
        children: "children",
      },
      jobForm: {
        name: "",
        salaryMin: "",
        salaryMax: "",
        welfare: "",
        experience: "",
        education: "",
        peopleCount: "",
        issueDate: "",
        issueStatus: 0,
        jobInfo: "",
        regionId: "",
        regionParentId: "",
        majorId: "",
        companyId: "",
      },
      region: [],
      loading: false,
      majorList: [],
      regionList: [],
      companyNameList: [],
      postInfo: "岗位职责\n 1.xxxxx\n 2.xxxxx\n\n岗位要求\n 1.xxxxx\n 2.xxxxx",
      rules: {
        name: [{ required: true, message: "请输入岗位名称", trigger: "blur" }],
        salaryMin: [
          { required: true, message: "请输入最低薪资", trigger: "blur" },
        ],
        salaryMax: [
          { required: true, message: "请输入最高薪资", trigger: "blur" },
        ],
        regionId: [
          { required: true, message: "请选择地区", trigger: "change" },
        ],
        majorId: [{ required: true, message: "请选择专业", trigger: "change" }],
        companyId: [
          { required: true, message: "请输入公司名称", trigger: "change" },
        ],
        experience: [
          { required: true, message: "请输入工作经验", trigger: "blur" },
        ],
        education: [
          { required: true, message: "请输入学历要求", trigger: "blur" },
        ],
        peopleCount: [
          { required: true, message: "请输入招聘人数", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    open() {
      this.$message({
        message: "最低工资不得高于最高工资",
        type: "warning",
        duration: 500,
      });
    },
    salaryConfirm() {
      if (this.jobForm.salaryMin < this.jobForm.salaryMax) {
        this.$message({
          message: "最低工资不得高于最高工资",
          type: "warning",
          duration: 2000,
        });
      }
    },
    submitForm(formName) {
      if (this.jobForm.salaryMin > this.jobForm.salaryMax) {
        this.salaryConfirm();
      } else {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios
              .post("/post/job/save", {
                name: this.jobForm.name,
                salaryMin: this.jobForm.salaryMin,
                salaryMax: this.jobForm.salaryMax,
                welfare: this.jobForm.welfare,
                experience: this.jobForm.experience,
                education: this.jobForm.education,
                peopleCount: this.jobForm.peopleCount,
                issueDate: this.jobForm.issueDate,
                issueStatus: this.jobForm.issueStatus,
                jobInfo: this.jobForm.jobInfo,
                regionId: this.jobForm.regionId,
                regionParentId: this.jobForm.regionParentId,
                majorId: this.jobForm.majorId,
                companyId: this.jobForm.companyId,
              })
              .then((data) => {
                if (!data.data.code) {
                  this.$router.push("/success");
                }
              });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.region = [];
    },
    handleChange() {
      this.jobForm.regionParentId = this.region[0];
      this.jobForm.regionId = this.region[1];
    },
    getRemoteData(query) {
      axios
        .get("/post/company/name/list", {
          params: { query },
        })
        .then((data) => {
          this.companyNameList = data.data.companyNameList;
        });
    },
    getRegionList() {
      axios.get("/attr/regions").then((data) => {
        this.regionList = data.data.regionList;
      });
    },
    getMajorList() {
      axios.get("/attr/majors").then((data) => {
        this.majorList = data.data.majorList;
      });
    },
  },
  computed: {
    confmessage() {
      if (this.jobForm.salaryMin > this.jobForm.salaryMax)
        return true;
      else
        return false;
    },
  },
  mounted() {
    this.getRegionList();
    this.getMajorList();
  },
};
</script>

<style lang="less">
.el-input-number__increase::after {
  border-bottom: #040620 1px soild !important;
}
.el-form-item__label {
  background-color: transparent !important;
}
.box-card {
  margin-top: 20px;
  width: 100%;
  border-radius: 1rem;
  border: none;
  background-color: rgba(0, 0, 0, 0.25);
}
//输入框，下拉框样式调整
.el-input__inner {
  border: #040620 1px !important;
  color: rgba(255, 255, 255, 0.6) !important;
  background: rgba(0, 0, 0, 0.24);
}
//文字区域样式微调
textarea {
  background: rgba(0, 0, 0, 0.24) !important;
  border: none !important;
  color: rgba(255, 255, 255, 0.6) !important;
}
textarea:placeholder-shown {
  color: rgba(255, 255, 255, 0.3) !important;
}
.el-input-number__decrease,
.el-input-number__increase {
  background: #474d84 !important;
  border-left: none !important;
  //  border-top:#040620 1px solid;
  //   border-bottom:#040620 1px solid;
  color: #8d91a7;
}
.el-input-number.is-controls-right .el-input-number__increase {
  border-bottom: 1px solid #0e0e23;
}
// .is-disabled {
//   // background: #9896ff !important;
//   // cursor: pointer !important;
// }
.line {
  color: #8d91a7;
}
.el-input__inner::placeholder,
textarea::placeholder {
  color: rgba(255, 255, 255, 0.18) !important;
}
.el-cascader-node {
  border-radius: 0.5em;
}
.el-cascader-node:not(.is-disabled):focus,
.el-cascader-node:not(.is-disabled):hover {
  background: #21254b;
}
.el-cascader-menu {
  border-right: solid 1px#2d2d3e;
}
</style>