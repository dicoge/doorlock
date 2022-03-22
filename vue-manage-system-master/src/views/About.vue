<template>
  <div class="hello">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>信標新增</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="UUID">
            <el-input v-model="UUID"></el-input>
          </el-form-item>
          <el-form-item label="Major">
            <el-input v-model="Major"></el-input>
          </el-form-item>
          <el-form-item label="Minor">
            <el-input v-model="Minor"></el-input>
          </el-form-item>
          <el-form-item label="Mac">
            <el-input v-model="Mac"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addBeacon">送出</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  props: {
    msg: String,
  },
  data() {
    return {
      UUID: "",
      Major: "",
      Minor: "",
      Mac: "",
      keywords: "",
    };
  },
  methods: {
    addBeacon() {
      //
      let UUID = this.UUID;
      let Major = this.Major;
      let Minor = this.Minor;
      let Mac = this.Mac;
      axios
        .post("/api/user/addBeacon", {
          UUID,
          Major,
          Minor,
          Mac,
          // eslint-disable-next-line no-unused-vars
        })
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          alert("信息添加成功");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
