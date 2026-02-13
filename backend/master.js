import "dotenv/config";
import {queryContestResults} from "./db/db.js";
import express from "express";


const app = express();

app.use(cors({
  origin: "https://codeforces.com",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));

app.options("/contest", cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Server is working"
    });
});

app.post("/contest", async (req, res) => {
console.log("Request recived");

    let { contestId, userList } = req.body;
    userList = userList.map(u => u.trim());
    try {
        const data = await queryContestResults(contestId, userList);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
	console.log("DATA SENT!!!!");
});



app.listen(3000);
