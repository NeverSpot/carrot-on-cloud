# Carrot on Cloud

Carrot on Cloud is a browser extension and backend system that displays performance analytics for Codeforces contests directly on the standings page.  
It centralizes contest computation to eliminate redundant API calls and serve consistent results to all users.

## Why this project exists

Codeforces contest analytics are typically computed per user, leading to redundant API calls and unnecessary load.  
Carrot on Cloud computes contest data once per contest and distributes the results efficiently to all clients.

## Key Optimization

- Reduces Codeforces API calls from O(n) (per user) to O(1) (single shared call)
- Contest results are cached to avoid recomputation

## Overview

- **Frontend**: Chrome Extension (Manifest V3) that runs on `codeforces.com` and injects a **Performance** column into standings/results tables.
- **Backend**: Node.js + Express server responsible for fetching, computing, and serving contest analytics.
- **Database**: MySQL used to cache contest results and computed metrics.
## High-Level Architecture

```text
                    ┌────────────┐
                    │  Codeforces API    │
                    └─────┬──────┘
                              │
                              ▼
                    ┌────────────┐
                    │  Backend (Express) │
                    │  - Fetch contest   │
                    │  - Compute metrics │
                    │  - Cache results   │
                    └─────┬──────┘
                              │
                              ▼
                    ┌────────────┐
                    │     MySQL DB       │
                    │  Cached contests   │
                    │  & performance     │
                    └─────┬──────┘
                              │
                              ▼
             ┌─────────────────────┐
             │ Chrome Extension (Manifest V3)    │
             │ - Fetch cached results            │
             │ - Inject "Performance" column     │
             │ - Runs on codeforces.com          │
             └─────────────────────┘
```
## Data Flow

Codeforces API → Backend (compute & cache) → MySQL → Chrome Extension → Codeforces Standings UI

## Features

- Displays contest performance analytics directly on Codeforces
- Centralized computation with backend caching
- Faster load times and reduced external API usage

## Project Structure

.
├── backend/            # Express server and database logic  
│   ├── db/             # Database connection and queries  
│   ├── cal.js          # Contest calculation logic  
│   ├── master.js       # Backend entry point  
│   └── ...  
├── frontend/           # Chrome extension  
│   ├── popup/          # Extension popup UI  
│   ├── scripts/        # Content scripts for Codeforces  
│   └── manifest.json   # Extension manifest  
├── package.json        # Node.js dependencies and scripts  
└── ...

## Tech Stack

- Node.js, Express
- MySQL
- Chrome Extension (Manifest V3)
- JavaScript

## Requirements

- Node.js v14 or higher
