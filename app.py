import os
import requests
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)

API_TOKEN = os.getenv("ZENTRA_API_TOKEN")
DEVICE_SN = os.getenv("ZENTRA_DEVICE_SN")
BASE_URL = "https://zentracloud.com/api/v4/get_readings/"

TARGET_SENSORS = [
    "Air Temperature", "Relative Humidity", "Barometric Pressure", "Vapor Pressure",
    "Wind Speed", "Wind Direction", "Precipitation", "Solar Radiation",
    "Lightning Strikes", "Tilt Sensor"
]

@app.route('/api/live')
def get_atmos41_data():
    headers = {
        "Authorization": API_TOKEN
    }
    params = {
        "device_sn": DEVICE_SN,
        "per_page": 100,  # Increase if needed
        "sort_by": "desc",
        "output_format": "json"
    }

    try:
        response = requests.get(BASE_URL, headers=headers, params=params)
        response.raise_for_status()
        raw_data = response.json().get('data', {})

        filtered_data = []
        for parameter, sensors in raw_data.items():
            if any(target.lower() in parameter.lower() for target in TARGET_SENSORS):
                for sensor in sensors:
                    metadata = sensor.get("metadata", {})
                    for reading in sensor.get("readings", []):
                        filtered_data.append({
                            "parameter": parameter,
                            "sensor": metadata.get("sensor_name"),
                            "units": metadata.get("units"),
                            "datetime": reading.get("datetime"),
                            "value": reading.get("value")
                        })

        return jsonify(filtered_data)

    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
=======

load_dotenv()
app = Flask(__name__)
CORS(app)

API_TOKEN = os.getenv("ZENTRA_API_TOKEN")
DEVICE_SN = os.getenv("ZENTRA_DEVICE_SN")
BASE_URL = "https://zentracloud.com/api/v4/get_readings/"

TARGET_SENSORS = [
    "Air Temperature", "Relative Humidity", "Barometric Pressure", "Vapor Pressure",
    "Wind Speed", "Wind Direction", "Precipitation", "Solar Radiation",
    "Lightning Strikes", "Tilt Sensor"
]

@app.route('/api/live')
def get_atmos41_data():
    headers = {
        "Authorization": API_TOKEN
    }
    params = {
        "device_sn": DEVICE_SN,
        "per_page": 100,  # Increase if needed
        "sort_by": "desc",
        "output_format": "json"
    }

    try:
        response = requests.get(BASE_URL, headers=headers, params=params)
        response.raise_for_status()
        raw_data = response.json().get('data', {})

        filtered_data = []
        for parameter, sensors in raw_data.items():
            if any(target.lower() in parameter.lower() for target in TARGET_SENSORS):
                for sensor in sensors:
                    metadata = sensor.get("metadata", {})
                    for reading in sensor.get("readings", []):
                        filtered_data.append({
                            "parameter": parameter,
                            "sensor": metadata.get("sensor_name"),
                            "units": metadata.get("units"),
                            "datetime": reading.get("datetime"),
                            "value": reading.get("value")
                        })

        return jsonify(filtered_data)

    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
