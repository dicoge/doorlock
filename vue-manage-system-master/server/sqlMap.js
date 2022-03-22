// sql语句
var sqlMap = {
    user: {
        // 添加用户
        add: 'insert into o_userid(ID,Name) values (?,?)',
        // 查询用户
        select: 'select * from o_userid where ID like "%"?"%"',
        selectmulty: 'select * from o_userid where ID =? AND Name = ?'
    },
    door: {
        // 添加用户
        add: 'insert into o_door(DoorID,roof,floor,department,room) values (?,?,?,?,?)',
        // 查询用户
        select: 'select * from o_door where DoorID = ?'
    },
    beacon: {
        // 添加用户
        add: 'insert into o_beacon(UUID,Major,Minor,Mac,State) values (?,?,?,?,?)',
        // 查询用户
        select: 'select * from o_beacon where BeaconID = ?',
        selectBeacon: 'SELECT * FROM o_beacon WHERE o_beacon.BeaconID = (SELECT BeaconID FROM c_userbeacon WHERE c_userbeacon.UserID=(SELECT UserID FROM o_userid WHERE o_userid.ID=? and o_userid.Name = ?))',
        update: 'UPDATE `o_beacon` SET `State` = ? WHERE `o_beacon`.`BeaconID` = ?',
    },
    auth: {
        // 添加用户
        add: 'insert into c_auth(UserID,DoorID,Stime,Etime,CreateFrom) values (?,?,?,?,?)',
        // 查询用户
        select: 'select * from c_auth INNER JOIN o_userid on o_userid.UserID = c_auth.UserID where c_auth.UserID = ?',
        select1: 'select * from c_auth INNER JOIN o_userid on o_userid.UserID = c_auth.UserID where DoorID = ?',
        //更新
        update: 'UPDATE `c_auth` SET `UserID` = ?, `DoorID` = ?, `Stime` = ?, `Etime` = ? WHERE `c_auth`.`AuthID` = ?',
        //刪除
        delete:'DELETE FROM `c_auth` WHERE `c_auth`.`AuthID` = ?'
    },
    schedule: {
        // 添加用户
        add: 'INSERT INTO `o_schedule` (`UserID`, `DoorID`, `startTime`, `endTime`, `repetition`, `point`) VALUES (?,?,?,?,?,?)',        
        // 查询用户
        select: 'select * from `o_schedule` where UserID = ? AND repetition != -1',
        select1: 'select * from `o_schedule` where AID = ? AND repetition != -1',
        //更新
        update: 'UPDATE `o_schedule` SET `UserID` = ?, `DoorID` = ?, `startTime` = ?, `endTime` = ? ,`repetition`=?,`point`=? WHERE `o_schedule`.`AID` = ?',
        update1: 'UPDATE `o_schedule` SET `endTime` = ?  WHERE `o_schedule`.`AID` = ?',
        //刪除
        delete:'DELETE FROM `o_schedule` WHERE `o_schedule`.`AID` = ?'
    }
}
//UPDATE `o_schedule` SET `endTime` = '2021-06-27 23:59:59' WHERE `o_schedule`.`AID` = 4;
//UPDATE `c_auth` SET `UserID` = ?, `DoorID` = ?, `Stime` = ?, `Etime` = ? WHERE `c_auth`.`AuthID` = ?;
//DELETE FROM `c_auth` WHERE `CreateFrom` = 9
//SELECT * FROM o_beacon WHERE o_beacon.BeaconID = (SELECT BeaconID FROM c_userbeacon WHERE c_userbeacon.UserID=(SELECT UserID FROM o_userid WHERE o_userid.ID=? and o_userid.Name = ?))
module.exports = sqlMap;
