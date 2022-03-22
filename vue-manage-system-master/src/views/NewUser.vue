<template>
  <div class="hello">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>使用者新增</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form v-for="(item, index) in Data" :key="index" :id="index" ref="form" :model="form" label-width="80px">
          <el-form-item label="ID">
            <el-input v-model="item.ID"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="item.Name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addUser">送出</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="ID">
            <el-input v-model="keywords"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="selectUser">查詢</el-button>
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
      Data : [],
      ID: "",
      name: "",
      keywords: "",
    };
  },
  methods: {
    addUser() {
      //
      let ID = this.ID;
      let name = this.name;
      axios
        .post("/api/user/addUser", {
          ID,
          name,
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
    selectUser() {
      let name = this.keywords;
      axios
        .post("api/user/selectUser", {
          name,
          // eslint-disable-next-line no-unused-vars
        })
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          // eslint-disable-next-line no-unused-vars
          let data = res.data;
          this.Data = data;
          console.log(data.Data)
          this.ID = data[0].ID;
          this.name = data[0].Name;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
