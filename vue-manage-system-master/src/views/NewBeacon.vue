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
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="使用者編號">
            <el-input v-model="keywords"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="keywords1"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="selectUser">查詢</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="Data"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="UUID" label="UUID"></el-table-column>
        <el-table-column prop="Major" label="Major"></el-table-column>
        <el-table-column prop="Minor" label="Minor"></el-table-column>
        <el-table-column prop="Mac" label="Mac"></el-table-column>
        <el-table-column prop="State" label="State">
          <template #default="scope">
                        <span v-if="scope.row.State==1">停用中</span>
                        <span v-if="scope.row.State==2">報失</span>
                        <span v-if="scope.row.State==0">使用中</span>
                    </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
              >報失</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="編輯" v-model="editVisible" width="50%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="開始時間">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="日期"
              v-model="Data[idx].Stime"
              style="width: 100%"
              readonly='true'
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="時間"
              v-model="Data[idx].Stime"
              style="width: 100%"
            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="結束時間">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="日期"
              v-model="Data[idx].Etime"
              style="width: 100%"
              readonly='true'
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="時間"
              v-model="Data[idx].Etime"
              style="width: 100%"
            ></el-time-picker>
          </el-col>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit(Data, idx)">确 定</el-button>
        </span>
      </template>
    </el-dialog>
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
      keywords1 :"",
      Data :[],
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
    selectUser() {
      let ID = this.keywords;
      let name = this.keywords1;
      axios
        .post("api/user/selectUserBeacon", {
          ID,name
          // eslint-disable-next-line no-unused-vars
        })
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          // eslint-disable-next-line no-unused-vars
          let data = res.data;
          this.Data = data;

        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm("确定要報失吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          console.log("123");
          console.log(index);
          console.log(row);
          let ID = row.BeaconID;
          let State = 1;
          axios
            .post("api/user/updateBeaconState", {
              ID,State
              // eslint-disable-next-line no-unused-vars
            })
            // eslint-disable-next-line no-unused-vars
            .then((res) => {
              // eslint-disable-next-line no-unused-vars
            })
            .catch((err) => {
              console.log(err);
            });
          this.$message.success("報失成功");
        })
        .catch(() => {});
    },
  },
};
</script>
