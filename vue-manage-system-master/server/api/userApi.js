const express = require('express');
const router = express.Router();
const auto = require('../auto');
const DBHelper = require('../utils/DBHelper');
const sql = require('../sqlMap');

// 增加用户
router.post('/addUser', (req, res) => {
    let sqlStr = sql.user.add;
    let params = req.body;
    let conn = new DBHelper().getConn();
    conn.query(sqlStr, [params.ID, params.name], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
    conn.end();
});

// 查询用户
router.post('/selectUser', (req, res) => {
    let sqlStr = sql.user.select;
    let params = req.body;
    let conn = new DBHelper().getConn();
    conn.query(sqlStr, [params.name], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            console.log(result)
            res.json(result)
        }
    });
    conn.end();
});
// 查询用户
router.post('/selectUser2', (req, res) => {
    let sqlStr = sql.user.selectmulty;
    let params = req.body;
    let conn = new DBHelper().getConn();
    conn.query(sqlStr, [params.UserID, params.Name], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            console.log(result)
            res.json(result)
        }
    });
    conn.end();
});
//增加行程
router.post('/addschedule', (req, res) => {
    let sqlStr = sql.schedule.add;
    let params = req.body;
    let sday = new Date(params.Sday);
    console.log(sday)
    let eday = new Date(params.Eday);
    console.log(eday)
    let conn = new DBHelper().getConn();
    conn.query(sqlStr, [params.AID, params.DoorID, sday, eday, params.repetition, params.point], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            console.log(result)
            res.json(result)
        }
    });
    conn.end();
    //更改當天AUTH
    //SELECT * FROM `user`  ORDER BY id DESC LIMIT 0 , 1
    setTimeout(function () {
        let conn1 = new DBHelper().getConn();
        today = new Date()
        year = today.getFullYear(); month = today.getMonth(); day = today.getDate();
        DAT = new Date(year, month, day, +8, 0, 0)
        DAT1 = new Date(year, month, day + 1, +8, 0, 0)
        console.log(DAT)
        console.log(DAT1)
        conn1.query('SELECT * FROM `o_schedule`  ORDER BY AID DESC LIMIT 0 , 1', (err, result) => {
            if (err) {
                res.json(err);
            } else {
                if (result[0].repetition != -1) {
                    console.log('123')
                    console.log(result[0].repetition)
                    
                    auto.autoauth(result, DAT);
                    auto.autoauth(result, DAT1);
                } else if(result[0].repetition == -1){
                    console.log('456')
                    auto.deleteoneday(result, DAT);
                    auto.deleteoneday(result, DAT1);
                }
            }
        });
        conn1.end();
    }, 50);
});
//查詢行程
router.post('/selectschedule', (req, res) => {
    let sqlStr = sql.schedule.select;
    let params = req.body;
    let conn = new DBHelper().getConn();
    conn.query(sqlStr, [params.name], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            console.log(result)
            res.json(result)
        }
    });
    conn.end();
});
// 更改行程
router.post('/updatetschedule', (req, res) => {
    let sqlStr = sql.schedule.update;
    let params = req.body;
    let sday = new Date(params.startTime);
    //sday.setHours(sday.getHours()+8);
    let eday = new Date(params.endTime);
    //eday.setHours(eday.getHours()+8);
    let conn = new DBHelper().getConn();
    console.log(params.AuthID)
    console.log(params.UserID)
    console.log(params.DoorID)
    console.log(sday)
    console.log(eday)
    console.log(params.repetition)
    console.log(params.point)
    conn.query(sqlStr, [params.UserID, params.DoorID, sday, eday, params.repetition, params.point, params.AuthID], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            console.log(result)
            res.json(result)
        }
    });
    conn.end();
    let conn1 = new DBHelper().getConn();
    conn1.query('DELETE FROM `c_auth` WHERE `c_auth`.`CreateFrom` = ?',[params.AuthID], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            console.log(result)
        }
    });
    conn1.end();
    //更改當天AUTH or 全部
    setTimeout(function () {
    let conn2 = new DBHelper().getConn();
    today = new Date()
    year = today.getFullYear(); month = today.getMonth(); day = today.getDate();
    DAT = new Date(year, month, day, +8, 0, 0)
    DAT1 = new Date(year, month, day + 1, +8, 0, 0)
    console.log(DAT)
    console.log(DAT1)
    conn2.query('SELECT * FROM `o_schedule`  where AID = ?',[params.AuthID], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            auto.autoauth(result, DAT);
            auto.autoauth(result, DAT1);
        }
    });
    conn2.end();
}, 100);
});
// 更改行程
router.post('/updatetTwoschedule', (req, res) => {
    //先搜尋
    //再比對開始是否往後
    //往後就刪除那天
    let sqlStr = sql.schedule.select1;
    let params = req.body;
    let sday = new Date(params.startTime);
    let eday = new Date(params.endTime);
    //sday.setHours(sday.getHours()+8);
    let conn = new DBHelper().getConn();
    conn.query(sqlStr, [params.AuthID], (err, result) => {
        if (err) {
            res.json(err);
        } else if(result.length>0){
            console.log(result)
            let day = new Date(result[0].startTime);
            console.log(sday.getTime()==day.getTime())
            console.log(sday.getTime()>day.getTime())
            if(sday.getTime()==day.getTime()){
                console.log(123456789123456789)
                let sqlStr1 = sql.schedule.update1;
                let conn1 = new DBHelper().getConn();
                let startTime = new Date(result[0].startTime)
                console.log(startTime)
                console.log(eday)
                conn1.query(sqlStr1,[eday, result[0].AID], (err, result) => {
                    if (err) {
                        res.json(err);
                    } else {
                       console.log(result)
                    }
                });
                conn1.end();
            }else if(sday.getTime()>result[0].startTime.getTime()){
                console.log(999999999999999999999)
                let sqlStr1 = sql.schedule.update1;
                let conn1 = new DBHelper().getConn();
                let etime = new Date(result[0].endTime);
                let day = new Date(sday.getFullYear(),sday.getMonth(),sday.getDate()-1,etime.getHours(),etime.getMinutes(),etime.getSeconds())
                conn1.query(sqlStr1, [day,result[0].AID], (err, result) => {
                    if (err) {
                        res.json(err);
                    } else {
                       console.log(result)
                    }
                });
                conn1.end();
                let sqlStr2 = sql.schedule.add;
                let conn2 = new DBHelper().getConn();
                conn2.query(sqlStr2, [params.UserID, params.DoorID, sday, eday, params.repetition, params.point], (err, result) => {
                    if (err) {
                        res.json(err);
                    } else {
                       console.log(result)
                    }   
                });
                conn2.end();
            } 
        }
    });
    conn.end();
    //更改當天AUTH or 全部
    let conn3 = new DBHelper().getConn();
    conn3.query('DELETE FROM `c_auth` WHERE `c_auth`.`CreateFrom` = ?',[params.AuthID], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            console.log(result)
        }
    });
    conn3.end();
    //更改當天AUTH or 全部
    setTimeout(function () {
    let conn4 = new DBHelper().getConn();
    today = new Date()
    year = today.getFullYear(); month = today.getMonth(); day = today.getDate();
    DAT = new Date(year, month, day, +8, 0, 0)
    DAT1 = new Date(year, month, day + 1, +8, 0, 0)
    console.log(DAT)
    console.log(DAT1)
    conn4.query('SELECT * FROM `o_schedule`  where AID = ?',[params.AuthID], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            auto.autoauth(result, DAT);
            auto.autoauth(result, DAT1);
        }
    });
    conn4.end();
}, 100);
});
// 刪除行程
router.post('/deletetschedule', (req, res) => {
    let sqlStr = sql.schedule.delete;
    let params = req.body;
    let conn = new DBHelper().getConn();
    conn.query(sqlStr, [params.AuthID], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            console.log(result)
            res.json(result)
        }
    });
    conn.end();
});
// 查询auth
router.post('/selectAuth', (req, res) => {
    let sqlStr = sql.auth.select;
    let params = req.body;
    let conn = new DBHelper().getConn();
    conn.query(sqlStr, [params.name], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            console.log(result)
            res.json(result)
        }
    });
    conn.end();
});
//查詢auth(從門)
router.post('/sselectAuthDoor', (req, res) => {
    let sqlStr = sql.auth.select1;
    let params = req.body;
    let doorID = params.roof + params.floor + params.department + params.room;
    let conn = new DBHelper().getConn();
    conn.query(sqlStr, [doorID], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            console.log(result)
            res.json(result)
        }
    });
    conn.end();
});
// 更改auth
router.post('/updatetAuth', (req, res) => {
    let sqlStr = sql.auth.update;
    let params = req.body;
    let sday = new Date(params.Stime);
    //sday.setHours(sday.getHours()+8);
    let eday = new Date(params.Etime);
    //eday.setHours(eday.getHours()+8);
    let conn = new DBHelper().getConn();
    conn.query(sqlStr, [params.UserID, params.DoorID, sday, eday, params.AuthID], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            console.log(result)
            res.json(result)
        }
    });
    conn.end();
});
// 刪除auth
router.post('/deletetAuth', (req, res) => {
    let sqlStr = sql.auth.delete;
    let params = req.body;
    let conn = new DBHelper().getConn();
    conn.query(sqlStr, [params.AuthID], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            console.log(result)
            res.json(result)
        }
    });
    conn.end();
});
// 增加門
router.post('/addDoor', (req, res) => {
    let sqlStr = sql.door.add;
    let params = req.body;
    let conn = new DBHelper().getConn();
    let roof = params.roof;
    let floor = params.floor;
    let department = params.department;
    let room = params.room;
    let doorID = roof + floor + department + room;
    conn.query(sqlStr, [doorID, roof, floor, department, room], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
    conn.end();
});


// 增加BEACON
router.post('/addBeacon', (req, res) => {
    let sqlStr = sql.beacon.add;
    let params = req.body;
    let conn = new DBHelper().getConn();
    let UUID = params.UUID;
    let Major = params.Major;
    let Minor = params.Minor;
    let Mac = params.Mac;
    let State = 0;
    conn.query(sqlStr, [UUID, Major, Minor, Mac, State], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
    conn.end();
});
// 查詢BEACON
router.post('/selectUserBeacon', (req, res) => {
    let sqlStr = sql.beacon.selectBeacon;
    let params = req.body;
    let conn = new DBHelper().getConn();
    conn.query(sqlStr, [params.ID, params.name], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
    conn.end();
});
// 更改BEACON狀態
router.post('/updateBeaconState', (req, res) => {
    let sqlStr = sql.beacon.update;
    let params = req.body;
    let conn = new DBHelper().getConn();
    conn.query(sqlStr, [params.State, params.ID], (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
    conn.end();
});

module.exports = router;