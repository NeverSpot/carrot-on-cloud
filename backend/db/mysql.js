import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "insha",
    database: "carrot",
    connectionLimit: 10
});

export default pool;
