import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [sensorData, setSensorData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/live")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load data");
        return res.json();
      })
      .then((data) => setSensorData(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="App">
      <h1>ATMOS41 Live Sensor Dashboard</h1>
      {error && <p className="error">Error: {error}</p>}
      {sensorData.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <table className="sensor-table" border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Value</th>
              <th>Units</th>
              <th>Sensor</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {sensorData.map((item, index) => (
              <tr key={index}>
                <td>{item.parameter}</td>
                <td>{item.value}</td>
                <td>{item.units}</td>
                <td>{item.sensor}</td>
                <td>{new Date(item.datetime).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
