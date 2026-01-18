import "dotenv/config";
import mysql from "mysql2/promise";

const pool =  await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port:process.env.PORT,
    waitForConnections: true,
});

export default pool;
