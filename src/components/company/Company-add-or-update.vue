<template>
  <el-dialog
    :title="!dataForm.id ? '新增公司' : '修改公司'"
    :close-on-click-modal="false"
    :visible.sync="visible"
      :modal-append-to-body="false"
  >
    <el-form
      :model="dataForm"
      :rules="dataRule"
      ref="dataForm"
      label-width="140px"
    >
      <el-form-item label="公司名称:" prop="name">
        <el-input
          v-model="dataForm.name"
          placeholder="请输入公司名称"
        ></el-input>
      </el-form-item>

      <el-form-item label="公司类型:" prop="type">
        <el-select
          v-model="dataForm.type"
          placeholder="请选择公司类型"
          style="width: 100%"
        >
          <el-option
            v-for="item in typeList"
            :key="item.index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="公司规模:" prop="size">
        <el-select
          v-model="dataForm.size"
          placeholder="请选择公司规模"
          style="width: 100%"
        >
          <el-option
            v-for="item in sizeList"
            :key="item.index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="公司领域:" prop="field">
        <el-input
          v-model="dataForm.field"
          placeholder="请输入公司领域"
        ></el-input>
      </el-form-item>

      <el-form-item label="公司介绍:" prop="introduce">
        <el-input
          v-model="dataForm.introduce"
          placeholder="请输入公司介绍"
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 10 }"
        ></el-input>
      </el-form-item>

      <el-form-item label="所在城市:" prop="cityId">
        <el-select
          v-model="dataForm.cityId"
          placeholder="请选择所在城市"
          style="width: 100%"
        >
          <el-option
            v-for="item in cityList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="详细地址:" prop="address">
        <el-input
          v-model="dataForm.address"
          placeholder="请输入公司地址"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        name: "",
        type: "",
        size: "",
        field: "",
        introduce: "",
        cityId: "",
        address: "",
      },
      sizeList: [
        "少于50人",
        "50-150人",
        "150-500人",
        "500-1000人",
        "1000-5000人",
        "5000-10000人",
        "10000人以上",
      ],
      typeList: [
        "民营企业",
        "国企",
        "合资",
        "创业公司",
        "上市公司",
        "外资（欧美）",
        "外资（非欧美）",
      ],
      cityList: [],
      dataRule: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        type: [
          { required: true, message: "公司类型不能为空", trigger: "change" },
        ],
        size: [
          { required: true, message: "公司规模不能为空", trigger: "change" },
        ],
        field: [
          { required: true, message: "公司领域不能为空", trigger: "blur" },
        ],
        address: [
          { required: true, message: "公司地址不能为空", trigger: "blur" },
        ],
        cityId: [
          { required: true, message: "所在城市不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].resetFields();
        this.dataForm.type = "";
        this.dataForm.size = "";
        this.dataForm.cityId = "";
        this.getCityList();
        if (this.dataForm.id) {
          axios.get("/post/company/" + id).then((data) => {
            console.log(data.data);
            this.dataForm.name = data.data.company.name;
            this.dataForm.type = data.data.company.type;
            this.dataForm.size = data.data.company.size;
            this.dataForm.field = data.data.company.field;
            this.dataForm.introduce = data.data.company.introduce;
            this.dataForm.address = data.data.company.address;
            this.dataForm.cityId = data.data.company.cityId;
          });
        }
      });
    },
    dataFormSubmit() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          console.log(this.dataForm.id);
          axios
            .post(`/post/company/${!this.dataForm.id ? "save" : "update"}`, {
              id: this.dataForm.id || undefined,
              name: this.dataForm.name,
              type: this.dataForm.type,
              size: this.dataForm.size,
              field: this.dataForm.field,
              introduce: this.dataForm.introduce,
              address: this.dataForm.address,
              cityId: this.dataForm.cityId
            })
            .then((data) => {
              if (!data.data.code) {
                this.$message({
                  message: "操作成功",
                  type: "success",
                  duration: 500,
                  onClose: () => {
                    this.visible = false;
                    this.$emit("refreshDataList");
                  },
                });
              } else {
                this.$message.error(data.data.msg);
              }
            });
        }
      });
    },
    getCityList() {
      axios.get("/attr/cities").then((data) => {
        this.cityList = data.data.cityList;
      });
    },
  },
};
</script>