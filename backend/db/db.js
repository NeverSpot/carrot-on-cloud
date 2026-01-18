import pool from "./mysql.js";
import getDateForContest from "../cal.js";
import redis from "./redis.js";

export async function pushContestData(contestId){

    const contestData = await getDateForContest(contestId);

    const sql = `
        INSERT INTO contest_results
            (contest_id, handle, performance, delta, rating)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
                             performance = VALUES(performance),
                             delta       = VALUES(delta),
                             rating      = VALUES(rating)
    `;



    let cnt=0;
    console.log(" data mila ab push kikya jai");
    for (const user of contestData) {
        try {
            await pool.execute(sql, [
                contestId,
                user.handle,
                user.performance,
                user.delta,
                user.rating || null
            ]);
            cnt++;

        } catch (err) {
            console.error("❌ SQL ERROR for user:", user.handle);
            console.error("code:", err.code);
            console.error("errno:", err.errno);
            console.error("sqlState:", err.sqlState);
            console.error("query:", err.sql);
            console.error("params:", [
                contestId,
                user.handle,
                user.performance,
                user.delta,
                user.rating
            ]);

            throw err; // rethrow so you don't silently ignore corruption
        }finally {
        }
    }
    console.log(`Total ${cnt} NEW DATA ADDED :)`);


}
// await pushContestData(2176);

async function contestNeedsRefresh(contestId) {

    const [rows] = await pool.execute(
        `
            SELECT MAX(updated_at) AS last_update
            FROM contest_results
            WHERE contest_id = ?
        `,
        [contestId]
    );


    const lastUpdate = rows[0].last_update;
    if (!lastUpdate) {
        return true; // no data → must fetch
    }

    const diffMs = Date.now() - new Date(lastUpdate).getTime();

    const fiveMinutes = 5 * 60 * 1000;
    const tenHours = 10 * 60 * 60 * 1000;

    return fiveMinutes<diffMs  && diffMs <= tenHours;
}


// Do the query
export async function queryContestResults(contestID, userList) {

    if (!userList || userList.length === 0) {
        return [];
    }

    const lockKey = `lock:contest:${contestID}`;
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    const acquired = await redis.set(lockKey, "1", {
        NX: true,
        PX: 2 * 60 * 1000,
    });

    if (acquired) {
        try {
            if (await contestNeedsRefresh(contestID)) {
                await pushContestData(contestID);
            }
        } finally {
            await redis.del(lockKey);
        }
    }else {
        while((await redis.get(lockKey))==="1"){
            await sleep()
        }
    }




    const placeholders = userList.map(() => "?").join(",");

    const sql = `
        SELECT *
        FROM contest_results
        WHERE contest_id = ?
          AND handle IN (${placeholders})
    `;

    const [rows] = await pool.execute(sql, [
        contestID,
        ...userList
    ]);

    return rows;
}

// const queryList={
//     contestID:2176,
//     userList:["zzuqy","zz2745518585","zzzzzzzz"]
// }
// const ans=await queryData(queryList);
// console.log(ans)