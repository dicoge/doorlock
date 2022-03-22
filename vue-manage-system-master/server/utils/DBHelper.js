const mysql = require('mysql');

class DBHelper{
    // 获取数据库连接
    getConn(){
        let conn = mysql.createConnection({
            // 数据库连接配置
            host:'127.0.0.1',
            user:'root',
            password:'',
            database:'test',  // 数据库名
            charset: 'utf8mb4'
        });
        conn.connect();
        return conn;
    }
}

module.exports = DBHelper;