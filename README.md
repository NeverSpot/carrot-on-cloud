# Carrot on Cloud

Carrot on Cloud is a high-performance system consisting of a browser extension and a scalable backend designed to display real-time performance data and rating changes for Codeforces contests.

## ❓ Why This Project Exists

Codeforces participants often want to see their projected rating changes and performance metrics during or immediately after a contest. While several tools exist for this, they often struggle with:
- **Accuracy**: Real-time calculations need to match the official Codeforces algorithm precisely.
- **Speed**: Fetching data for thousands of participants and recalculating ranks can be slow.
- **Scalability**: Popular contests can attract tens of thousands of users, leading to high server load and redundant calculations.

**Carrot on Cloud** addresses these by providing a highly optimized, cloud-native backend that handles data processing efficiently, ensuring users get near-instant results even during peak contest times.

## 🏗️ High-Level System Design

The system is designed for efficiency and reliability, handling large-scale data fetching and processing through a distributed architecture.

- **Frontend**: A Chrome Extension (Manifest V3) that injects performance metrics directly into the Codeforces standings page.
- **Reverse Proxy**: Nginx handles incoming HTTPS requests, terminates SSL, and forwards traffic to the backend.
- **Backend**: A Node.js Express server running on AWS EC2. It manages API requests, coordinates data fetching from Codeforces, and handles database operations.
- **Database (RDS)**: Amazon RDS (MySQL) is used for persistent storage of contest results, ensuring data durability and high availability.
- **Cache & Concurrency Control (Redis)**: Redis is used to implement a distributed locking mechanism, preventing redundant processing and optimizing server resources.

---

## 🚀 Deployment Architecture on AWS

The application is deployed on AWS to ensure scalability and uptime.

### 1. Compute & Networking
- **AWS EC2**: The Node.js application is hosted on an EC2 instance.
- **Elastic IP**: A static IPv4 address (Elastic IP) is associated with the EC2 instance to ensure the IP remains constant across restarts.
- **Subdomain Mapping**: A custom subdomain is linked to the Elastic IP via A-record in the DNS settings, providing a user-friendly endpoint for the extension.

### 2. Reverse Proxy & HTTPS
- **Nginx**: Configured as a reverse proxy to:
    - Receive HTTPS requests on port `443`.
    - Secure the communication using SSL certificates.
    - Forward requests to the Express application running locally on port `3000`.
- This setup ensures that the backend application is not directly exposed to the internet and can handle SSL termination efficiently.

### 3. Database (Amazon RDS)
- **RDS MySQL**: Instead of running a database on the EC2 instance, a dedicated Amazon RDS instance is used. This provides automated backups, patching, and better performance isolation.

---

## 🔒 Advanced Features & Optimizations

### ⚡ Key Optimization: FFT-based Delta Calculation

The traditional way to calculate rating changes for $N$ participants involves an $O(N^2)$ algorithm, as each person's expected rank depends on every other person's rating. For a large contest with 30,000+ participants, this results in nearly a billion operations, which is too slow for real-time updates.

**How it works:**
- We treat the rating distribution as a discrete signal.
- The expected rank calculation is mathematically equivalent to a **convolution** of the rating distribution with the Elo win-probability function.
- By using the **Fast Fourier Transform (FFT)**, we can perform this convolution in $O(N \log N)$ or $O(M \log M)$ time (where $M$ is the rating range).
- This optimization reduces calculation time from seconds to **milliseconds**, allowing the backend to serve thousands of requests without lag.

### 1. Redis Distributed Locking
To prevent a "thundering herd" problem where multiple users requesting the same new contest results trigger multiple simultaneous scraping/calculation processes, we use **Redis Locks**:
- When a request for an unprocessed contest arrives, the system attempts to acquire a lock in Redis (`lock:contest:contestId`).
- The first request acquires the lock and begins the data processing (fetching from Codeforces and calculating deltas).
- Subsequent concurrent requests for the same `contestId` will see the lock, wait, and periodically poll until the first request completes the processing.
- Once the data is cached in the database, all waiting requests are served from the DB, drastically saving CPU and Network I/O.

### 2. High-Speed Batching
Processing contest data involves handling thousands of users at once. To optimize database performance:
- **Batch Inserts**: Instead of inserting records one by one, the system groups records into batches (e.g., 1000 records per batch).
- **Reduced Overhead**: This significantly reduces the number of round-trips to the RDS instance and minimizes transaction overhead, making the initial data ingestion extremely fast.

---

## 🛠️ Project Structure

```text
.
├── backend/            # Node.js Express server
│   ├── db/             # Database (MySQL) and Cache (Redis) logic
│   ├── cal.js          # Core calculation engine for performance/delta
│   ├── master.js       # Main API entry point & routing
└── ...
├── frontend/           # Browser extension files
│   ├── scripts/        # Content scripts for DOM manipulation on Codeforces
│   └── manifest.json   # Extension configuration
└── package.json        # Project dependencies
```

---

## ⚙️ Setup & Installation

### Backend Setup
1. **Install Dependencies**: `npm install`
2. **Environment Configuration**: Create a `.env` file with `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, and `PORT`.
3. **Run the Backend**: `node backend/master.js`

### Frontend Setup
1. Navigate to `chrome://extensions/`.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select the `frontend` folder.

---

## 📈 Future Roadmap
- [ ] Implement automated unit and integration tests.
- [ ] Add support for more competitive programming platforms.
- [ ] Enhance UI/UX of the extension popup.

