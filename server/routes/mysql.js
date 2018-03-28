var ejs = require('ejs');
var mysql = require('mysql');

//Put your mysql configuration settings - user, password, database and port

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'sreedevi',
    database: 'test',
    port: 3306
});


function fetchData(callback, sqlQuery) {
    // console.log("\nSQL Query::" + sqlQuery);
    pool.getConnection(function (err, conn) {
        if(err){
            console.log("ERR :" + err.message)
        }
        else{
            conn.query(sqlQuery, function (err, rows, fields) {
                if (err) {
                    console.log("ERROR: " + err.message);
                }
                else {	// return err or result
                    console.log(rows);
                    callback(err, rows);
                    conn.release();
                    console.log("\nConnection Released..");
                }
            })
        }
    })

}

exports.fetchData = fetchData;


