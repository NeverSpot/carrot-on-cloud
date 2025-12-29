import express from "express";
import {queryContestResults} from "./db/db.js";
import cors from "cors";
import "dotenv/config";


const app = express();

app.use(cors());
app.use(express.json());

app.post("/contest", async (req, res) => {
    const { contestId, users } = req.body;

    // contestId → number
    // users → array

    const data = await queryContestResults(contestId, users);
    res.json(data);
});



app.listen(3000);
