const API_URL = "https://trexoycbvrfivjkwreea.supabase.co/functions/v1/contest";
const dot = document.getElementById("status-dot");
const text = document.getElementById("status-text");

async function checkStatus() {
    try {
        const res = await fetch(API_URL, { method: "GET" });
        if (res.ok) {
            dot.className = "dot online";
            text.textContent = "Online";
        } else {
            throw new Error();
        }
    } catch (e) {
        dot.className = "dot offline";
        text.textContent = "Offline";
    }
}

checkStatus();
