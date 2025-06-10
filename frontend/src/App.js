import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [sensorData, setSensorData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch("/api/live")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to load data");
          return res.json();
        })
        .then((data) => setSensorData(data))
        .catch((err) => setError(err.message));
    };

    fetchData();
    const id = setInterval(fetchData, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="App">
      <h1>ATMOS 41 Live Data</h1>
      {error && <p className="error">Error: {error}</p>}
      {sensorData.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="card-container">
          {sensorData.map((item, index) => (
            <div className="card" key={index}>
              <h2>{item.parameter}</h2>
              <p className="value">
                {item.value} {item.units}
              </p>
              <p className="sensor-name">{item.sensor}</p>
              <p className="timestamp">
                {new Date(item.datetime).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
