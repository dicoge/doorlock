const DBHelper = require('./utils/DBHelper');
const sql = require('./sqlMap');
module.exports = {
    autoauth: function (authjson, DAT) {
        console.log(DAT)
        today = new Date(DAT)
        year = today.getFullYear(); month = today.getMonth(); day = today.getDate();
        console.log(authjson);
        for (var i = 0; i < authjson.length; i++) {
            var authstime = []; var authetime = []; var authuserid = -1; var authdoorid = 0; var fromid = 0;
            startTime = new Date(authjson[i].startTime)
            endTime = new Date(authjson[i].endTime)
            if (endTime.getTime() > DAT.getTime() && startTime.getTime() < DAT.getTime()) {
            if (authjson[i].repetition == 0) {//不重複
                
                    if (endTime.getMonth() == DAT.getMonth() && endTime.getDate() == DAT.getDate()) {
                        if (endTime.getMonth() == startTime.getMonth() && endTime.getDate() == startTime.getDate()) {
                            authstime[0] = startTime
                            authetime[0] = endTime
                            authuserid = authjson[i].UserID
                            authdoorid = authjson[i].DoorID
                            fromid = authjson[i].AID
                        } else {
                            authstime[0] = new Date(year, month, DAT.getDate(), 0, 0, 0)
                            authetime[0] = endTime
                            authuserid = authjson[i].UserID
                            authdoorid = authjson[i].DoorID
                            fromid = authjson[i].AID
                        }
                    } else {
                        if (startTime.getMonth() <= DAT.getMonth()) {
                            if (startTime.getMonth() == DAT.getMonth()) {
                                if (startTime.getDate() == DAT.getDate()) {
                                    authstime[0] = startTime
                                    authetime[0] = new Date(year, month, DAT.getDate(), 23, 59, 59)
                                    authuserid = authjson[i].UserID
                                    authdoorid = authjson[i].DoorID
                                    fromid = authjson[i].AID
                                } else {
                                    authstime[0] = new Date(year, month, DAT.getDate(), 0, 0, 0)
                                    authetime[0] = new Date(year, month, DAT.getDate(), 23, 59, 59)
                                    authuserid = authjson[i].UserID
                                    authdoorid = authjson[i].DoorID
                                    fromid = authjson[i].AID
                                }
                            } else {
                                authstime[0] = new Date(year, month, DAT.getDate(), 0, 0, 0)
                                authetime[0] = new Date(year, month, DAT.getDate(), 23, 59, 59)
                                authuserid = authjson[i].UserID
                                authdoorid = authjson[i].DoorID
                                fromid = authjson[i].AID
                            }
                        }
                    }
                
            } else if (authjson[i].repetition == 1) {//每天
                var sh = startTime.getHours();
                var eh = endTime.getHours();
                if(sh>24)sh=sh-24;
                if(eh>24)eh=eh-24;
                if (eh <= sh) {//沒跨日
                    authstime[0] = new Date(year, month, DAT.getDate(), startTime.getHours(), startTime.getMinutes(), startTime.getSeconds())
                    authetime[0] = new Date(year, month, DAT.getDate(), 23, 59, 59)
                    authstime[1] = new Date(year, month, DAT.getDate(), 0, 0, 0)
                    authetime[1] = new Date(year, month, DAT.getDate(), endTime.getHours(), endTime.getMinutes(), endTime.getSeconds())
                    authuserid = authjson[i].UserID
                    authdoorid = authjson[i].DoorID                                        
                    fromid = authjson[i].AID
                } else {//跨日
                    authstime[0] = new Date(year, month, DAT.getDate(), startTime.getHours(), startTime.getMinutes(), startTime.getSeconds())
                    authetime[0] = new Date(year, month, DAT.getDate(), endTime.getHours(), endTime.getMinutes(), endTime.getSeconds())
                    authuserid = authjson[i].UserID
                    authdoorid = authjson[i].DoorID
                    fromid = authjson[i].AID
                }
            } else if (authjson[i].repetition == 2) {//每周
                if (DAT.getDay() == authjson[i].point) {//判斷每週幾
                    var sh = startTime.getHours();
                    var eh = endTime.getHours();
                    if(sh>24)sh=sh-24;
                    if(eh>24)eh=eh-24;
                    if (eh <= sh) {//沒跨日
                        authstime[0] = new Date(year, month, DAT.getDate(), startTime.getHours(), startTime.getMinutes(), startTime.getSeconds())
                        authetime[0] = new Date(year, month, DAT.getDate(), 23, 59, 59)
                        authstime[1] = new Date(year, month, DAT.getDate()+1, 0, 0, 0)
                        authetime[1] = new Date(year, month, DAT.getDate()+1, endTime.getHours(), endTime.getMinutes(), endTime.getSeconds())
                        authuserid = authjson[i].UserID
                        authdoorid = authjson[i].DoorID                                        
                        fromid = authjson[i].AID
                    } else {//跨日
                        authstime[0] = new Date(year, month, DAT.getDate(), startTime.getHours(), startTime.getMinutes(), startTime.getSeconds())
                        authetime[0] = new Date(year, month, DAT.getDate(), endTime.getHours(), endTime.getMinutes(), endTime.getSeconds())
                        authuserid = authjson[i].UserID
                        authdoorid = authjson[i].DoorID
                        fromid = authjson[i].AID
                    }
                }
            } else {//每月
                if (DAT.getDate() == authjson[i].point) {//判斷每月幾號
                    var sh = startTime.getHours();
                    var eh = endTime.getHours();
                    if(sh>24)sh=sh-24;
                    if(eh>24)eh=eh-24;
                    if (eh <= sh) {//沒跨日
                        authstime[0] = new Date(year, month, DAT.getDate(), startTime.getHours(), startTime.getMinutes(), startTime.getSeconds())
                        authetime[0] = new Date(year, month, DAT.getDate(), 23, 59, 59)
                        authstime[1] = new Date(year, month, DAT.getDate()+1, 0, 0, 0)
                        authetime[1] = new Date(year, month, DAT.getDate()+1, endTime.getHours(), endTime.getMinutes(), endTime.getSeconds())
                        authuserid = authjson[i].UserID
                        authdoorid = authjson[i].DoorID                                        
                        fromid = authjson[i].AID
                    } else {//跨日
                        authstime[0] = new Date(year, month, DAT.getDate(), startTime.getHours(), startTime.getMinutes(), startTime.getSeconds())
                        authetime[0] = new Date(year, month, DAT.getDate(), endTime.getHours(), endTime.getMinutes(), endTime.getSeconds())
                        authuserid = authjson[i].UserID
                        authdoorid = authjson[i].DoorID
                        fromid = authjson[i].AID
                    }
                }
            }
        }
            //新增資料至AUTH
            if (authuserid != -1) {
                if (authstime.length > 1) {
                    for (j in authstime) {
                        let conn1 = new DBHelper().getConn();
                        conn1.query('INSERT INTO `c_auth` ( `UserID`, `DoorID`, `Stime`, `Etime`,`CreateFrom`) VALUES (?, ?, ?, ?,?)', [authuserid, authdoorid, authstime[j], authetime[j], fromid], (err, result) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                        conn1.end();
                    }
                } else {
                    let conn1 = new DBHelper().getConn();
                    conn1.query('INSERT INTO `c_auth` ( `UserID`, `DoorID`, `Stime`, `Etime`,`CreateFrom`) VALUES (?, ?, ?, ?,?)', [authuserid, authdoorid, authstime[0], authetime[0], fromid], (err, result) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                    conn1.end();
                    console.log(authstime[0])
                    console.log(authetime[0])
                    console.log(authstime[0] + '~' + authetime[0])
                    console.log(authuserid)
                    console.log(authdoorid)
                    console.log(fromid)
                }
            }
        }
    },
    deleteoneday: function (authjson,DAT) {
        console.log(authjson);
        for (var i = 0; i < authjson.length; i++) {
        let Stime = authjson[i].startTime;
        year = Stime.getFullYear(); month = Stime.getMonth(); day = Stime.getDate();
        let Day = new Date(year, month, day, +8, 0, 0)
        if(Day.getTime() == DAT.getTime()){
        let conn1 = new DBHelper().getConn();
        let Day1 = new Date(year, month, day+1, +8, 0, 0)
        console.log(DAT);
        console.log(Day1);
        conn1.query('DELETE FROM `c_auth` where`c_auth`.`CreateFrom`=? and( `c_auth`.`Etime` > ? and `c_auth`.`Etime` < ?)', [authjson[i].point,DAT,Day1], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result)
            }
        });
        conn1.end();
    }
    }
    },
    addAuthLog: function (authjson) {
        console.log(authjson);
        for (var i = 0; i < authjson.length; i++) {
        let conn1 = new DBHelper().getConn();
        let Stime = authjson[i].Stime;
        let Etime = authjson[i].Etime;
        conn1.query('INSERT INTO `L_authrecord` ( `UserID`, `DoorID`, `Stime`, `Etime`,`CreateFrom`) VALUES (?, ?, ?, ?,?)', [authjson[i].UserID,authjson[i].DoorID,Stime,Etime,authjson[i].CreateFrom], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result)
            }
        });
        conn1.end();
    }
    },
};
