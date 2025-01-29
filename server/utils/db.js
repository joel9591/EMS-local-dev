import mysql from 'mysql2';
import dotenv from 'dotenv';

const con = mysql.createConnection({
    user: "root",
    password: "",
    database: "employeems",
    port: 3307,
});
con.connect((err) => {
    if (err) {
        console.error("Connection error:", err);
    } else {
        console.log("Connected to the database");
    }
});
export default con;
