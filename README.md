# Carrot on Cloud

Carrot on Cloud is a project that consists of a browser extension and a backend server designed to display performance data for Codeforces contests.

## Overview

- **Frontend**: A Chrome Extension (Manifest V3) that runs on `codeforces.com`. It adds a "Performance" column to the standings/results tables.
- **Backend**: A Node.js Express server that fetches, stores, and serves contest results.
- **Database**: MySQL is used to cache contest results to avoid redundant calculations or API calls.

## Project Structure

```text
.
├── backend/            # Express server and database logic
│   ├── db/            # Database connection and queries
│   ├── cal.js         # Calculation logic for contest data
│   ├── master.js      # Main entry point for the backend
│   └── ...
├── frontend/           # Browser extension files
│   ├── popup/         # Extension popup UI
│   ├── scripts/       # Content scripts that run on Codeforces
│   └── manifest.json  # Extension manifest
├── package.json        # Node.js dependencies and scripts
└── ...
```

## Requirements

- **Node.js**: v14 or higher recommended.
- **MySQL**: A running instance of MySQL.
- **Browser**: Google Chrome or any Chromium-based browser for the extension.

## Setup & Installation

### Backend Setup

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Configuration**:
    - Create a `.env` file in the root directory based on `.idea/.env.example`:
      ```env
      DB_HOST=your_host
      DB_USER=your_user
      DB_PASSWORD=your_password
      DB_NAME=carrot
      PORT=3000
      ```

3.  **Database Configuration**:
    - Ensure MySQL is running.
    - Create a database named `carrot`.
    - Create a table `contest_results`:
      ```sql
      CREATE TABLE contest_results (
          contest_id INT,
          handle VARCHAR(255),
          performance INT,
          delta INT,
          rating INT,
          PRIMARY KEY (contest_id, handle)
      );
      ```

4.  **Run the Backend**:
    ```bash
    node backend/master.js
    ```
    The server will start on the port specified in `.env` (default `3000`).

### Frontend Setup

1.  Open your browser and navigate to `chrome://extensions/`.
2.  Enable **Developer mode** (toggle in the top right).
3.  Click **Load unpacked**.
4.  Select the `frontend` folder from this repository.

## Scripts

- `npm install`: Installs backend dependencies.
- `node backend/master.js`: Starts the backend server.

## Environment Variables

The project uses a `.env` file to manage sensitive configuration. See the [Backend Setup](#backend-setup) section for details on how to configure it.

Variables supported:
- `DB_HOST`: MySQL server host.
- `DB_USER`: MySQL user.
- `DB_PASSWORD`: MySQL password.
- `DB_NAME`: MySQL database name.
- `PORT`: Port for the backend server.

## Tests

- **TODO**: No tests are currently implemented. Need to add unit tests for calculation logic (`cal.js`) and integration tests for API endpoints.

