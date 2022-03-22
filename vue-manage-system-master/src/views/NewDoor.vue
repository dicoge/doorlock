<template>
  <div class="hello">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>大門管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="roof">
            <el-input v-model="roof"></el-input>
          </el-form-item>
          <el-form-item label="floor">
            <el-input v-model="floor"></el-input>
          </el-form-item>
          <el-form-item label="department">
            <el-input v-model="department"></el-input>
          </el-form-item>
          <el-form-item label="room">
            <el-input v-model="room"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addDoor">送出</el-button>
            <el-button type="primary" @click="selectDoor">查詢</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-table
        :data="Data"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="ID" label="ID"></el-table-column>
        <el-table-column prop="Name" label="姓名"></el-table-column>
        <el-table-column prop="DoorID" label="DOORID"></el-table-column>
        <el-table-column prop="Stime" label="開始">
          <template #default="scope">
            <span>{{ currentDateTime(scope.row.Stime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="Etime" label="結束">
          <template #default="scope">
            <span>{{ currentDateTime(scope.row.Etime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              >編輯</el-button
            >
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
              >刪除</el-button
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
</template>
<script>
import axios from "axios";
import moment from "moment";
export default {
  props: {
    msg: String,
  },
  data() {
    return {
      Data :[],
      roof: "",
      floor: "",
      department: "",
      room: "",
      keywords: "",
      idx: -1,
      id: -1,
      form: {},
    };
  },
  methods: {
    currentDateTime(time) {
      return moment(time).format("YYYY-MM-DD,HH:mm:ss ");
    },
    addDoor() {
      //
      let roof = this.roof;
      let floor = this.floor;
      let department = this.department;
      let room = this.room;
      axios
        .post("/api/user/addDoor", {
          roof,
          floor,
          department,
          room,
        })
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          // eslint-disable-next-line no-unused-vars
          alert("信息添加成功");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectDoor() {
      let roof = this.roof;
      let floor = this.floor;
      let department = this.department;
      let room = this.room;
      axios
        .post("api/user/sselectAuthDoor", {
          roof,floor,department,room
          // eslint-disable-next-line no-unused-vars
        })
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          // eslint-disable-next-line no-unused-vars
          let data = res.data;
          this.Data = data;
        //新增至行程表
        })
        .catch((err) => {
          console.log(err);
        });
      
    },
    // 删除操作
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          console.log("123");
          console.log(index);
          console.log(row.AuthID);
          let AuthID = row.AuthID;
          let name = row.UserID;
          axios
            .post("api/user/deletetAuth", {
              AuthID,
              // eslint-disable-next-line no-unused-vars
            })
            // eslint-disable-next-line no-unused-vars
            .then((res) => {
              // eslint-disable-next-line no-unused-vars
              let data = res.data;
              //this.Data = data;
            })
            .catch((err) => {
              console.log(err);
            });
          axios
            .post("api/user/selectAuth", {
              name,
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
          this.$message.success("删除成功");
          this.tableData.splice(index, 1);
        })
        .catch(() => {});
    },
    // 编辑操作
    handleEdit(index, row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit(row, idx) {
      let AuthID = row[idx].AuthID;
      let UserID = row[idx].UserID;
      let DoorID = row[idx].DoorID;
      let Stime = row[idx].Stime;
      let Etime = row[idx].Etime;
      let name =AuthID
      console.log(Stime);
      axios
        .post("api/user/updatetAuth", {
          AuthID,
          UserID,
          DoorID,
          Stime,
          Etime,
          // eslint-disable-next-line no-unused-vars
        })
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          // eslint-disable-next-line no-unused-vars
          axios
            .post("api/user/selectAuth", {
              name,
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
        })
        .catch((err) => {
          console.log(err);
        });
      this.editVisible = false;
      this.$message.success(`修改成功`);
    },
  },
};
</script>
