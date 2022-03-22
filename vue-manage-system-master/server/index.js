// node后端服务器
const http = require('http');
const badyParser = require('body-parser');
const express = require('express');
const userApi = require('./api/userApi');
const schedule = require('node-schedule');
const DBHelper = require('./utils/DBHelper');
const AutoAuth = require('./AutoAuth');
const sql = require('./sqlMap');
const auto = require('./auto');
const { UV_FS_O_FILEMAP } = require('constants');
const { ElStep } = require('element-plus');
let app = express();
let server = http.createServer(app);

app.use(badyParser.json());
app.use(badyParser.urlencoded({
    extended: false
}));
// 后端api路由
app.use('/api/user', userApi);
// 启动监听
server.listen(8888, () => {
    console.log(' success!! port:8888')
    // today = new Date()
    // year = today.getFullYear(); month = today.getMonth(); day = today.getDate();
    // DAT = new Date(year, month, day+1 , +8, 0, 0)
    // console.log(DAT)
    // auto.autoauth(0,DAT);
    // let conn = new DBHelper().getConn();
    // var authjson;
    // conn.query('CALL SerachSchedule()', (err, result) => {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         authjson = result[0];
    //         auto.autoauth(authjson,DAT);
    //     }
    // });
    // conn.end();
})
schedule.scheduleJob("0 55 23 * * *", function () {
    today = new Date()
    year = today.getFullYear(); month = today.getMonth(); day = today.getDate();
    DAT = new Date(year, month, day + 2, +8, 0, 0)
    console.log(DAT)
    let conn = new DBHelper().getConn();
    var authjson;
    conn.query('CALL SerachSchedule()', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            authjson = result[0];
            auto.autoauth(authjson,DAT);
        }
    });
    conn.end();
});
schedule.scheduleJob("0 5 0 * * *", function () {
    today = new Date()
    year = today.getFullYear(); month = today.getMonth(); day = today.getDate();
    DAT = new Date(year, month, day, +8, 0, 0)
    DAT1 = new Date(year, month, day+1, +8, 0, 0)
    console.log(DAT)
    let conn = new DBHelper().getConn();
    var authjson;
    conn.query('CALL SearchDeleteSecheduie()', (err, result) => {
        if (err) {
            console.log(err);
        } else {
            authjson = result[0];
            auto.deleteoneday(authjson,DAT1);
        }
    });
    conn.end();
    setTimeout(function() {
        let conn1 = new DBHelper().getConn();
        conn1.query('SELECT * FROM c_auth where Etime<?',DAT, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result)
            if(result.length >0)
                auto.addAuthLog(result);
            }
        });
        conn1.end();
        setTimeout(function() {
        let conn1 = new DBHelper().getConn();
        conn1.query('DELETE FROM c_auth where Etime<?',DAT, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result)
            }
        });
        conn1.end();
    }, 500);
    }, 500);
});