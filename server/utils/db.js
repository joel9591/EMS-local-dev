import mysql from 'mysql2';
import dotenv from 'dotenv';

const con = mysql.createConnection({
    //host: process.env.DB_HOST,
    user: "root",
    password: "",
    database: "employeems"
});

con.connect((err) => {
    if (err) {
        console.error("Connection error:", err);
    } else {
        console.log("Connected to the database");
    }
});

// Export the connection
export default con;
