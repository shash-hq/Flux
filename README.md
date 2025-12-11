# Flux
**Automated Comprehensive Technology Intelligence Forecasting Platform**

Flux is a modern dashboard for tracking and forecasting technology trends. It visualizes hype cycles and growth status ("Booming", "Stable", "Fading") using a sophisticated, minimal interface.

![Flux Dashboard](./client/public/flux_preview.png)

## ⚠️ Data Source Disclaimer
**Current Status: Prototype / Simulation**
The data shown in this application is currently **simulated** for demonstration purposes.
- **Source**: `server/services/scraper.js` generates mock keyword frequency data to simulate market trends.
- **Forecasting**: `server/services/forecasting.js` uses simple linear regression on this mock history to assign status labels.
- **Note**: No external public APIs are currently being called.

## 🚀 Future Roadmap: Real-Time Data
The architecture is designed to be easily swappable with real data sources. The next phase of development involves:
1.  **NewsAPI / GDELT**: Fetching real global news metadata.
2.  **Social Sentiment**: Analyzing Twitter/Reddit streams.
3.  **NLP Analysis**: Using Python microservices for accurate entity extraction.

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Recharts.
- **Backend**: Node.js, Express, Mongoose (MongoDB).
- **Tools**: Cheerio (ready for scraping), Simple-Statistics (forecasting).

## Installation
1.  **Clone the repo**:
    ```bash
    git clone https://github.com/shash-hq/Flux.git
    cd Flux
    ```

2.  **Install Dependencies**:
    ```bash
    cd server && npm install
    cd ../client && npm install
    ```

3.  **Run Application**:
    - Start Backend (Port 5001): `cd server && npm run dev`
    - Start Frontend (Port 5173): `cd client && npm run dev -- --force`

## License
© 2025 Flux. All rights reserved.
