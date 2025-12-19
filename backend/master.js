import getDateForContest from "./cal.js";
import mysql from "mysql2/promise";
const contestId=2122;


const db = await mysql.createConnection({
    host: "localhost",
    user: "nodeuser",
    password: "insha",
    database:"cf_data"
});


// getting calculated data
const contestData=await getDateForContest(contestId);



// add or update contest data to db
async function pushContestData(contestData){
    const sql = `
        INSERT INTO contest_results
            (contest_id, handle, performance, delta, rating)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            performance = VALUES(performance),
            delta       = VALUES(delta),
            rating      = VALUES(rating)
    `;
    for(const user of contestData){
        await db.execute(sql,[
           contestId,
           user.handle,
           user.performance,
           user.delta,
           user.rating
        ]);
    }
}

const queryList={
    contestID:2122,
    userList:["zzuqy","zz2745518585","zzzzzzzz"]
}

// Do the query
async function queryData(queryList){
    const placeholders = queryList.userList.map(() => "?").join(",");

    const sql=`
        SELECT *
        FROM contest_results
        WHERE contest_id = ?
          AND handle IN (${placeholders})
    `;

    const [ans] = await db.execute(sql,[
        queryList.contestID,
        ...queryList.userList
    ]);
    return ans;
}
await pushContestData(contestData);
const ans=await queryData(queryList);

console.log(ans)

console.log("done");
