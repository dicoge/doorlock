const DBHelper = require('./utils/DBHelper');
function auto(authjson){
    today = new Date()
    year = today.getFullYear(); month = today.getMonth(); day = today.getDate();
    DAT = new Date(year, month, day + 2, 0, 0, 0)
    for (var i = 0; i < authjson.length; i++) {
        var authstime = []; var authetime = []; var authuserid = -1; var authdoorid = 0;
        startTime = new Date(authjson[i].startTime)
        endTime = new Date(authjson[i].endTime)
        if (authjson[i].repetition == 0) {//不重複
            if (startTime.getDate() < DAT.getDate()) {//不是第一天
                if (endTime.getDate() > DAT.getDate()) {//結束日晚於當天23:59
                    authstime[0] = new Date(year, month, day + 2, 0, 0, 0)
                    authetime[0] = new Date(year, month, day + 2, 23, 59, 59)
                    authuserid = authjson[i].UserID
                    authdoorid = authjson[i].DoorID
                } else {//結束日早於當天23:59
                    authstime[0] = new Date(year, month, day + 2, 0, 0, 0)
                    authetime[0] = endTime
                    authuserid = authjson[i].UserID
                    authdoorid = authjson[i].DoorID
                }
            } else if (startTime.getDate() == DAT.getDate()) {//第一天
                if (endTime.getDate() > DAT.getDate()) {//結束日晚於當天23:59
                    authstime[0] = startTime
                    authetime[0] = new Date(year, month, day +2, 23, 59, 59)
                    authuserid = authjson[i].UserID
                    authdoorid = authjson[i].DoorID
                } else {//結束日早於當天23:59
                    authstime[0] = startTime
                    authetime[0] = endTime
                    authuserid = authjson[i].UserID
                    authdoorid = authjson[i].DoorID
                }
            }
        } else if (authjson[i].repetition == 1) {//每天
            var sh = startTime.getHours() - 8 < 0 ? startTime.getHours() - 8 + 24 : startTime.getHours() - 8;
            var eh = endTime.getHours() - 8 < 0 ? endTime.getHours() - 8 + 24 : endTime.getHours() - 8;
            if (sh <= eh) {//沒跨日
                authstime[0] = new Date(year, month, day + 2, startTime.getHours(), startTime.getMinutes(), startTime.getSeconds())
                authetime[0] = new Date(year, month, day + 2, endTime.getHours(), endTime.getMinutes(), endTime.getSeconds())
                authuserid = authjson[i].UserID
                authdoorid = authjson[i].DoorID
            } else {//跨日
                authstime[0] = new Date(year, month, day + 2, startTime.getUTCHours(), startTime.getUTCMinutes(), startTime.getUTCSeconds())
                authetime[0] = new Date(year, month, day + 2, 23, 59, 59)
                authstime[1] = new Date(year, month, day + 2, 0, 0, 0)
                authetime[1] = new Date(year, month, day + 2, endTime.getUTCHours(), endTime.getUTCMinutes(), endTime.getUTCSeconds())
                authuserid = authjson[i].UserID
                authdoorid = authjson[i].DoorID
            }
        } else if (authjson[i].repetition == 2) {//每周
            if (DAT.getDay() == authjson[i].point) {//判斷每週幾
                var sh = startTime.getHours() - 8 < 0 ? startTime.getHours() - 8 : startTime.getHours() - 8 + 24;
                var eh = endTime.getHours() - 8 < 0 ? endTime.getHours() - 8 : endTime.getHours() - 8 + 24
                if (sh <= eh) {//沒跨日
                    authstime[0] = new Date(year, month, day + 2, startTime.getHours(), startTime.getMinutes(), startTime.getSeconds())
                    authetime[0] = new Date(year, month, day + 2, endTime.getHours(), endTime.getMinutes(), endTime.getSeconds())
                    authuserid = authjson[i].UserID
                    authdoorid = authjson[i].DoorID
                } else {//跨日
                    authstime[0] = new Date(year, month, day + 2, startTime.getHours(), startTime.getMinutes(), startTime.getSeconds())
                    authetime[0] = new Date(year, month, day + 2, 23, 59, 59)
                    authstime[1] = new Date(year, month, day + 3, 0, 0, 0)
                    authetime[1] = new Date(year, month, day + 3, endTime.getHours(), endTime.getMinutes(), endTime.getSeconds())
                    authuserid = authjson[i].UserID
                    authdoorid = authjson[i].DoorID
                }
            }
        } else {//每月
            if (DAT.getDate() == authjson[i].point) {//判斷每月幾號
                var sh = startTime.getHours() - 8 < 0 ? startTime.getHours() - 8 : startTime.getHours() - 8 + 24;
                var eh = endTime.getHours() - 8 < 0 ? endTime.getHours() - 8 : endTime.getHours() - 8 + 24
                if (sh <= eh) {//沒跨日
                    authstime[0] = new Date(year, month, day + 2, startTime.getHours(), startTime.getMinutes(), startTime.getSeconds())
                    authetime[0] = new Date(year, month, day + 2, endTime.getHours(), endTime.getMinutes(), endTime.getSeconds())
                    authuserid = authjson[i].UserID
                    authdoorid = authjson[i].DoorID
                } else {//跨日
                    authstime[0] = new Date(year, month, day + 2, startTime.getHours(), startTime.getMinutes(), startTime.getSeconds())
                    authetime[0] = new Date(year, month, day + 2, 23, 59, 59)
                    authstime[1] = new Date(year, month, day + 3, 0, 0, 0)
                    authetime[1] = new Date(year, month, day + 3, endTime.getHours(), endTime.getMinutes(), endTime.getSeconds())
                    authuserid = authjson[i].UserID
                    authdoorid = authjson[i].DoorID
                }
            }
        }
        //新增資料至AUTH
        if (authuserid != -1) {
            if (authstime.length > 1) {
                for (j in authstime) {
                    let conn1 = new DBHelper().getConn();
                conn1.query('INSERT INTO `c_auth` ( `UserID`, `DoorID`, `Stime`, `Etime`) VALUES (?, ?, ?, ?)',[authuserid, authdoorid,authstime[j],authetime[j]], (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        authjson = result[0];
                    }
                });
                conn1.end();
                }
            } else {
                let conn1 = new DBHelper().getConn();
                conn1.query('INSERT INTO `c_auth` ( `UserID`, `DoorID`, `Stime`, `Etime`) VALUES (?, ?, ?, ?)',[authuserid, authdoorid,authstime[0],authetime[0]], (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        authjson = result[0];
                    }
                });
                conn1.end();
                console.log(authetime[0])
                console.log(authstime[0]+'~'+authetime[0])
                console.log(authuserid)
                console.log(authdoorid)
            }
        }
    }
}