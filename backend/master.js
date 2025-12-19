import getDateForContest from "./cal.js";
import mysql from "mysql2/promise";
const contestId=2122;


const db = await mysql.createConnection({
    host: "localhost",
    user: "nodeuser",
    password: "insha",
    database:"cf_data"
});

const a=await getDateForContest(contestId);

for(const user of a){
    await db.execute(`
        INSERT INTO contest_results
            (contest_id,handle,performance,delta,rating)

        values (${contestId},${user.handle},${user.performance},${user.delta},${user.rating})
    `)
}
console.log("done");