# South Farm Weather Dashboard

This project contains a small Flask API that proxies data from the ZENTRA Cloud API and a React frontend that displays live readings from an ATMOS 41 sensor.

## Setup

1. Install Python dependencies (Flask and python-dotenv). Optionally install `flask-cors` if running the frontend separately.

```bash
pip install flask python-dotenv flask-cors
```

2. Copy `.env.example` to `.env` and fill in your `ZENTRA_API_TOKEN` and `ZENTRA_DEVICE_SN`.

3. Start the Flask API:

```bash
python app.py
```

4. From the `frontend` directory install packages and start the development server:

```bash
npm install
npm start
```

The React app is configured to proxy API requests to `localhost:5000`. When both
servers are running, visit `http://localhost:3000` to view the dashboard. The
sensor readings are displayed in simple cards that update every 30 seconds.
