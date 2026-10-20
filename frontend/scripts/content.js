// extracting contest id
let contestId = 0;
const contestLink = document.querySelector(".contest-name a");
if (contestLink) {
    const match = contestLink.href.match(/\/contest\/(\d+)/);
    if (match) {
        contestId = parseInt(match[1], 10);
    }
}
if (!contestId) {
    const match = window.location.pathname.match(/\/contest\/(\d+)/);
    if (match) {
        contestId = parseInt(match[1], 10);
    }
}

const userList = new Set();

// extracting participants username
const table = document.querySelectorAll(".standings tbody .contestant-cell");
for (const user of table) {
    const name = user.textContent.replace(/[ *#]/g, "").trim();
    if (name) userList.add(name);
}

const queryData = { contestId, userList: [...userList] };

function updatePage(res) {
    if (!Array.isArray(res)) {
        console.warn("Carrot on Cloud: unexpected response format", res);
        return;
    }

    const data = {};
    for (const user of res) {
        data[user.handle] = { delta: user.delta, performance: user.performance };
    }

    const location = document.querySelector(".standings tr");
    if (!location) return;

    const pref = document.createElement("th");
    const delta = document.createElement("th");
    pref.textContent = "Performance";
    delta.textContent = "Delta";
    location.append(pref);
    location.append(delta);

    const rows = document.querySelectorAll(".standings tbody tr");

    for (let i = 1; i < rows.length - 1; i++) {
        const user = rows[i];
        const handle = user.querySelector(".contestant-cell");
        if (!handle) continue;

        const userName = handle.textContent.replace(/[ *#]/g, "").trim();

        const pref = document.createElement("td");
        const delta = document.createElement("td");

        if (data[userName] !== undefined) {
            const userPref = data[userName]["performance"];
            const userDelta = data[userName]["delta"];

            pref.textContent = userPref;
            delta.textContent = userDelta;

            // delta coloring
            if (userDelta > 0) {
                delta.classList.add("carrot-delta-positive");
                delta.textContent = `+${userDelta}`;
            } else {
                delta.classList.add("carrot-delta-negative");
                delta.textContent = `${userDelta}`;
            }
            pref.style.fontWeight = "bold";

            // performance coloring
            if (userPref < 1200) {
                pref.classList.add("newbie");
            } else if (userPref < 1400) {
                pref.classList.add("pupil");
            } else if (userPref < 1600) {
                pref.classList.add("specialist");
            } else if (userPref < 1900) {
                pref.classList.add("expert");
            } else if (userPref < 2100) {
                pref.classList.add("candidate-master");
            } else if (userPref < 2300) {
                pref.classList.add("master");
            } else if (userPref < 2400) {
                pref.classList.add("international-master");
            } else if (userPref < 2600) {
                pref.classList.add("grandmaster");
            } else if (userPref < 3000) {
                pref.classList.add("international-grandmaster");
            } else {
                pref.classList.add("legendary-grandmaster");
            }
        }

        // gray coloring for table
        if (i % 2 === 1) {
            pref.classList.add("carrot-dark");
            delta.classList.add("carrot-dark");
        }

        user.append(pref);
        user.append(delta);
    }
}

const apiURL = "https://trexoycbvrfivjkwreea.supabase.co/functions/v1/contest";

if (contestId && userList.size > 0) {
    fetch(apiURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(queryData),
    })
        .then((res) => res.json())
        .then((res) => {
            updatePage(res);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}
