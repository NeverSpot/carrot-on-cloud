import pool from "./mysql.js";
import getDateForContest from "../cal.js";

export async function pushContestData(contestId) {
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

    for (const user of contestData) {
        await pool.execute(sql, [
            contestId,
            user.handle,
            user.performance,
            user.delta,
            user.rating
        ]);
    }
}
// await pushContestData(2176);

export async function contestExists(contestId) {
    const [rows] = await pool.execute(
        "SELECT 1 FROM contest_results WHERE contest_id = ? LIMIT 1",
        [contestId]
    );
    return rows.length > 0;
}


// Do the query
export async function queryContestResults(contestID, userList) {
    if (!userList || userList.length === 0) {
        return [];
    }
    if(await contestExists(contestID)===false){
        await pushContestData(contestID);
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
