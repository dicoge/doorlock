<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 表單
        </el-breadcrumb-item>
        <el-breadcrumb-item>新增行程表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="學號">
            <el-input v-model="form.UID"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="重複">
            <el-select v-model="form.region" placeholder="請選擇">
              <el-option key="1" label="不重複" value="0"></el-option>
              <el-option key="2" label="每天" value="1"></el-option>
              <el-option key="3" label="每週" value="2"></el-option>
              <el-option key="4" label="每月" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地點">
            <el-cascader :options="options" v-model="form.options"></el-cascader>
          </el-form-item>
          <el-form-item label="開始時間">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="日期"
                v-model="form.date1"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker
                placeholder="時間"
                v-model="form.time1"
                style="width: 100%"
              ></el-time-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="結束時間">
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="日期"
                v-model="form.date2"
                style="width: 100%"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-time-picker
                placeholder="時間"
                v-model="form.time2"
                style="width: 100%"
              ></el-time-picker>
            </el-col>
          </el-form-item>
          <!-- <el-form-item label="选择开关">
                        <el-switch v-model="form.delivery"></el-switch>
                    </el-form-item> -->
          <!-- <el-form-item label="多选框">
                        <el-checkbox-group v-model="form.type">
                            <el-checkbox label="步步高" name="type"></el-checkbox>
                            <el-checkbox label="小天才" name="type"></el-checkbox>
                            <el-checkbox label="imoo" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item> -->
          <!-- <el-form-item label="单选框">
                        <el-radio-group v-model="form.resource">
                            <el-radio label="步步高"></el-radio>
                            <el-radio label="小天才"></el-radio>
                            <el-radio label="imoo"></el-radio>
                        </el-radio-group>
                    </el-form-item> -->
          <!-- <el-form-item label="租借原因">
                        <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                    </el-form-item> -->
          <el-form-item>
            <el-button type="primary" @click="onSubmit">送出</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form1" label-width="100px">
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
        <!-- <el-table-column prop="UserID" label="單號" width="55" align="center"></el-table-column> -->
        <!-- <el-table-column prop="UserID" label="使用者編號"></el-table-column> -->
        <el-table-column prop="DoorID" label="DOORID"></el-table-column>
        <el-table-column prop="startTime" label="開始">
          <!-- <template #default="scope">
            <span>{{ currentDateTime(scope.row.startTime) }}</span>
          </template> -->
          <template #default="scope">
            <span v-if="scope.row.repetition == 1">{{
              currentDate(scope.row.startTime)
            }}</span>
            <span v-if="scope.row.repetition == 2">{{
              currentDate(scope.row.startTime)
            }}</span>
            <span v-if="scope.row.repetition == 3">{{
              currentDate(scope.row.startTime)
            }}</span>
            <span v-if="scope.row.repetition == 0">{{
              currentDateTime(scope.row.startTime)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="結束">
          <template #default="scope">
            <span v-if="scope.row.repetition == 1">{{
              currentDate(scope.row.endTime)
            }}</span>
            <span v-if="scope.row.repetition == 2">{{
              currentDate(scope.row.endTime)
            }}</span>
            <span v-if="scope.row.repetition == 3">{{
              currentDate(scope.row.endTime)
            }}</span>
            <span v-if="scope.row.repetition == 0">{{
              currentDateTime(scope.row.endTime)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="repetition" label="重複" align="center">
          <template #default="scope">
            <span v-if="scope.row.repetition == 1"
              >每天，{{ currentTime(scope.row.startTime) }}~{{
                currentTime(scope.row.endTime)
              }}</span
            >
            <span v-if="scope.row.repetition == 2"
              >每星期{{ scope.row.point }}，{{ currentTime(scope.row.startTime) }}~{{
                currentTime(scope.row.endTime)
              }}</span
            >
            <span v-if="scope.row.repetition == 3"
              >每月{{ scope.row.point }}號，{{ currentTime(scope.row.startTime) }}~{{
                currentTime(scope.row.endTime)
              }}</span
            >
            <span v-if="scope.row.repetition == 0"></span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <span v-if="scope.row.repetition == 0"
              ><el-button
                type="text"
                icon="el-icon-edit"
                @click="handleEdit2(scope.$index, scope.row)"
                >修改</el-button
              >
              <el-button
                type="text"
                icon="el-icon-edit"
                class="red"
                @click="handleDelete(scope.$index, scope.row)"
                >刪除</el-button
              ></span
            >
            <span v-if="scope.row.repetition != 0"
              ><el-button
                type="text"
                icon="el-icon-edit"
                @click="handleEdit(scope.$index, scope.row)"
                >修改單日行程</el-button
              >
              <el-button
                type="text"
                icon="el-icon-edit"
                class="red"
                @click="handleEdit1(scope.$index, scope.row)"
                >修改之後行程</el-button
              >
              <el-button
                type="text"
                icon="el-icon-edit"
                class="red"
                @click="handleEdit3(scope.$index, scope.row)"
                >刪除之後行程</el-button
              ></span
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="單日編輯" v-model="editVisible" width="50%">
      <el-form ref="form" :model="form1" label-width="70px">
        <el-form-item label="開始時間">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="日期"
              v-model="form1.startTime"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="時間"
              v-model="form1.startTime"
              style="width: 100%"
            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="結束時間">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="日期"
              v-model="form1.startTime"
              readonly="true"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="時間"
              v-model="form1.endTime"
              style="width: 100%"
            ></el-time-picker>
          </el-col>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit(Data, idx)">確定</el-button>
          <el-button type="primary" @click="handleDelete1(Data, idx)">刪除當日</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog title="多日編輯" v-model="editVisible1" width="50%">
      <el-form ref="form" :model="form1" label-width="70px">
        <el-form-item label="開始時間">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="日期"
              v-model="form1.startTime"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="時間"
              v-model="form1.startTime"
              style="width: 100%"
            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="結束時間">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="日期"
              v-model="form1.endTime"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="時間"
              v-model="form1.endTime"
              style="width: 100%"
            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="重複">
          <el-select v-model="form1.repetition" placeholder="請選擇">
            <el-option key="2" label="每天" value="1"></el-option>
            <el-option key="3" label="每週" value="2"></el-option>
            <el-option key="4" label="每月" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit1(Data, idx)">確定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog title="編輯" v-model="editVisible2" width="50%">
      <el-form ref="form" :model="form1" label-width="70px">
        <el-form-item label="開始時間">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="日期"
              v-model="form1.startTime"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="時間"
              v-model="form1.startTime"
              style="width: 100%"
            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="結束時間">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="日期"
              v-model="form1.endTime"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="時間"
              v-model="form1.endTime"
              style="width: 100%"
            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="重複">
          <el-select v-model="form1.repetition" placeholder="請選擇">
            <el-option key="1" label="不重複" value="0"></el-option>
            <el-option key="2" label="每天" value="1"></el-option>
            <el-option key="3" label="每週" value="2"></el-option>
            <el-option key="4" label="每月" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="(editVisible2 = false), (form1.repetition = 0)"
            >取 消</el-button
          >
          <el-button type="primary" @click="saveEdit2(Data, idx)">確定</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog title="編輯結束時間" v-model="editVisible3" width="50%">
      <el-form ref="form" :model="form1" label-width="70px">
        <el-form-item label="結束時間">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="日期"
              v-model="form1.endTime"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="時間"
              v-model="form1.endTime"
              style="width: 100%"
            ></el-time-picker>
          </el-col>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="handleDelete2(Data, idx)">確定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "baseform",
  data() {
    return {
      Data: [],
      editVisible: false,
      editVisible1: false,
      editVisible2: false,
      editVisible3: false,
      keywords: "",
      keywords1: "",
      form1: {},
      idx: -1,
      id: -1,
      options: [
        {
          value: "08",
          label: "工學院",
          children: [
            {
              value: "06",
              label: "資工",
              children: [
                {
                  value: "0707",
                  label: "H707",
                },
                {
                  value: "0708",
                  label: "H708",
                },
              ],
            },
            {
              value: "03",
              label: "電機系",
              children: [
                {
                  value: "0315",
                  label: "H315",
                },
                {
                  value: "0316",
                  label: "H316",
                },
              ],
            },
          ],
        },
        {
          value: "10",
          label: "外語學院",
          children: [
            {
              value: "30",
              label: "日語系",
              children: [
                {
                  value: "0217",
                  label: "J217",
                },
              ],
            },
            {
              value: "40",
              label: "歐語系",
              children: [
                {
                  value: "0317",
                  label: "J317",
                },
              ],
            },
          ],
        },
      ],
      form: {
        UID: "",
        name: "",
        region: "",
        date1: "",
        time1: "",
        date2: "",
        time2: "",
        //delivery: true,
        //type: ['步步高'],
        //resource: '小天才',
        desc: "",
        options: [],
      },
    };
  },
  methods: {
    currentDateTime(time) {
      return moment(time).format("YYYY-MM-DD,HH:mm:ss ");
    },
    currentDate(time) {
      return moment(time).format("YYYY-MM-DD ");
    },
    currentTime(time) {
      return moment(time).format("HH:mm:ss ");
    },
    onSubmit() {
      let date = new Date(this.form.date1);
      let time = new Date(this.form.time1);
      let Sday = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes(),
        time.getSeconds()
      );
      let Edate = new Date(this.form.date2);
      let Etime = new Date(this.form.time2);
      let Eday = new Date(
        Edate.getFullYear(),
        Edate.getMonth(),
        Edate.getDate(),
        Etime.getHours(),
        Etime.getMinutes(),
        Etime.getSeconds()
      );
      let DoorID = Number(
        this.form.options[0] + this.form.options[1] + this.form.options[2]
      );
      let repetition = this.form.region;
      let point = null;
      if (repetition == 2) point = date.getDay();
      if (repetition == 3) point = date.getDate();
      console.log(Sday);
      console.log(Eday);
      console.log(DoorID);
      let UserID = this.form.UID;
      let Name = this.form.name;
      console.log(UserID);
      console.log(Name);
      var AID;
      //透過編號跟姓名查找使用者ID
      axios
        .post("api/user/selectUser2", {
          UserID,
          Name,
          // eslint-disable-next-line no-unused-vars
        })
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          // eslint-disable-next-line no-unused-vars
          let data = res.data[0];
          console.log(data);
          AID = data.UserID;
          console.log(AID);
          //新增至行程表
          axios
            .post("api/user/addschedule", {
              AID,
              DoorID,
              Sday,
              Eday,
              repetition,
              point,
              // eslint-disable-next-line no-unused-vars
            })
            // eslint-disable-next-line no-unused-vars
            .then((res) => {
              // eslint-disable-next-line no-unused-vars
              console.log(AID);
              console.log(res);
            })
            .catch((err) => {
              console.log(AID);
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
      this.$message.success("提交成功！");
    },
    selectUser() {
      let UserID = this.keywords;
      let Name = this.keywords1;
      var name;
      axios
        .post("api/user/selectUser2", {
          UserID,
          Name,
          // eslint-disable-next-line no-unused-vars
        })
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          // eslint-disable-next-line no-unused-vars
          let data = res.data[0];
          name = data.UserID;
          //新增至行程表
          axios
            .post("api/user/selectschedule", {
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
    },
    handleDelete(index, row) {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          console.log("123");
          console.log(index);
          console.log(row.AID);
          console.log(row);
          let AuthID = row.AID;
          let name = row.UserID;
          console.log(name);
          axios
            .post("api/user/deletetschedule", {
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
            .post("api/user/selectschedule", {
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
    handleDelete1(row, idx) {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          console.log(row[idx].AID);
          let AuthID = row[idx].AID;
          let AID = row[idx].UserID;
          let DoorID = row[idx].DoorID;
          let Sday = row[idx].startTime;
          let Eday = Sday;
          let repetition = -1;
          let point = AuthID;
          let name = AID;
          console.log(AID);
          axios
            .post("api/user/addschedule", {
              AID,
              DoorID,
              Sday,
              Eday,
              repetition,
              point,
              // eslint-disable-next-line no-unused-vars
            })
            // eslint-disable-next-line no-unused-vars
            .then((res) => {
              // eslint-disable-next-line no-unused-vars
              axios
                .post("api/user/selectschedule", {
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
          console.log(999);
          this.editVisible = false;
          this.$message.success("删除成功");
          //this.tableData.splice(index, 1);
        })
        .catch(() => {});
    },
    // 编辑操作
    handleEdit(index, row) {
      this.idx = index;
      this.form1 = row;
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit(row, idx) {
      //單日 新增sechedule (刪除當天,new當天)
      let AuthID = row[idx].AID;
      let AID = row[idx].UserID;
      let DoorID = row[idx].DoorID;
      let Sday = row[idx].startTime;
      let Etime = new Date(row[idx].endTime);
      let point = AuthID;
      let repetition = -1;
      let Eday = new Date(
        Sday.getFullYear(),
        Sday.getMonth(),
        Sday.getDate(),
        Etime.getHours(),
        Etime.getMinutes(),
        Etime.getSeconds()
      );
      let name = AID;
      console.log(AID);
      axios
        .post("api/user/addschedule", {
          AID,
          DoorID,
          Sday,
          Eday,
          repetition,
          point,
          // eslint-disable-next-line no-unused-vars
        })
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          // eslint-disable-next-line no-unused-vars
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      point = null;
      repetition = 0;
      axios
        .post("api/user/addschedule", {
          AID,
          DoorID,
          Sday,
          Eday,
          repetition,
          point,
          // eslint-disable-next-line no-unused-vars
        })
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          // eslint-disable-next-line no-unused-vars
          axios
            .post("api/user/selectschedule", {
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
    handleEdit1(index, row) {
      this.idx = index;
      this.form1 = row;
      this.editVisible1 = true;
    },
    // 保存编辑
    saveEdit1(row, idx) {
      //多日 改原本的結束時間 新增一筆SECHEDULE
      let AuthID = row[idx].AID;
      let UserID = row[idx].UserID;
      let AID = row[idx].UserID;
      let DoorID = row[idx].DoorID;
      let startTime = row[idx].startTime;
      let date = new Date(startTime);
      let endTime = row[idx].endTime;
      let repetition = row[idx].repetition;
      let point = null;
      if (repetition == 2) point = date.getDay();
      if (repetition == 3) point = date.getDate();
      let name = AID;
      console.log(name);
      axios
        .post("api/user/updatetTwoschedule", {
          AuthID,
          UserID,
          DoorID,
          startTime,
          endTime,
          repetition,
          point,
          // eslint-disable-next-line no-unused-vars
        })
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          // eslint-disable-next-line no-unused-vars
          setTimeout(function () {
          axios
            .post("api/user/selectschedule", {
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
          }, 100);
        })
        .catch((err) => {
          console.log(err);
        });
      this.editVisible1 = false;
      this.$message.success(`修改成功`);
    },
    handleEdit2(index, row) {
      this.idx = index;
      this.form1 = row;
      this.editVisible2 = true;
    },
    // 保存编辑
    saveEdit2(row, idx) {
      let AuthID = row[idx].AID;
      let UserID = row[idx].UserID;
      let DoorID = row[idx].DoorID;
      let startTime = row[idx].startTime;
      let endTime = row[idx].endTime;
      let point = row[idx].point;
      let repetition = row[idx].repetition;
      let name = UserID;
      let date = new Date(startTime);
      if (repetition == 2) point = date.getDay();
      if (repetition == 3) point = date.getDate();
      console.log(UserID);
      axios
        .post("api/user/updatetschedule", {
          AuthID,
          UserID,
          DoorID,
          startTime,
          endTime,
          repetition,
          point,
          // eslint-disable-next-line no-unused-vars
        })
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          // eslint-disable-next-line no-unused-vars
          axios
            .post("api/user/selectschedule", {
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
      this.editVisible2 = false;
      this.$message.success(`修改成功`);
    },
    handleEdit3(index, row) {
      this.idx = index;
      this.form1 = row;
      this.editVisible3 = true;
    },
    handleDelete2(row, idx) {
      // 二次确认删除
      this.$confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          let AuthID = row[idx].AID;
          let UserID = row[idx].UserID;
          let DoorID = row[idx].DoorID;
          let startTime = row[idx].startTime;
          let endTime = row[idx].endTime;
          let point = row[idx].point;
          let repetition = row[idx].repetition;
          let name = UserID;
          //let date = new Date(startTime);
          console.log(UserID);
          axios
            .post("api/user/updatetschedule", {
              AuthID,
              UserID,
              DoorID,
              startTime,
              endTime,
              repetition,
              point,
              // eslint-disable-next-line no-unused-vars
            })
            // eslint-disable-next-line no-unused-vars
            .then((res) => {
              // eslint-disable-next-line no-unused-vars
              axios
                .post("api/user/selectschedule", {
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
          this.editVisible3 = false;
          this.$message.success("删除成功");
          //this.tableData.splice(index, 1);
        })
        .catch(() => {});
    },
  },
};
</script>
