require('dotenv').config();
const mysql = require('mysql2');



const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DBNAME

})

con.connect((err) => {
    if (err) {
        console.error("Fail to Connect Database", err);

    } else {
        console.log("Connect Success");
    }
})

module.exports = con;